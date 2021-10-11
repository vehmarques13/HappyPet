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
export const Background = styled.Image`
    width: 100%;
    height: 150px;
`;

export const SwipeDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #00B1E1;
    border-radius: 5px;
    margin: 2px;
`;

export const SwipeDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #1C263F;
    border-radius: 5px;
    margin: 2px;
`;

export const SwipeItem = styled.View`
    flex: 1;
    background-color: #00B1E1;
`;

export const SwipeImage = styled.Image`
    width: 100%;
    height: 200px;
`;

export const FakeSwiper = styled.View`
`;

export const PageBody = styled.View`
    background-color: white;
    margin-top: -50px;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -40px;
    padding: 0 10px;
`;

export const Avatar = styled.Image`
    width: 112px;
    height: 135px;
    border-radius: 11px;
    margin: 0 15px 0 8px;
    border: 1px solid rgba(230, 230, 230, 0.6);
`;

export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const UserInfoName = styled.Text`
    font-weight: bold;
    font-size: 17px;
    color: #1C263F;
    margin-bottom: 2px;
`;

export const UserInfoState = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #858585;
`;

export const UserButton = styled.TouchableOpacity`
    width: 38px;
    height: 38px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid rgba(230, 230, 230, 1);
    justify-content: center;
    align-items: center;
    margin: 20px 2px 0 2px;
`;

export const ServiceArea = styled.View`
    padding: 25px 18px;
`;

export const ServiceTitle = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #1C263F;
    margin-bottom: 6px;
`;

export const ServiceDescription = styled.Text`
    font-size: 15px;
    color: grey;
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(230, 230, 230, 1);
    margin: 10px 0;
`;

export const AnimalsView = styled.View`
    flex-direction: row;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    z-index: 9;
`;