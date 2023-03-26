import React from 'react';
import {
    Button,
    Text,
  } from 'react-native';

const MainCheckListScreen = ({navigation, route}) => {
    return <>
      <Text>Data app is {route.params.status}</Text>
      <Button
            title="ADICIONAR"
            onPress={() =>
                navigation.navigate('AddCheckList', {status: 'Jane'})
            }
        />
      <Button
            title="EDITAR"
            onPress={() =>
                navigation.navigate('EditCheckList', {status: 'Bruce'})
            }
        />
    </>;
};

export default MainCheckListScreen;