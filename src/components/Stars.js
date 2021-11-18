import React, { useContext } from 'react';
import styled from 'styled-components/native';

import StarFull from '../images/star.svg';

const StarArea = styled.View`
    flex-direction: row;
`;

const StarView = styled.View``;

export default ({ stars, size }) => {

    let s = [0];

    for (let i = 0; i < stars; i++) {
        s.push(i); 
    }

    s.shift();

    return (
        <StarArea>
            {s.map((i, k) => {
                return(
                    <StarView key={k}>
                        <StarFull width={size} height={size} fill="#FFE977" />
                    </StarView>
                )
            })}
        </StarArea>
    );
}