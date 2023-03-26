import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';


const ActivityIndicatorComponent = styled(ActivityIndicator)`
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const StyledActivityIndicator = (props) => {
    const isVisible = !!props?.visible && props.visible===true;
    if (isVisible) {
        return isVisible ? (<ActivityIndicatorComponent size="large" />) : null;
    }
}

export default StyledActivityIndicator;