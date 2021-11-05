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
    background-color: #fcfcfc;
    margin-top: -50px;
    height: 100%;
    border: 1px solid rgba(230, 230, 230, 0.6);
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

export const UserInfoBirth = styled.Text`
    font-weight: 500;
    font-size: 12px;
    color: #b3b3b3;
`;

export const UserButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin: 25px 2px 0 2px;
`;

export const PetArea = styled.View`
    padding: 25px 18px;
`;

export const PetTitle = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #1C263F;
    margin-bottom: 6px;
`;

export const OrganizationArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    z-index: 9;
`;