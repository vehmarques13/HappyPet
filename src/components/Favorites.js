import React, { useContext } from 'react';
import styled from 'styled-components/native';

import FavoritesFull from '../images/favorite_full.svg';
import FavoritesEmpty from '../images/favorite.svg';

const FavoriteArea = styled.View``;

const FavoriteView = styled.TouchableOpacity``;

export default ({ favorites }) => {

    let s = [0, 0, 0, 0, 0];
    let floor = Math.floor(favorites);
    let left = favorites - floor;

    for (var i = 0; i < floor; i++) {
        s[i] = 2;
    }

    if (left > 0) {
        s[i] = 1;
    }

    return (
        <FavoriteArea>
            {s.map((i, k) => {
                <FavoriteView key={k}>
                    {i === 0 && <FavoritesEmpty width="23" height="23" fill="#A8D4FF" />}
                    {i === 1 && <FavoritesFull width="23" height="23" fill="#A8D4FF" />}
                </FavoriteView>
            })}

            <FavoriteView>
                <FavoritesFull width="23" height="23" fill="#A8D4FF" />
            </FavoriteView>
        </FavoriteArea>
    );
}