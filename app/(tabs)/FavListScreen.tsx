import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Header'

export default function FavListScreen() {
  return (
    <View style={styles.container} >
      <Header/>
      <View style={styles.body}>
        <Text>FavListScreen</Text>
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
  }
})