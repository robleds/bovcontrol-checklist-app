import React from 'react';
import {
  Button,
  Text,
} from 'react-native';
import { RandomNumberGenerator } from '../../database/RandomNumberGenerator';

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

const AddCheckListScreen = ({ navigation, route }) => {

  // Untracked Database to monitoring
  const { useRealm } = RealmContext;
  const realm = useRealm();

  // Save API Data List in database
  async function handleSendForm(formBodyData) {
    const uniqueId1 = Math.floor(Math.random() * 10000000000000);
    const uniqueId2 = Math.floor(Math.random() * 10000000000000);
    const dateNow = new Date();
    if (formBodyData !== {}) {
      const modelCreateCheckListRealmObject = {
        "_id": `${uniqueId2}`,
        "type": 'ABC', //formBodyData.type,
        "amount_of_milk_produced": 111, //parseInt(formBodyData.amount_of_milk_produced),
        "number_of_cows_head": 222, //parseInt(formBodyData.number_of_cows_head),
        "had_supervision": true, //formBodyData.had_supervision,
        "farmer": {
          "name": '1232Fazenda', //formBodyData.farmer.name,
          "city": '2Cidade' //formBodyData.farmer.city
        },
        "from": {
          "name": '543 2Fazendeiro' //formBodyData.from.name
        },
        "to": {
          "name": '' //formBodyData.to.name
        },
        "location": {
          "latitude": -21, //formBodyData.location.latitude,
          "longitude": -46 //formBodyData.location.longitude
        },
        "created_at": dateNow, //formBodyData.created_at,
        "updated_at": dateNow, //formBodyData.updated_at,
        "__v": 1 //formBodyData.__v
      };
      realm.write(() => {
        const modelCreateUntrackedRealmObject = {
          "_id": `${uniqueId1}`,
          "operation": 'create',
          "updated_at": dateNow,
          "children_id": `${uniqueId2}`,
          "children_data": modelCreateCheckListRealmObject
        }
        // try {
        //   // realm.delete(realm.objects('CheckList')[0]);
        //   const result1 = realm.create('CheckList', modelCreateCheckListRealmObject);
        // } catch (error) {
        //   console.log(`[AddCheckListScreen]`, error);
        // }
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
      onPress={() => handleSendForm({ id: 1 })}
    />
  </>;
};

export default AddCheckListScreen;