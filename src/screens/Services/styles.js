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
    padding: 0 15px;
    justify-content: center;
`;

export const SearchArea = styled.View`
    background-color: #FFFFFF;
    height: 45px;
    border-radius: 20px;
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    margin-top: 25px;
    border: 1px solid rgba(230, 230, 230, 1);
`;

export const SearchInput = styled.TextInput`
    flex: 1;
    font-size: 15px;
`;

export const SearchButton = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin-top: 20px;
`;

