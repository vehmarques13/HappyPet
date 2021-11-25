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
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: #FFFFFF;
    border: 1px solid rgba(230, 230, 230, 0.8);
    flex-direction: row;
    padding: 0 20px;
`;

export const HeaderTitle = styled.Text`
    font-weight: bold;
    font-size: 23px;
    color: #20283D;
`;

export const PageBody = styled.View`
    padding: 0 15px;
    justify-content: center;
    padding: 0 20px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const ListArea = styled.View`
    margin-top: 20px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    z-index: 9;
`;

export const FilterFull = styled.TouchableOpacity`
    margin-top: 15px;
    width: 45px;
    height: 45px;
    border-radius: 15px; 
    background-color: white;
    border: 1px solid rgba(230, 230, 230, 1);
    justify-content: center;
    align-items: center;
    margin-right: 8px;
`;

export const OrganizationFilter = styled.View`
    flex-direction: row;
`;

export const Name = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #20283D;
`;
