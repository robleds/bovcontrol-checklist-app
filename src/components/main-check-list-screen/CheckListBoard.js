import React from "react";
import { ListItem, Stack, Text } from "@react-native-material/core";
import styled from 'styled-components/native';

const CheckListBoard = (props) => {

    const TextComponent = styled(Text)`
    `;
    
    const ListItemComponent = styled(ListItem)`
    `;

    return (
        <Stack m={4} spacing={4}>
            <TextComponent variant="h4">Minhas Listas</TextComponent>
            <ListItemComponent 
                title={`Luciano Camargo (Fazenda São Rock)`}
                secondaryText={`Atualizado há uma hora`}
                onPress={() =>
                    props.navigation.navigate('DetailCheckList', { status: 'Bruce' })
                } />
        </Stack>
    )
};

export default CheckListBoard;