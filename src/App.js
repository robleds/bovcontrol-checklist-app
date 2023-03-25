/**
 * Projeto: BovControl Milk Hiring (desafio-frondedn-v2)
 * https://github.com/bovcontrol/milk-hiring/
 *
 * Desenvolvido por: Rodrigo Robledo
 * https://www.linkedin.com/in/robleds/
 * 
 * Utilizando React Native 0.69.8
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// Import realm dependencies
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
import {CheckList} from './models/CheckList'
import {Farmer} from './models/Farmer'
import {From} from './models/From'
import {To} from './models/To'
import {Location} from './models/Location'

// Create a configuration object
const realmConfig = {
  schema: [CheckList,Farmer,From,To,Location],
};

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);


// Inicialize main application
const App = () => {
  
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RealmProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
              <Text>Hello World</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
