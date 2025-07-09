import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import Browse from '../screens/Browse';
import { Images } from '../utils/images';
import { Image, View } from 'react-native';
import { Fonts } from '../utils/fonts';
import Favourites from '../screens/Favourites';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import BrowseHeadphone from '../screens/BrowseHeadphone';
import ProductCart from '../screens/ProductCart';
import CartTabIcon from '../components/CartTabIcon';
import FavTabIcon from '../components/FavTabIcon';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        <Stack.Screen name="BrowseHeadphone" component={BrowseHeadphone} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export function MainNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: Fonts.semiBold,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              <Image
                source={Images.Home}
                tintColor={focused ? '#212429' : '#9A9A9A'}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              <Image
                source={Images.Search}
                tintColor={focused ? '#212429' : '#9A9A9A'}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favs',
          tabBarIcon: ({ focused }) => <FavTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="ProductCart"
        component={ProductCart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{}}>
              <Image
                source={Images.Profile}
                tintColor={focused ? '#212429' : '#9A9A9A'}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </View>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
