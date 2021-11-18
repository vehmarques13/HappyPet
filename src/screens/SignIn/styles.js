import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Name = styled.Text`
    font-weight: bold;
    font-size: 33px;
    margin-bottom: 20px;
    color: #20283D;
`;

export const Box = styled.View`
    background-color: #ffffff;
    width: 80%;
    border-radius: 20px;
    font-family:'Roboto';
    align-items: center;
    border: 1px solid rgba(230, 230, 230, 1);
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 23px;
    margin-top: 40px;
    color: #20283D;
`;

export const Subtitle = styled.Text`
    font-weight: bold;
    font-size: 15px;
    margin: 14px 0 0 0;
    color: #858585;
`;

export const Form = styled.View`
    width: 80%;
    align-items: stretch;
    margin-top: 15px;
    padding-bottom: 40px;
`;

export const InputText = styled.Text`
    font-weight: bold;
    font-size: 15px;
    margin: 32px 0 5px 0;
    color: #A5A5A5;
`;

export const SignMessageButton = styled.View`
    margin: 25px 0 25px 0;
    color: #A5A5A5;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 12.5px;
    font-style: normal;
`;

export const SignMessageButtonTextBold = styled.TouchableOpacity``;

export const CustomButton = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background: #00B1E1;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
`;

export const CustomButtonText = styled.Text`
    font-weight: bold;
    font-size: 15px;
    margin: 10px 0 10px 0;
    color: #FFFFFF;
`;

export const SignMessageError = styled.Text`
    font-size: 13px;
    color: red;
    text-align: center;
    margin-top: 30px;
`;


