import React from "react";
import { Dimensions } from 'react-native';
import { HStack } from "@react-native-material/core";
import styled from 'styled-components/native';
import WidgetIndicatorStyled from "../widget-indicator/WidgetIndicatorStyled";

const WidgetsBoard = () => {

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
                <WidgetIndicatorStyled textPrimary="12.325" textSecondary="LITROS DE LEITE" />
                <WidgetIndicatorStyled textPrimary="43.123" textSecondary="CABEÇAS DE VACA" />
            </HStackComponent>
            <HStackComponent>
                <WidgetIndicatorStyled textPrimary="664" textSecondary="FAZENDAS" />
                <WidgetIndicatorStyled textPrimary="123" textSecondary="FAZENDEIROS" />
            </HStackComponent>
        </>
    )
};

export default WidgetsBoard;