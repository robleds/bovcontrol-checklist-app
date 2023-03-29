import React from 'react';

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

// Form Component
import FormFields from '../utils/form-and-fields/FormFields';

const AddCheckListScreen = ({ navigation, route }) => {

  // Untracked Database to monitoring
  const { useRealm } = RealmContext;
  const realm = useRealm();

  // Save API Data List in database
  async function handleSendForm(formBodyData) {
    
    const uniqueId1 = Math.floor(Math.random() * 10000000000000);
    const uniqueId2 = Math.floor(Math.random() * 10000000000000);

    if (formBodyData !== {}) {

      const modelCreateCheckListRealmObject = {
        "_id": `${uniqueId2}`,
        "type": formBodyData.type,
        "amount_of_milk_produced": parseInt(formBodyData.amount_of_milk_produced),
        "number_of_cows_head": parseInt(formBodyData.number_of_cows_head),
        "had_supervision": formBodyData.had_supervision,
        "farmer": {
          "name": formBodyData.farmer.name,
          "city": formBodyData.farmer.city
        },
        "from": {
          "name": formBodyData.from.name
        },
        "to": {
          "name": formBodyData.to.name
        },
        "location": {
          "latitude": -formBodyData.location.latitude,
          "longitude": formBodyData.location.longitude
        },
        "created_at": formBodyData.updated_at,
        "updated_at": formBodyData.updated_at,
        "__v": formBodyData.__v
      };

      realm.write(() => {
        
        const modelCreateUntrackedRealmObject = {
          "_id": `${uniqueId1}`,
          "operation": 'create',
          "updated_at": formBodyData.updated_at,
          "children_id": `${uniqueId2}`,
          "children_data": modelCreateCheckListRealmObject
        }

        try {
          // realm.delete(realm.objects('Untracked')[0]);
          const result = realm.create('Untracked', modelCreateUntrackedRealmObject);
        } catch (error) {
          console.log(`[AddCheckListScreen]`, error);
        }

      });

    }

    navigation.popToTop();
  }

  return (
    <>
      <FormFields action="submit" onSubmit={handleSendForm} submitButtonLabel="SALVAR" />
    </>
  );
};

export default AddCheckListScreen;