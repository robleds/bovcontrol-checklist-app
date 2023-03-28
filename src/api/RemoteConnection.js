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

  // Sycronize remote API with offline data
  const syncUntrackedData = async () => {
    let simpleCounter = 0;
    const untrackedData = realm.objects('Untracked');
    for (const change of untrackedData) {
      try {
        switch (change.operation) {
          case 'create':
            await api.post('/checkList', {
              "checklists": [
                {
                  "_id": change.data._id,
                  "type": change.data.type,
                  "amount_of_milk_produced": change.data.amount_of_milk_produced,
                  "number_of_cows_head": change.data.number_of_cows_head,
                  "had_supervision": change.data.had_supervision,
                  "farmer": {
                    "name": change.data.farmer.name,
                    "city": change.data.farmer.city
                  },
                  "from": {
                    "name": change.data.from.name
                  },
                  "to": {
                    "name": change.data.to.name
                  },
                  "location": {
                    "latitude": change.data.location.latitude,
                    "longitude": change.data.location.longitude
                  },
                  "created_at": change.data.created_at,
                  "updated_at": change.data.updated_at
                }
              ]
            }, { headers: headers });
            realm.write(() => { realm.delete(change); });
            simpleCounter++;
            break;
          // case 'update':
          //   await axios.put(`${url}/${change.id}`, JSON.parse(change.data));
          //   break;
          // case 'delete':
          //   await axios.delete(`${url}/${change.id}`);
          //   break;
          default:
            console.log(`Operação inválida: ${change.operation}`);
        }
      } catch (error) {
        console.log(`Erro ao sincronizar alteração offline: ${error}`);
      }
    }
    console.log(`[RemoteConnection] UPLOAD ${simpleCounter} itens successfully.`);
  };

  // Download API Data List
  const syncRemoteData = async () => {
    let fetchedData = [];
    try {
      const response = await api.get('/checkList');
      if (response?.data) fetchedData = response.data;
    } catch (error) {
      console.log("## ", error)
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
        console.log(obj1[key], obj2[key]);
        return false;
      }
    }
  
    return true;
  }

  // Save API Data List in database
  async function saveToRealm(propsListData) {
    let counterSaveSucess = 0;
    let counterEditSucess = 0;
    let counterSkipped = 0;
    realm.write(() => {
      propsListData.map((jsonRemoteObject) => {

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
          }
          try {
            realm.create('CheckList', modelCreateCheckListRealmObject);
            counterSaveSucess++;
          } catch (error) {
            counterSkipped++;
            // console.log(`[RemoteConnection]`, error);
          }
        }
        else {
          // update existing db register
          // TODO: comparar objetos para identificar quem precisa de updtae
          realmObject.type = jsonRemoteObject.type;
          realmObject.amount_of_milk_produced = parseInt(jsonRemoteObject.amount_of_milk_produced);
          realmObject.number_of_cows_head = parseInt(jsonRemoteObject.number_of_cows_head);
          realmObject.had_supervision = jsonRemoteObject.had_supervision;
          realmObject.farmer = {
            name : jsonRemoteObject.farmer.name,
            city : jsonRemoteObject.farmer.city
          }
          realmObject.from = {
            name : jsonRemoteObject.from.name
          }
          realmObject.to = {
            name : jsonRemoteObject.to.name
          }
          realmObject.location = {
            latitude : jsonRemoteObject.location.latitude,
            longitude : jsonRemoteObject.location.longitude
          }
          realmObject.created_at = jsonRemoteObject.created_at;
          realmObject.updated_at = jsonRemoteObject.updated_at;
          counterEditSucess++;
        }

        
      });
    });
    console.log(`[RemoteConnection] CREATED ${counterSaveSucess} new itens, EDITED ${counterEditSucess} existing successfully and ${counterSkipped} skipped.`);
  }

  // Syncronize local database with remote API
  const syncLocalData = async () => {

    if (!remoteListData.length) return;

    const localObjects = realm.objects('CheckList');
    
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

  // only when remoteList update
  useEffect(() => {

    syncLocalData();

  }, [remoteListData]);

  useEffect(() => {

    syncUntrackedData();
    syncRemoteData();

    // Keep checking innteret verification
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
      }
    });

  }, []);

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
