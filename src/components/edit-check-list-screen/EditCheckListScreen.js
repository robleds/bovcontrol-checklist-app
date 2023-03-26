import React from 'react';
import {
    Text,
  } from 'react-native';

const EditCheckListScreen = ({navigation, route}) => {
    return <Text>Data app is {route.params.status}</Text>;
};

export default EditCheckListScreen;