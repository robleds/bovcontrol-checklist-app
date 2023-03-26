import React from 'react';
import {
    Button,
    Text,
    StatusBar,
    useColorScheme,
  } from 'react-native';

const MainCheckListScreen = ({navigation, route}) => {
    return <Text>Data app is {route.params.status}</Text>;
};

export default MainCheckListScreen;