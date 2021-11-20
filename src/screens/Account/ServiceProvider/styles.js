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
    background-color: white;
    margin-top: -50px;
    height: 100%;
    border: 1px solid rgba(230, 230, 230, 0.6);
    padding: 0 20px;
`;

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -40px;
`;

export const Avatar = styled.Image`
    width: 112px;
    height: 145px;
    margin: 0 15px 0 0;
    border-radius: 8px;
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
    width: 38px;
    height: 38px;
    background-color: white;
    border-radius: 20px;
    border: 1px solid rgba(230, 230, 230, 1);
    justify-content: center;
    align-items: center;
    margin: 20px 0 0 2px;
`;

export const Button = styled.TouchableOpacity``;

export const ServiceArea = styled.View`
    margin: 10px 0;
`;

export const ServiceTitle = styled.Text`
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

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: rgba(230, 230, 230, 1);
    margin: 10px 0;
`;
