/**
 * Project: BovControl Milk Hiring (desafio-frondedn-v2)
 * https://github.com/bovcontrol/milk-hiring/
 *
 * Develop by: Rodrigo Robledo
 * https://www.linkedin.com/in/robleds/
 * 
 * Stack:
 * • React Native 0.69.8
 * • Node 16.19.1
 * • Ruby 2.7.5
 * • Xcode 14.2
 * • Android Studio 11.0.12
 */

import React, {useEffect} from 'react';
import Navigation from './Navigation';
import RemoteConnection from './RemoteConnection';
import {RealmContext} from './database/RealmConfig';

// Inicialize main application
const App = () => {

  const {RealmProvider} = RealmContext;

  useEffect(() => {

    console.log('App Inicialized');

  }, []);
  
  return (
    <RealmProvider>
        <Navigation />
        <RemoteConnection />
    </RealmProvider>
  );
};

export default App;
