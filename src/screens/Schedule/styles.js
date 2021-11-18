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
    margin-top: 8px;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const OrganizationArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const ButtonArea = styled.TouchableOpacity``;

export const ScheduleArea = styled.View`
    padding: 25px 0 10px 0;
`;

export const FlatArea = styled.View``;

export const ScheduleTitle = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #1C263F;
    margin-bottom: 6px;
`;

export const DateTitle = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: #00B1E1;
    margin-bottom: 6px;
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(230, 230, 230, 1);
    margin: 20px 0;
`;


