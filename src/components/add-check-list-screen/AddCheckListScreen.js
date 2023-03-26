import React from 'react';
import {
    Text,
  } from 'react-native';

const AddCheckListScreen = ({navigation, route}) => {
    return <Text>Data app is {route.params.status}</Text>;
};

export default AddCheckListScreen;