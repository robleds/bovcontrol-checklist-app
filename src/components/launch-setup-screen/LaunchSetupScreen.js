import { StackActions } from '@react-navigation/native';
import React from 'react';
import {
    Button,
} from 'react-native';

const LaunchSetupScreen = ({ navigation }) => {
    return (
        <Button
            title="INICIAR"
            onPress={() =>
                navigation.dispatch(
                    StackActions.replace('MainCheckList', {
                        status: 'offline',
                    })
                )
            }
        />
    );
};

export default LaunchSetupScreen;