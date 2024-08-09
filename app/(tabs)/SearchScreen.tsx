import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { Ionicons } from '@expo/vector-icons';
import { getSearchedMovies } from '@/services/tmdb';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';

export default function SearchScreen() {

  const [movieList, setMovieList] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchSearchdMovies()
  }, [query])


  const fetchSearchdMovies = async () => {
    try {
      const movieList = await getSearchedMovies(query)
      setMovieList(movieList)
    } catch (error) {
      console.error(error)
    }
  }

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
          <Text style={{ color: '#9e9e9e', marginBottom: 10 }}> {Math.floor((item.vote_average * 10) % 10)}/ 10 · {item.release_date} </Text>
          <Text numberOfLines={3} ellipsizeMode='tail' style={{ color: 'white', flexWrap: 'wrap', flexShrink: 1 }} > {item.overview} </Text>
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
      <View style={styles.body} >
        <TouchableOpacity style={styles.searchBar} >
          <Ionicons name='search' color='#ffa31a' size={40} style={{ marginLeft: 10 }} />
          <TextInput
            style={styles.inputStyle}
            placeholder='Movie Name'
            value={query}
            onChangeText={(value) => setQuery(value)} />
        </TouchableOpacity>
      </View>
      <View>
        <List data={movieList} renderItem={renderMovie} />
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
  searchBar: {
    backgroundColor: 'white',
    width: 350,
    height: 60,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputStyle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '500',
    flex: 1
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