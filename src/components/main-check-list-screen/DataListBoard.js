import React, { useEffect, useState, useContext } from "react";
import { ListItem, Stack, Text, HStack, Banner, Button } from "@react-native-material/core";
import styled from 'styled-components/native';
import moment from "moment";
import 'moment/locale/pt'

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

const DataListBoard = (props) => {

    const { useRealm, useObject, useQuery } = RealmContext;
    const realm = useRealm();
    const realmPath = realm.path;
    const exists = Realm.exists({ path: realmPath });

    // TODO: protect system when database isnt launch
    const [checklistObjects, setCheckListData] =
        useState(exists ? realm.objects('CheckList').sorted('updated_at', true) : []);

    // TODO: protect system when database isnt launch
    const [untrackedObjects, setUntrackedData] =
        useState(exists ? realm.objects('Untracked').sorted('updated_at', true) : []);

    const TextComponent = styled(Text)`
    `;

    const ListItemComponent = styled(ListItem)`
    `;

    const BannerComponent = styled(Banner)`
    `;

    const BannerButton = styled(Button)`
    `;

    return (
        <Stack m={4} spacing={4}>
            <TextComponent variant="h4">
                {
                    `Minhas Listas (${untrackedObjects.length+checklistObjects.length})`
                }
            </TextComponent>
            {untrackedObjects.map((item, idx) => (
                <ListItemComponent
                    key={idx}
                    title={`>> ${item.data.from.name} (${item.data.farmer.name})`}
                    secondaryText={`${moment(item.data.updated_at).fromNow()} em ${moment(item.data.updated_at).format('LLL')}`}
                    onPress={() =>
                        props.navigation.navigate('DetailCheckList', { data: JSON.stringify(item.data) })
                    } />
            ))}
            {checklistObjects.map((item, idx) => (
                <ListItemComponent
                    key={idx}
                    title={`${item.from.name} (${item.farmer.name})`}
                    secondaryText={`${moment(item.updated_at).fromNow()} em ${moment(item.updated_at).format('LLL')}`}
                    onPress={() =>
                        props.navigation.navigate('DetailCheckList', { data: JSON.stringify(item) })
                    } />
            ))}
            {!checklistObjects.length && <BannerComponent
                text="Ainda não há nenhuma lista disponível."
                buttons={
                    <HStack spacing={2}>
                        <BannerButton key="add-new" variant="text" title="Criar Lista" compact />
                    </HStack>
                }
            />}
        </Stack>
    )
};

export default DataListBoard;