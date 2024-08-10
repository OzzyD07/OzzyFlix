import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function FavScript({ movieId }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        checkIfFavorite();
    }, []);

    const checkIfFavorite = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('favMovies');
            const list = jsonValue != null ? JSON.parse(jsonValue) : [];
            setIsFavorite(list.includes(movieId));
        } catch (e) {
            console.error('Liste kontrol edilemedi.', e);
        }
    };

     const toggleFavList = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('favMovies');
            let list = jsonValue != null ? JSON.parse(jsonValue) : [];

            if (list.includes(movieId)) {
                list = list.filter(id => id !== movieId);
                setIsFavorite(false);
                console.log('Film favorilerden çıkarıldı:', list);
            } else {
                list.push(movieId);
                setIsFavorite(true);
                console.log('Film favorilere eklendi:', list);
            }

            const updatedJsonValue = JSON.stringify(list);
            await AsyncStorage.setItem('favMovies', updatedJsonValue);

        } catch (e) {
            console.error('İşlem gerçekleştirilemedi.', e);
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleFavList}>
                {isFavorite ?
                    <AntDesign name="star" size={35} color="#ffa31a" />
                    :
                    <AntDesign name="staro" size={35} color="white" />
                }
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});
