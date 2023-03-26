import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import SafeAreaViewStyled from './components/safe-area-view/SafeAreaViewStyled'
import ActivityIndicatorStyled from './components/activity-indicator/ActivityIndicatorStyled';
import {RealmContext} from './database/RealmConfig';

const Navigation = () => {

    const isDarkMode = useColorScheme() === 'dark';
    const {useRealm, useObject, useQuery} = RealmContext;
    const realm = useRealm();
    
    useEffect(() => {

        console.log("Navigation inicialized");
      
    }, []);
  
    return (
        <SafeAreaViewStyled>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <ActivityIndicatorStyled visible />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                
            </ScrollView>
        </SafeAreaViewStyled>
    );
}

export default Navigation;
