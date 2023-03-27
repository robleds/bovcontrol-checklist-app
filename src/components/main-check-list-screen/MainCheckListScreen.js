import React from 'react';
import { ScrollView } from 'react-native';
import { Button, Text } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckListBoard from './DataListBoard';
import WidgetsBoard from './WidgetsBoard';

const MainCheckListScreen = (props) => {

    React.useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    variant="outlined"
                    title="Novo"
                    onPress={() => props.navigation.navigate('AddCheckList', { status: 'Jane' })}
                    trailing={props => <Icon name="add-circle" size={30} />}
                />
            ),
        });
    }, []);

    return (
        <ScrollView>
            <WidgetsBoard />
            <CheckListBoard {...props} />
        </ScrollView>
    )
};

export default MainCheckListScreen;