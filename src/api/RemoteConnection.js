// TODO: componentize!

import React, { useEffect, useState, createContext } from 'react';
import NetInfo from "@react-native-community/netinfo";
import { View, Text } from 'react-native';
import axios from 'axios';
import isEqual from 'lodash/isEqual';

// Database Realm dependencies
import { RealmContext } from './../database/RealmConfig';

const api = axios.create({
  baseURL: 'http://challenge-front-end.bovcontrol.com/v1'
});

const headers = {
  'Content-Type': 'application/json',
  'access-control-allow-origin': '*'
};

export const RemoteConnectionContext = createContext();

export const RemoteConnectionProvider = (props) => {

  // Untracked Database to monitoring
  const { useRealm, useObject, useQuery } = RealmContext;
  const realm = useRealm();

  // shared remote data list
  const [remoteListData, setRemoteListData] = useState([]);

  // TODO: refactor to joint ites before send to api
  // Sycronize remote API with offline data
  const syncUntrackedData = async () => {
    
    let simpleCounter = 0;
    const untrackedData = realm.objects('Untracked');

    const promises = untrackedData.map(async (element) => {
      switch (element.operation) {

        case 'create':
          const realmObject = realm.objectForPrimaryKey('CheckList', element.children_id)
          await saveToApi(realmObject);
          simpleCounter++;
          await realm.write(async () => { await realm.delete(element); });
        break;

        default:
          console.log(`Operação inválida: ${element.operation}`);
        break;

      }
    });
  
    await Promise.all(promises);

    console.log(`[RemoteConnection] UPLOAD ${simpleCounter} itens successfully.`);
  };

  // Download API Data List
  const syncRemoteData = async () => {
    let fetchedData = [];
    try {
      const response = await api.get('/checkList');
      if (response?.data) fetchedData = response.data;
    } catch (error) {
      console.log("[RemoteConnection]", error)
    }
    console.log(`[RemoteConnection] DOWNLOAD ${fetchedData.length} itens successfully.`);
    const saving = await saveToRealm(fetchedData);
    setRemoteListData(fetchedData);
  };

  function compareObjects(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let i = 0; i < keys1.length; i++) {
      const key = keys1[i];

      if (obj1[key] !== obj2[key]) {
        // console.log(obj1[key], obj2[key]);
        return false;
      }
    }

    return true;
  }

  // Save data in API
  const saveToApi = async (modelObject) => {
    try {
      const response = await api.post('/checkList', {
        "checklists": [
          {
            "_id": modelObject._id,
            "type": modelObject.type,
            "amount_of_milk_produced": modelObject.amount_of_milk_produced,
            "number_of_cows_head": modelObject.number_of_cows_head,
            "had_supervision": modelObject.had_supervision,
            "farmer": {
              "name": modelObject.farmer.name,
              "city": modelObject.farmer.city
            },
            "from": {
              "name": modelObject.from.name
            },
            "to": {
              "name": modelObject.to.name
            },
            "location": {
              "latitude": modelObject.location.latitude,
              "longitude": modelObject.location.longitude
            },
            "created_at": modelObject.created_at,
            "updated_at": modelObject.updated_at
          }
        ]
      }, { headers: headers });
      console.log('saveToApi >> _id:', response.data);
    } catch (error) {
      console.log("[RemoteConnection]", error)
    }
  }

  // Save API Data List in database
  async function saveToRealm(remoteListData) {
    let counterSaveSucess = 0;
    let counterEditSucess = 0;
    let counterSkipped = 0;
    realm.write(() => {
      remoteListData.map((jsonRemoteObject) => {

        const realmObject = realm.objectForPrimaryKey('CheckList', `${jsonRemoteObject._id}`);
        const isNewItemFromRemote = !!!realmObject;

        if (isNewItemFromRemote) {
          // create new db register
          const modelCreateCheckListRealmObject = {
            "_id": `${jsonRemoteObject._id}`,
            "type": jsonRemoteObject.type,
            "amount_of_milk_produced": parseInt(jsonRemoteObject.amount_of_milk_produced),
            "number_of_cows_head": parseInt(jsonRemoteObject.number_of_cows_head),
            "had_supervision": jsonRemoteObject.had_supervision,
            "farmer": {
              "name": jsonRemoteObject.farmer.name,
              "city": jsonRemoteObject.farmer.city
            },
            "from": {
              "name": jsonRemoteObject.from.name
            },
            "to": {
              "name": jsonRemoteObject.to.name
            },
            "location": {
              "latitude": jsonRemoteObject.location.latitude,
              "longitude": jsonRemoteObject.location.longitude
            },
            "created_at": jsonRemoteObject.created_at,
            "updated_at": jsonRemoteObject.updated_at,
            "__v": jsonRemoteObject.__v,
          }
          try {
            realm.create('CheckList', modelCreateCheckListRealmObject);
            counterSaveSucess++;
          } catch (error) {
            counterSkipped++;
            console.log(`[RemoteConnection]`, error);
          }
        }
        else {
          // update existing db register
          // TODO: comparar objetos para identificar quem precisa de updtae
          try {
            realmObject.type = jsonRemoteObject.type;
            realmObject.amount_of_milk_produced = parseInt(jsonRemoteObject.amount_of_milk_produced);
            realmObject.number_of_cows_head = parseInt(jsonRemoteObject.number_of_cows_head);
            realmObject.had_supervision = jsonRemoteObject.had_supervision;
            realmObject.farmer = {
              name: jsonRemoteObject.farmer.name,
              city: jsonRemoteObject.farmer.city
            }
            realmObject.from = {
              name: jsonRemoteObject.from.name
            }
            realmObject.to = {
              name: jsonRemoteObject.to.name
            }
            realmObject.location = {
              latitude: jsonRemoteObject.location.latitude,
              longitude: jsonRemoteObject.location.longitude
            }
            realmObject.created_at = jsonRemoteObject.created_at;
            realmObject.updated_at = jsonRemoteObject.updated_at;
            counterEditSucess++;
          } catch (error) {
            console.log(`[RemoteConnection]`, error);
          }
        }
      });
    });
    console.log(`[RemoteConnection] CREATED ${counterSaveSucess} new itens, EDITED ${counterEditSucess} existing successfully and ${counterSkipped} skipped.`);
  }

  // Syncronize local database with remote API
  const syncLocalData = async () => {

    if (!remoteListData.length) return;

    const localObjects = realm.objects('CheckList');
    const untrackedObjects = realm.objects('Untracked');

    // sync remote update first
    if (untrackedObjects.length > 0) {
      handlePushToRefresh();
      return;
    }

    const localIds = localObjects.map((item) => item._id);
    const remoteIds = remoteListData.map((item) => `${item._id}`);
    const diffArray = localIds.filter(item => !remoteIds.includes(item))
      .concat(remoteIds.filter(subitem => !localIds.includes(subitem)));

    let counterSucess = 0;
    let counterSkipped = 0;

    realm.write(() => {

      diffArray.forEach(id => {
        try {
          const itemToExclude = realm.objectForPrimaryKey('CheckList', id);
          realm.delete(itemToExclude);
          counterSucess++;
        } catch (error) {
          counterSkipped++;
          console.log('[syncLocalData]', error);
        }
      });
    });

    console.log(`[RemoteConnection] REMOVED ${counterSucess} itens successfully and ${counterSkipped} skipped.`);
  };

  // Refresh Control
  const handlePushToRefresh = async () => {
    await syncUntrackedData();
    await syncRemoteData();
  }

  useEffect(() => {

    syncUntrackedData();
    syncRemoteData();

    // Keep checking innteret verification
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
      }
    });

  }, []);

  // verify when remoteList update
  useEffect(() => {

    syncLocalData();

  }, [remoteListData]);

  const isDebugMode = !!props?.boolDebugMode && props.boolDebugMode === true;

  return (
    <>
      {isDebugMode && <View>
        {remoteListData.map((itemData) => (
          <Text key={itemData._id}>{`Nome: ${itemData.farmer.name} (${itemData.from.name})`}</Text>
        ))}
      </View>}
      <RemoteConnectionContext.Provider value={{ remoteListData, handlePushToRefresh }}>
        {
          props.children
        }
      </RemoteConnectionContext.Provider>
    </>
  );

};

export default RemoteConnectionProvider;
