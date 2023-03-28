import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Button, Text } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckListBoard from './DataListBoard';
import WidgetsBoard from './WidgetsBoard';
import styled from 'styled-components/native';

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

// Remote Conection
import { RemoteConnectionContext } from './../../api/RemoteConnection';

const MainCheckListScreen = (props) => {

    const { useRealm, useObject, useQuery } = RealmContext;
    const realm = useRealm();

    // Refresh control
    const { handlePushToRefresh } = React.useContext(RemoteConnectionContext);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        handlePushToRefresh();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const ButtonComponent = styled(Button)`
        width: 100px;
    `;

    React.useEffect(() => {

        props.navigation.setOptions({
            headerRight: () => (
                <ButtonComponent
                    title="Novo"
                    onPress={() => props.navigation.navigate('AddCheckList', { status: 'Jane' })}
                    trailing={props => <Icon name="add-circle" size={30} color={'white'} />}
                />
            ),
        });

        console.log("[MainCheckListScreen: CheckList]", realm.objects('CheckList').length);
        console.log("[MainCheckListScreen: Untracked]", realm.objects('Untracked').length);
        console.log("[MainCheckListScreen: Logs]", realm.objects('LogProd').length);

    }, []);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <WidgetsBoard />
            <CheckListBoard {...props} />
        </ScrollView>
    )
};

export default MainCheckListScreen;