import React from 'react';
import { Button, Text } from "@react-native-material/core";
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

// Form Component
import FormFields from '../utils/form-and-fields/FormFields';

// Remote Conection
import { RemoteConnectionContext } from '../../api/RemoteConnection';

const DetailCheckListScreen = ({ navigation, route }) => {

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

  // Untracked Database to monitoring
  const { useRealm } = RealmContext;
  const realm = useRealm();

  const { Delete } = React.useContext(RemoteConnectionContext);

  // Delete register local 
  async function handleDeleteForm() {

    await Delete({_id});
    navigation.popToTop();

  }

  // Update register local 
  async function handleEditForm(formBodyData) {
    const uniqueId1 = Math.floor(Math.random() * 10000000000000);
    const uniqueId2 = Math.floor(Math.random() * 10000000000000);
    const dateNow = new Date();
    // if (formBodyData !== {}) {
    //   const modelCreateCheckListRealmObject = {
    //     "_id": `${uniqueId2}`,
    //     "type": formBodyData.type,
    //     "amount_of_milk_produced": parseInt(formBodyData.amount_of_milk_produced),
    //     "number_of_cows_head": parseInt(formBodyData.number_of_cows_head),
    //     "had_supervision": formBodyData.had_supervision,
    //     "farmer": {
    //       "name": formBodyData.farmer.name,
    //       "city": formBodyData.farmer.city
    //     },
    //     "from": {
    //       "name": formBodyData.from.name
    //     },
    //     "to": {
    //       "name": formBodyData.to.name
    //     },
    //     "location": {
    //       "latitude": -formBodyData.location.latitude,
    //       "longitude": formBodyData.location.longitude
    //     },
    //     "created_at": formBodyData.created_at,
    //     "updated_at": formBodyData.updated_at,
    //     "__v": formBodyData.__v
    //   };
    //   realm.write(() => {
    //     const modelCreateUntrackedRealmObject = {
    //       "_id": `${uniqueId1}`,
    //       "operation": 'create',
    //       "updated_at": dateNow,
    //       "children_id": `${uniqueId2}`,
    //       "children_data": modelCreateCheckListRealmObject
    //     }
    //     try {
    //       // realm.delete(realm.objects('Untracked')[0]);
    //       const result2 = realm.create('Untracked', modelCreateUntrackedRealmObject);
    //     } catch (error) {
    //       console.log(`[DetailCheckListScreen]`, error);
    //     }
    //   });
    // }
    // navigation.pop();
  }

  function handleDelete() {
    Alert.alert('Apagar?', 'Essa ação não pode ser desfeita.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => handleDeleteForm()
      },
    ]);
  }

  const ButtonComponent = styled(Button)`
      width: 120px;
  `;

  React.useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <ButtonComponent
          title="Apagar"
          onPress={handleDelete}
          trailing={props => <Icon name="add-circle" size={30} color={'white'} />}
        />
      ),
    });

  }, []);

  return (
    <>
      <FormFields
        action="edit"
        onSubmit={handleEditForm}
        submitButtonLabel="EDITAR"
        paramData={{
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
        }} />
    </>
  );
};

export default DetailCheckListScreen;