import React, { useEffect } from 'react';
import styled from 'styled-components/native';

import DogIcon from '../images/dog.svg';
import CatIcon from '../images/cat.svg';
import BirdIcon from '../images/bird.svg';
import HamsterIcon from '../images/hamster.svg';

const AnimalsView = styled.View`
    margin-left: 3px;
`;

export default ({ animals, size }) => {
    const tipoPet = () => {
        switch(animals) {
            case "Canino":
                return <DogIcon width={size} height={size} fill="#1C263F" />;
            case "Pássaro":
                return <BirdIcon width={size} height={size} fill="#1C263F" />;
            case "Felino":
                return <CatIcon width={size} height={size} fill="#1C263F" />;
            case "Roedor":
                return <HamsterIcon width={size} height={size} fill="#1C263F" />;
            default:
                return "Outros";
        }
    }

    useEffect(() => {
        tipoPet();
    }, []);

    return (
        <AnimalsView>
            {tipoPet()}
        </AnimalsView>
    );
}