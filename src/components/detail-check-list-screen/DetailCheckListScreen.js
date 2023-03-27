import React from 'react';
import { Text, Button } from "@react-native-material/core";

const DetailCheckListScreen = ({navigation, route}) => {
  return <>
    <Text>Data app is {route.params.status}</Text>
    <Button
      title="EDITAR"
      onPress={() => navigation.navigate('EditCheckList', { status: 'Robs' })} />
  </>;
};

export default DetailCheckListScreen;