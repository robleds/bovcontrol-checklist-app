import React, { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import SafeAreaViewStyled from './components/utils/safe-area-view/SafeAreaViewStyled'

// Navigation dependencies 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screen Class Component Imports
import LaunchSetupScreen from './components/launch-setup-screen/LaunchSetupScreen';
import MainCheckListScreen from './components/main-check-list-screen/MainCheckListScreen';
import AddCheckListScreen from './components/add-check-list-screen/AddCheckListScreen';
import DetailCheckListScreen from './components/detail-check-list-screen/DetailCheckListScreen';
import EditCheckListScreen from './components/edit-check-list-screen/EditCheckListScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {

    const isDarkMode = useColorScheme() === 'dark';
    
    useEffect(() => {

        // console.log("[Navigation] inicialized");

    }, []);
  
    return (
        <SafeAreaViewStyled>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LaunchSetup">
                    <Stack.Screen name="LaunchSetup" component={LaunchSetupScreen} options={{title: 'Welcome'}} />
                    <Stack.Screen name="MainCheckList" component={MainCheckListScreen} options={{title: 'Check-Lists'}} />
                    <Stack.Screen name="AddCheckList" component={AddCheckListScreen} options={{title: 'Adicionar'}} />
                    <Stack.Screen name="DetailCheckList" component={DetailCheckListScreen} options={{title: 'Detalhes'}} />
                    <Stack.Screen name="EditCheckList" component={EditCheckListScreen} options={{title: 'Editar'}} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaViewStyled>
    );
}

export default Navigation;
