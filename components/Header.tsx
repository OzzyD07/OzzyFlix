import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
    return (
        <View style={styles.container}>
            <Text style={styles.ozzy}>Ozzy</Text>
            <Text style={styles.flix}>Flix</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
        flexDirection: 'row',
    },
    ozzy: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    flix: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffa31a'
    },
})