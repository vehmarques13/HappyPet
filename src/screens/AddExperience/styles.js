import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Scroller = styled.ScrollView`
    width: 100%;
`;

export const HeaderArea = styled.View`
    justify-content: center;
    align-items: center;
    height: 60px;
    background-color: #FFFFFF;
`;

export const HeaderTitle = styled.Text`
    font-weight: bold;
    font-size: 23px;
    color: #20283D;
`;

export const PageBody = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Box = styled.View`
    background-color: #ffffff;
    width: 80%;
    border-radius: 20px;
    font-family:'Roboto';
    align-items: center;
    margin: 30px 0;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 23px;
    margin-top: 35px;
    color: #20283D;
`;

export const Form = styled.View`
    width: 80%;
    align-items: stretch;
    margin-top: 15px;
    padding-bottom: 35px;
`;

export const InputText = styled.Text`
    font-weight: bold;
    font-size: 15px;
    margin: 28px 0 5px 0;
    color: #A5A5A5;
`;

export const ButtonImage = styled.TouchableOpacity`
    width: 79px;
    height: 77px;
    background-color: white;
    border: 1px solid rgba(219, 219, 219, 0.7);
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    margin: 8px 8px 0 0;
`;

export const ImageArea = styled.View`
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ButtonArea = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
`;

export const CustomButton = styled.TouchableOpacity`
    width: 48%;
    height: 40px;
    background: #00B1E1;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const CustomButtonText = styled.Text`
    font-weight: bold;
    font-size: 15px;
    color: #FFFFFF;
`;

export const CustomButtonNo = styled.TouchableOpacity`
    width: 48%;
    height: 40px;
    background: white;
    border: 2px solid rgba(28, 38, 63, 0.7);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    color: rgba(28, 38, 63, 0.7);
`;

export const CustomButtonTextNo = styled.Text`
    font-weight: bold;
    font-size: 15px;
`;

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    z-index: 9;
`;


