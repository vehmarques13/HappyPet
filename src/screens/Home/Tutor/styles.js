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
    padding: 0 20px;
    justify-content: center;
`;

export const ServiceArea = styled.View`
    padding-top: 25px;
`;

export const ServiceTitle = styled.Text`
    font-weight: bold;
    font-size: 18px;
    color: #1C263F;
    margin-bottom: 6px;
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

export const ButtonArea = styled.TouchableOpacity``;

export const Services = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 15px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin: 20px 0;
`;

export const ServicesArea = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 10px;
`;

export const ServicesView = styled.View`
    width: 118px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid rgba(230, 230, 230, 0.8);
    justify-content: center;
    align-items: center;
    padding: 5px 0 15px 0;
`;

export const ServiceName = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: #1C263F;
`;

export const ServiceImage = styled.Image`
    width: 100px;
    height: 100px;
`;

export const Name = styled.Text`
    font-weight: 500;
    font-size: 14px;
    color: #20283D;
`;


