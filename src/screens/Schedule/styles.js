import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #fcfcfc;
`;

export const Scroller = styled.ScrollView`
    width: 100%;
`;

export const HeaderArea = styled.View`
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: #FFFFFF;
    border: 1px solid rgba(230, 230, 230, 0.8);
`;

export const HeaderTitle = styled.Text`
    font-weight: bold;
    font-size: 23px;
    color: #20283D;
`;

export const PageBody = styled.View`
    padding: 0 20px;
    justify-content: center;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin-top: 20px;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    z-index: 9;
`;


