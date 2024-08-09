import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { View, BackHandler, ToastAndroid } from 'react-native';

export default function TabLayout() {

  useEffect(() => {
    let backPressCount = 0;
    let backPressTimer: NodeJS.Timeout | null = null;

    const handleBackPress = () => {
      if (backPressCount === 0) {
        backPressCount = 1;
        ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
        backPressTimer = setTimeout(() => {
          backPressCount = 0;
        }, 2000);
        return true;
      } else if (backPressCount === 1) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
      if (backPressTimer) clearTimeout(backPressTimer);
    };
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderColor: "white",
          position: 'absolute',
          margin: 30,
          borderRadius: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="SearchScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused ? <Ionicons name='search' color='#ffa31a' size={40} />
                : <Ionicons name='search-outline' color='#1b1b1b' size={45} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              width: 60,
              backgroundColor: '#ffa31a',
              borderRadius: 30,
              marginBottom: 30,
              elevation: 10
            }}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                color={'white'}
                size={40}
              />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="FavListScreen"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused ? <Ionicons name='heart' color='#ffa31a' size={40} />
                : <Ionicons name='heart-outline' color='#1b1b1b' size={45} />}
            </View>
          )
        }}
      />
    </Tabs>
  );
}