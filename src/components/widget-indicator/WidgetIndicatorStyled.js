import React from "react";
import { Dimensions } from 'react-native';
import { ActivityIndicator, Surface, Text } from "@react-native-material/core";
import styled from 'styled-components/native';

const TextPrimaryComponent = styled(Text)`
`;

const TextSecodaryComponent = styled(Text)`
`;

const WidgetIndicatorStyled = ({textPrimary, textSecondary}) => {

    const windowWidth = Dimensions.get('window').width;
    const surfaceWidth = Math.round(windowWidth / 2.2);
    const surfaceHeigth = Math.round(surfaceWidth / 1.8);

    const SurfaceComponent = styled(Surface)`
        justify-content: center;
        align-items: center;
        width: ${surfaceWidth}px
        height: ${surfaceHeigth}px
    `;

    const ActivityIndicatorComponent = styled(ActivityIndicator)`
        padding-bottom: 10px;
    `;

    return (
        <SurfaceComponent elevation={1} category="medium">
            {!textPrimary && <ActivityIndicatorComponent color="black" />}
            {textPrimary && <TextPrimaryComponent>{textPrimary}</TextPrimaryComponent>}
            <TextSecodaryComponent>{textSecondary}</TextSecodaryComponent>
        </SurfaceComponent>
    )
};

export default WidgetIndicatorStyled;