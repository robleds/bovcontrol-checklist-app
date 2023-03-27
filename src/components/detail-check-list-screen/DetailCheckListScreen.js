import React from 'react';
import { Text, Button } from "@react-native-material/core";

const DetailCheckListScreen = ({navigation, route}) => {
  const {
    _id,
    type,
    amount_of_milk_produced,
    farmer,
    from,
    to,
    number_of_cows_head,
    had_supervision,
    location,
    created_at,
    updated_at,
    __v
  } = JSON.parse(route.params.data);
  return <>
    <Text>Id: {_id}</Text>
    <Text>type: {type}</Text>
    <Text>amount_of_milk_produced: {amount_of_milk_produced}</Text>
    <Text>farmer.name: {farmer.name}</Text>
    <Text>from.name: {from.name}</Text>
    <Text>to.name: {to.name}</Text>
    <Text>number_of_cows_head: {number_of_cows_head}</Text>
    <Text>had_supervision: {had_supervision}</Text>
    <Text>location.latitude: {location.latitude}</Text>
    <Text>location.longitude: {location.longitude}</Text>
    <Text>created_at: {created_at}</Text>
    <Text>updated_at: {updated_at}</Text>
    <Text>__v: {__v}</Text>
    <Button
      title="EDITAR"
      onPress={() => navigation.navigate('EditCheckList', { status: 'Robs' })} />
  </>;
};

export default DetailCheckListScreen;