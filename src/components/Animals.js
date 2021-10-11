import React, { useContext } from 'react';
import styled from 'styled-components/native';

import Cat from '../images/cat.svg';
import Dog from '../images/dog.svg';
import Bird from '../images/bird.svg';

const AnimalsArea = styled.View``;

const AnimalsView = styled.View`
    flex-direction: row;
`;

export default ({ animals, size }) => {
    return (
        <AnimalsArea>
            <AnimalsView>
                <Cat width={size} height={size} fill="#1C263F" style={{marginRight: 4}} />
                <Dog width={size} height={size} fill="#1C263F" style={{marginRight: 4}} />
                <Bird width={size} height={size} fill="#1C263F" />
            </AnimalsView>
        </AnimalsArea>
    );
}