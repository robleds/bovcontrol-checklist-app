import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export const RemoteConnection = props => {

  const [listData, setListData] = useState([]);
  useEffect(() => {

    const getListData = async () => {
      const fetchedListData = await fetchData();
      setListData(fetchedListData);
      console.log(`[RemoteConnection] GET call on Item List loaded ${fetchedListData.length} itens successfully.`);
    };

    getListData();
  }, []);

  const isDebugMode = !!props?.boolDebugMode && props.boolDebugMode===true;

  if (isDebugMode) {
    return (
      <>
        <View>
          {listData.map((itemData) => (
            <Text key={itemData._id}>{`Nome: ${itemData.farmer.name} (${itemData.from.name})`}</Text>
          ))}
        </View>
        <View>
          {
            props.children
          }
        </View>
      </>
    );
  }
  else {
    return (
      <>
        {
          props.children
        }
      </>
    )
  }
  
};

const api = axios.create({
  baseURL: 'http://challenge-front-end.bovcontrol.com/v1'
});

const fetchData = async () => {
  let listData = [];
  try {
    const response = await api.get('/checkList');
    if (response?.data) listData = response.data;
  } catch(error) {
    console.log("## ", error)
  }
  return listData;
};

export default RemoteConnection;
