import React from 'react';
import { View,  } from 'react-native';
import styled from 'styled-components/native';


const ViewComponent = styled(View)`
  flex: 1;
  background-color: 'red';
`;

const ViewStyled = (props) => {
    return (
        <ViewComponent />
    )
}

export default ViewStyled;