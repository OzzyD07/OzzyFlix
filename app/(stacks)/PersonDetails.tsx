import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { getPersonData, getPersonMovies } from '@/services/tmdb';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function PersonDetails() {

    const { personId } = useLocalSearchParams()
    const [personData, setPersonData] = useState([])
    const [movieData, setMovieData] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchPersonDetails()
    }, [personId])

    const fetchPersonDetails = async () => {
        setLoading(true)
        try {
            const [personData, movieData] = await Promise.all([
                getPersonData(personId),
                getPersonMovies(personId)
            ])
            setPersonData(personData)
            setMovieData(movieData)
        } catch (error) {
            console.error(error)
        } finally {
           setLoading(false)
        }
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const renderMovie = ({ item }) => {
        const maxLength = 15;
        return (
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }} >
                <TouchableOpacity style={{ marginHorizontal: 15 }} onPress={() => router.push({
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
        );
    };

    const List = ({ data, renderItem }) => (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => renderItem({ item, index })}
        />
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: 'center' }} >
                <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 15, top: 45 }}>
                    <Ionicons name="arrow-back-outline" size={35} color="white" />
                </TouchableOpacity>
                <Header />
            </View>
            {loading ? (<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                <ActivityIndicator size={'large'} color={'#ffa31a'} />
            </View>) :
                (<ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${personData.profile_path}` }} style={styles.image} />
                    <Text style={styles.name} >{personData.name}</Text>
                    <View style={styles.genralInfo}>
                        <Text style={styles.infos} >{personData.birthday}</Text>
                        <Text style={styles.infoPart} > | </Text>
                        {
                            personData.gender == 1 ?
                                <Text style={styles.infos}>Female</Text> :
                                <Text style={styles.infos}>Male</Text>
                        }
                        <Text style={styles.infoPart} > | </Text>
                        <Text style={styles.infos}>{personData.popularity} Rate</Text>
                    </View>
                    <Text style={styles.overview}>    {personData.biography}</Text>
                    <View>
                        <Text style={styles.title}>Movies</Text>
                        <List data={movieData} renderItem={renderMovie} />
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
    name: {
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
    poster: {
        width: 120,
        height: 180,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginLeft: 15,
        fontWeight: 'bold',
    },
})