import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import Header from '@/components/Header';
import { getPopularMovies, getUpcomingMovies, getTopRatedMovies } from '@/services/tmdb';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.72;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;
const SPACING = 10;

const SMALL_ITEM_WIDTH = SCREEN_WIDTH * 0.5;
const SMALL_ITEM_HEIGHT = SMALL_ITEM_WIDTH * 1.5;

export default function HomeScreen() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollXUpcoming = useRef(new Animated.Value(0)).current;
  const scrollXTopRated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const [popular, upcoming, topRated] = await Promise.all([
        getPopularMovies(),
        getUpcomingMovies(),
        getTopRatedMovies()
      ]);
      setPopularMovies(popular);
      setUpcomingMovies(upcoming);
      setTopRatedMovies(topRated);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderLargeItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    });


    return (
      <View style={styles.itemContainer}>
        <Animated.View style={[styles.itemInner, { transform: [{ scale }], opacity }]}>
          <TouchableOpacity onPress={() => router.push({
            pathname: '/MovieDetails',
            params: { movieId: item.id }
          })} >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{item.title}</Text>
        </Animated.View>
      </View >
    );
  };

  const renderSmallItem = ({ item, index, scrollX }) => {
    const inputRange = [
      (index - 1) * SMALL_ITEM_WIDTH,
      index * SMALL_ITEM_WIDTH,
      (index + 1) * SMALL_ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
    });

    return (
      <View style={styles.smallItemContainer}>
        <Animated.View style={[styles.smallItemInner, { transform: [{ scale }], opacity }]}>
          <TouchableOpacity onPress={() => router.push({
            pathname: '/MovieDetails',
            params: { movieId: item.id }
          })} >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.smallImage}
            />
          </TouchableOpacity>
          <Text style={styles.smallTitle}>{item.title}</Text>
        </Animated.View>
      </View>
    );
  };

  const MovieList = ({ title, data, renderItem, scrollX, itemWidth }) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => renderItem({ item, index, scrollX })}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#ffa31a" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchMovies}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.body} contentContainerStyle={styles.scrollViewContent}>
        <MovieList title="TRENDING" data={popularMovies} renderItem={renderLargeItem} scrollX={scrollX} itemWidth={ITEM_WIDTH} />
        <MovieList title="UPCOMING" data={upcomingMovies} renderItem={renderSmallItem} scrollX={scrollXUpcoming} itemWidth={SMALL_ITEM_WIDTH} />
        <MovieList title="TOP RATED" data={topRatedMovies} renderItem={renderSmallItem} scrollX={scrollXTopRated} itemWidth={SMALL_ITEM_WIDTH} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  body: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 90,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 20,
    marginLeft: 20,
  },
  flatListContent: {
    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  itemInner: {
    alignItems: 'center',
  },
  image: {
    width: ITEM_WIDTH - SPACING * 2,
    height: ITEM_HEIGHT - SPACING * 2,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    marginTop: 10,
    textAlign: 'center',
  },
  smallItemContainer: {
    width: SMALL_ITEM_WIDTH,
    alignItems: 'center',
  },
  smallItemInner: {
    alignItems: 'center',
  },
  smallImage: {
    width: SMALL_ITEM_WIDTH - SPACING * 2,
    height: SMALL_ITEM_HEIGHT - SPACING * 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  smallTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5,
    textAlign: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#ffa31a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});