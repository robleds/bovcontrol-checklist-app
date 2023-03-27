import React, { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { Button } from 'react-native';
import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

const LaunchSetupScreen = ({ navigation }) => {

    const { useRealm, useObject, useQuery } = RealmContext;
    const realm = useRealm();
    const realmPath = realm.path;
    const exists = Realm.exists({ path: realmPath });

    useEffect(() => {

        const unique_id = uuid().toString();
        const unique_data_id = uuid().toString();
        const today = new Date().toISOString();

        const objUntrackedModel = {
            _id: unique_id,
            type: "create",
            updated_at: today,
            data: {
                _id: unique_data_id,
                type: "BPA",
                amount_of_milk_produced: "987", // must to be number
                farmer: {
                    "name": "string",
                    "city": "string"
                },
                from: {
                    "name": "string"
                },
                to: {
                    "name": "string"
                },
                number_of_cows_head: "987", // must to be number
                had_supervision: true,
                location: {
                    "latitude": -23.5,
                    "longitude": -46.6
                },
                created_at: today,
                updated_at: today,
                __v: 1
            },
        };

        // realm.write(() => {
        //     realm.create('Untracked', objUntrackedModel);
        // });

        // realm.write(() => {
        //     realm.delete(realm.objects('CheckList')[0]);
        //     realm.delete(realm.objects('Untracked')[0]);
        // });

        console.log("[Data Base: CheckList]", realm.objects('CheckList').length);
        console.log("[Data Base: Untracked]", realm.objects('Untracked').length);

        navigation.dispatch(
            StackActions.replace('MainCheckList', {
                status: 'offline',
            })
        )

    }, []);

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