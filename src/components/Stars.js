import React, { useContext } from 'react';
import styled from 'styled-components/native';

import StarFull from '../images/star.svg';
import StarHalf from '../images/star_half.svg';
import StarEmpty from '../images/star_empty.svg';

const StarArea = styled.View``;

const StarButton = styled.TouchableOpacity``;

const StarView = styled.View`
    flex-direction: row;
`;

export default ({ stars, size }) => {

    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(stars);
    let left = stars - floor;

    for (var i = 0; i < floor; i++) {
        s[i] = 2;
    }

    if (left > 0) {
        s[i] = 1;
    }

    return (
        <StarArea>
            {s.map((i, k) => {
                <StarView key={k}>
                    {i === 0 && <StarEmpty width="20" height="20" fill="#FFE977" />}
                    {i === 1 && <StarHalf width="20" height="20" fill="#FFE977" />}
                    {i === 2 && <StarFull width="20" height="20" fill="#FFE977" />}
                </StarView>
            })}

            <StarView>
                <StarButton>
                    <StarEmpty width={size} height={size} fill="#FFE977" />
                </StarButton>
                <StarButton>
                    <StarEmpty width={size} height={size} fill="#FFE977" />
                </StarButton>
                <StarButton>
                    <StarEmpty width={size} height={size} fill="#FFE977" />
                </StarButton>
                <StarButton>
                    <StarEmpty width={size} height={size} fill="#FFE977" />
                </StarButton>
                <StarButton>
                    <StarEmpty width={size} height={size} fill="#FFE977" />
                </StarButton>
            </StarView>
        </StarArea>
    );
}