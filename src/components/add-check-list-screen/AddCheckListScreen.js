import React from 'react';
import {
  Button,
  Text,
} from 'react-native';
import { UniqueId } from '../../database/UniqueIdGenerator';

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

const AddCheckListScreen = ({ navigation, route }) => {

  // Untracked Database to monitoring
  const { useRealm, useObject, useQuery } = RealmContext;
  const realm = useRealm();

  // Save API Data List in database
  async function saveToRealm(item) {
    const uniqueId1 = UniqueId;
    const uniqueId2 = UniqueId / 2;
    if (item !== {}) {
      const modelCreateCheckListRealmObject = {
        "_id": `${uniqueId2}`,
        "type": 'ABC', //item.type,
        "amount_of_milk_produced": 111, //parseInt(item.amount_of_milk_produced),
        "number_of_cows_head": 222, //parseInt(item.number_of_cows_head),
        "had_supervision": true, //item.had_supervision,
        "farmer": {
          "name": '2Fazenda', //item.farmer.name,
          "city": '2Cidade' //item.farmer.city
        },
        "from": {
          "name": '2Fazendeiro' //item.from.name
        },
        "to": {
          "name": '' //item.to.name
        },
        "location": {
          "latitude": -21, //item.location.latitude,
          "longitude": -46 //item.location.longitude
        },
        "created_at": new Date(), //item.created_at,
        "updated_at": new Date(), //item.updated_at,
        "__v": 1 //item.__v
      };
      realm.write(() => {
        const modelCreateUntrackedRealmObject = {
          _id: `${uniqueId1}`,
          operation: 'create',
          updated_at: new Date(),
          children: `${uniqueId2}`
        }
        try {
          // realm.delete(realm.objects('CheckList')[0]);
          const result1 = realm.create('CheckList', modelCreateCheckListRealmObject);
        } catch (error) {
          console.log(`[AddCheckListScreen]`, error);
        }
        try {
          // realm.delete(realm.objects('Untracked')[0]);
          const result2 = realm.create('Untracked', modelCreateUntrackedRealmObject);
        } catch (error) {
          console.log(`[AddCheckListScreen]`, error);
        }
      });
    }
    navigation.pop();
  }

  return <>
    <Text>Form fields</Text>
    <Button
      title="SALVAR"
      onPress={() => saveToRealm({ id: 1 })}
    />
  </>;
};

export default AddCheckListScreen;