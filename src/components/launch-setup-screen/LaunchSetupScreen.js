import React, { useEffect, useState, useContext } from 'react';
import { StackActions } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Surface, HStack, Stack } from '@react-native-material/core';
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicatorStyled from './../utils/activity-indicator/ActivityIndicatorStyled'

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

const LaunchSetupScreen = ({ navigation }) => {

    const { useRealm, useObject, useQuery } = RealmContext;
    const realm = useRealm();

    // Loading state controller
    const [isLoading, setIsLoading] = useState(true);

    // Processing state controller
    const [isProcessing, setIsProcessing] = useState(false);

    // Setup steps controller
    const [setupStep, setSetupStep] = useState(0);

    // Database creation instance
    const [hasDatabase, setCreateDatabase] = useState(false);

    // Untracked data controller
    const [untrackedData, setUntrackedData] = useState([]);

    // Remote data controller
    const [hasRemoteData, setRemoteData] = useState(false);

    const handleInicialize = () => {

        setIsProcessing(true);
        setSetupStep(1);

        // TODO: create real validations that allow to check
        // the health of components and initialize them if necessary

        setTimeout(() => {
            // check database
            if (!!realm.path) {
                setCreateDatabase(true);
            }
            // TODO: if not, force create it
        }, 500);

        setTimeout(async () => {
            // force start app
            setSetupStep(3);
        }, 1500);
    }

    useEffect(() => {

        if (hasDatabase) {
            const isFirstStep = setupStep === 1;
            if (isFirstStep) setSetupStep(2);
        }

        if (setupStep === 3) {
            setTimeout(async () => {
                setIsProcessing(false);
                await AsyncStorage.setItem('@FirstTimeVisit', 'true');
                navigation.dispatch(
                    StackActions.replace('MainCheckList')
                )
            }, 500);
        }

    }, [setupStep, hasDatabase]);

    useEffect(() => {

        AsyncStorage.getItem('@FirstTimeVisit').then((result) => {
            if (result===null) {
                setIsLoading(false);
            }
            else {
                navigation.dispatch(
                    StackActions.replace('MainCheckList')
                )
            }
        });

    }, []);

    const Container = styled(Stack)`
        flex: 1;
        align-items: center;
        justify-content: center;
        background-color: white;
    `;

    const SliderContainer = styled(View)`
        align-items: center;
        margin-vertical: 32px;
    `;

    const TextTitle = styled(Text)`
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 16px;
    `;

    const TextDesc = styled(Text)`
        text-align: center;
        margin-vertical: 16px;
    `;

    const SurfaceLogo = styled(Surface)`
        justify-content: center;
        text-align: center;
        width: 200px;
        height: 200px;
    `;

    const IconLogo = styled(Text)`
        font-size: 130px;
        text-align: center;
        justify-content: center;
    `;

    return (
        <Container>
            {isLoading && <ActivityIndicatorStyled visible />}
            {!isLoading && <>
                <TextTitle>Bem-vindo ao Check List!</TextTitle>
                <SliderContainer>
                    <SurfaceLogo
                        elevation={6}
                        category="medium">
                            <IconLogo>🐮</IconLogo>
                    </SurfaceLogo>
                    {setupStep === 0 && (
                        <TextDesc>
                            Para iniciar, clique no botão Iniciar abaixo.
                        </TextDesc>
                    )}
                    {setupStep === 1 && (
                        <HStack>
                            <TextDesc>
                                Processando...
                            </TextDesc>
                        </HStack>
                    )}
                    {setupStep === 2 && (
                        <TextDesc>
                            Bancos de dados criado ✅
                        </TextDesc>
                    )}
                    {setupStep === 3 && (
                        <TextDesc>
                            Iniciando aplicativo 🚀
                        </TextDesc>
                    )}
                </SliderContainer>
                <Button
                    title="Iniciar"
                    mode="contained"
                    loading={isProcessing}
                    disabled={isProcessing}
                    onPress={() => handleInicialize()} />
            </>}
        </Container>
    );
};

export default LaunchSetupScreen;