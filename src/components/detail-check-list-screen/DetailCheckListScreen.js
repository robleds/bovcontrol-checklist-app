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

  const { Update, Delete } = React.useContext(RemoteConnectionContext);

  // Delete register local 
  async function handleDeleteForm() {

    await Delete({_id});
    navigation.popToTop();

  }

  // Update register local 
  async function handleEditForm(formBodyData) {
    await Update(formBodyData);
    navigation.popToTop();
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