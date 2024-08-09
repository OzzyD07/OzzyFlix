import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Header from '@/components/Header'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getMovieDetails, getTopCast, getSimilarMovies } from '@/services/tmdb';

export default function MovieDetails() {

  const [movieData, setMovieData] = useState([])
  const [topCast, setTopCast] = useState([])
  const [similarMovie, setSimilarMovie] = useState([])
  const [loading, setLoading] = useState(true)

  const { movieId } = useLocalSearchParams()
  const router = useRouter()

  useEffect(() => {
    fetchMovieDetails()
  }, [movieId])

  const fetchMovieDetails = async () => {
    setLoading(true)
    try {
      const [movieData, topCast, similarMovie] = await Promise.all([
        getMovieDetails(movieId),
        getTopCast(movieId),
        getSimilarMovies(movieId),
      ]);
      setMovieData(movieData);
      setTopCast(topCast);
      setSimilarMovie(similarMovie)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderCast = ({ item }) => {
    const maxLength = 15;
    return (
      <View>
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }} >
          <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => router.push({
            pathname: '/PersonDetails',
            params: { personId: item.id }
          })} >
            {
              item.profile_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
                  style={styles.castProfile}
                />
              ) : (
                <Ionicons name="person-circle" size={100} color="white" />
              )
            }
          </TouchableOpacity>
          <Text style={{ color: 'white' }} >{truncateText(item.character, maxLength)}</Text>
          <Text style={{ color: '#c2c0c0' }} >{truncateText(item.name, maxLength)}</Text>
        </View>
      </View>
    );
  };

  const renderSimilarMovie = ({ item }) => {
    const maxLength = 15;
    return (
      <View>
        <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }} >
          <TouchableOpacity style={{ marginHorizontal: 15 }}
            onPress={() => router.push({
              pathname: '/MovieDetails',
              params: { movieId: item.id }
            })} >
            {
              item.poster_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.poster}
                />
              ) : (
                <FontAwesome5 name="file-image" size={160} color="black" />
              )
            }
          </TouchableOpacity>
          <Text style={{ color: 'white' }} >{truncateText(item.title, maxLength)}</Text>
        </View>
      </View>
    );
  };

  const List = ({ data, renderItem }) => (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        renderItem={({ item, index }) => renderItem({ item, index })}
      />
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: 'center' }} >
        <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 15, top: 45 }}>
          <Ionicons name="arrow-back-outline" size={35} color="white" />
        </TouchableOpacity>
        <Header />
      </View>
      {loading ? (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <ActivityIndicator size={'large'} color={'#ffa31a'} />
      </View>) :
        (<ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }} >
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }} style={styles.image} />
          <Text style={styles.title} >{movieData.title}</Text>
          <View style={styles.genralInfo}>
            <Text style={styles.infos} >{movieData.release_date}</Text>
            <Text style={styles.infoPart} > | </Text>
            <Text style={styles.infos}>{movieData.runtime} min</Text>
            <Text style={styles.infoPart} > | </Text>
            <Text style={styles.infos}>{movieData.vote_average} / 10</Text>
          </View>
          <Text style={styles.overview}>    {movieData.overview}</Text>
          <View>
            <Text style={styles.cast} >Casts</Text>
            <List data={topCast} renderItem={renderCast} />
            <Text style={styles.cast} >Similar Movies</Text>
            <List data={similarMovie} renderItem={renderSimilarMovie} />
          </View>
        </ScrollView>)}
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  image: {
    width: 350,
    height: 550,
    borderRadius: 30,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  title: {
    color: "white",
    top: 10,
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center'
  },
  genralInfo: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#808080',
    width: 350,
    height: 60,
    marginTop: 20,
    borderRadius: 50,
    flexDirection: 'row'
  },
  infos: {
    fontSize: 17,
    fontWeight: '700',
    color: 'white'
  },
  infoPart: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  overview: {
    margin: 20,
    color: '#c2c0c0',
    fontSize: 17,
    textAlign: 'center'
  },
  cast: {
    color: 'white',
    fontSize: 30,
    marginLeft: 15,
    fontWeight: 'bold'
  },
  castProfile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover'
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 20,
    resizeMode: 'cover'
  }
})