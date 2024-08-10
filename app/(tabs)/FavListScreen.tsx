import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getMovieDetails } from '@/services/tmdb';
import { useIsFocused } from '@react-navigation/native';

export default function FavListScreen() {

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const router = useRouter();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favMovies');
      const movieIds = jsonValue != null ? JSON.parse(jsonValue).map(id => parseInt(id)) : [];

      const movieDetailsPromises = movieIds.map(movieId => getMovieDetails(movieId));

      const moviesDetails = await Promise.all(movieDetailsPromises);

      setFavoriteMovies(moviesDetails);
    } catch (error) {
      console.error(error);
    }
  };


  const renderMovie = ({ item }) => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => router.push({
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
        <View style={{ marginTop: 25, marginHorizontal: 10, width: 200 }}>
          <Text style={{ color: 'white', marginBottom: 10, fontSize: 20, fontWeight: '500' }}>{item.title}</Text>
          <Text style={{ color: '#9e9e9e', marginBottom: 10 }}> {Math.floor((item.vote_average * 10) % 10)} / 10 · {item.release_date} </Text>
          <Text numberOfLines={5} ellipsizeMode='tail' style={{ color: 'white', flexWrap: 'wrap', flexShrink: 1 }} > {item.overview} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const List = ({ data, renderItem }) => (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => renderItem({ item, index })}
    />
  );


  return (
    <View style={styles.container} >
      <Header />
      <View style={styles.body}>
        <List data={favoriteMovies} renderItem={renderMovie} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 20,
    resizeMode: 'cover',
    marginLeft: 30,
    marginVertical: 15
  },
})