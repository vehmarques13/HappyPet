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
    align-items: center;
    padding: 15px 21px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 20px;
    margin: 22px 0 25px 0;
    color: #20283D;
    text-align: center;
`;

export const Form = styled.View`
    width: 92%;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    padding-bottom: 20px;
`;

export const CustomButton = styled.TouchableOpacity`
    flex: 1;
    height: 40px;
    background: #00B1E1;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

export const CustomButtonText = styled.Text`
    font-weight: bold;
    font-size: 15px;
    color: #FFFFFF;
`;

export const CustomButtonNo = styled.TouchableOpacity`
    flex: 1;
    height: 40px;
    background: white;
    border: 2px solid rgba(28, 38, 63, 0.7);
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 5px;
    color: rgba(28, 38, 63, 0.7);
`;

export const CustomButtonTextNo = styled.Text`
    font-weight: bold;
    font-size: 15px;
`;

