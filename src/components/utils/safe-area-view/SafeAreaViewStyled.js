import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';


const SafeAreaViewComponent = styled(SafeAreaView)`
  flex: 1;
`;

const SafeAreaViewStyled = (props) => {
    return (
        <SafeAreaViewComponent {...props}>
            {
                props.children
            }
        </SafeAreaViewComponent>
    )
}

export default SafeAreaViewStyled;