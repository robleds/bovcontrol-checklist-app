import React, { useEffect, useState } from "react";
import { ListItem, Stack, Text } from "@react-native-material/core";
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

    const [checklistObjects, setCheckListData] =
        useState(exists ? realm.objects('CheckList') : []);

    const TextComponent = styled(Text)`
    `;

    const ListItemComponent = styled(ListItem)`
    `;

    useEffect(() => {

        // console.log("[DataListBoard: CheckList]", checklistObjects.length);

    }, []);

    return (
        <Stack m={4} spacing={4}>
            <TextComponent variant="h4">Minhas Listas</TextComponent>
            {realm.objects('CheckList').map((item, idx) => (
                <ListItemComponent
                    key={idx}
                    title={`${item.from.name} (${item.farmer.name})`}
                    secondaryText={`${moment(item.updated_at).fromNow()}`}
                    onPress={() =>
                        props.navigation.navigate('DetailCheckList', { data:JSON.stringify(item) })
                    } />
            ))}
        </Stack>
    )
};

export default DataListBoard;