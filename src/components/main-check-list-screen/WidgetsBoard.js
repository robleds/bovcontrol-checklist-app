import React, { useEffect, useState } from "react";
import { Dimensions } from 'react-native';
import { HStack } from "@react-native-material/core";
import styled from 'styled-components/native';
import WidgetIndicatorStyled from "../widget-indicator/WidgetIndicatorStyled";

// Database Realm dependencies
import { RealmContext } from './../../database/RealmConfig';

const WidgetsBoard = () => {

    const { useRealm } = RealmContext;
    const realm = useRealm();

    const [amountOfMilkProduced, setAmountOfMilkProduced] = useState(null);
    const [numberOfCowsHead, setNumberOfCowsHead] = useState(null);
    const [totalChecklist, setFarm] = useState(null);
    const [totalUnsynced, setUnsynced] = useState(null);

    function refresh() {
        const results = realm.objects('CheckList');

        const quantityMilk = results.sum('amount_of_milk_produced').toLocaleString('pt-BR');
        setAmountOfMilkProduced(quantityMilk);

        const quantityCow = results.sum('number_of_cows_head').toLocaleString('pt-BR');
        setNumberOfCowsHead(quantityCow);

        const resultsUnsynced = realm.objects('Untracked');
        const quantityUnsynced = resultsUnsynced.length.toLocaleString('pt-BR');
        setUnsynced(quantityUnsynced);

        const resultsChecklists = realm.objects('CheckList');
        const quantityChecklist = resultsChecklists.length.toLocaleString('pt-BR');
        setFarm(quantityChecklist);
    }

    useEffect(() => {
        refresh();
    }, []);

    // verify when database update
    realm.addListener('change', async (realm) => {
        refresh();
    });

    const windowWidth = Dimensions.get('window').width;
    const surfaceWidth = windowWidth / 2.2;
    const surfaceMargiTop = Math.round(surfaceWidth * 0.05);
    const surfaceSpacing = Math.round(surfaceMargiTop * 1.5);

    const HStackComponent = styled(HStack)`
        justify-content: space-between;
        margin-top: ${surfaceMargiTop}px;
        margin-horizontal: ${surfaceSpacing}px;
    `;

    return (
        <>
            <HStackComponent>
                <WidgetIndicatorStyled textPrimary={amountOfMilkProduced} textSecondary="LITROS DE LEITE" />
                <WidgetIndicatorStyled textPrimary={numberOfCowsHead} textSecondary="CABEÇAS DE VACA" />
            </HStackComponent>
            <HStackComponent>
                <WidgetIndicatorStyled textPrimary={totalChecklist} textSecondary="TOTAL DE LISTAS" />
                <WidgetIndicatorStyled textPrimary={totalUnsynced} textSecondary="NÃO SINCRONIZADO" />
            </HStackComponent>
        </>
    )
};

export default WidgetsBoard;