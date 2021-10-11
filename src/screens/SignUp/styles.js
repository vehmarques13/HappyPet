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

export const Question = styled.Text`
    font-weight: bold;
    font-size: 18px;
    margin-top: 40px;
    color: rgba(0, 177, 225, 0.7);
`;

export const Form = styled.View`
    width: 80%;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    padding-bottom: 35px;
`;

export const Type = styled.TouchableOpacity`
    background: #FFFFFF;
    border: 1.5px solid #20283D;
    color: #20283D;
    border-radius: 8px;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin: 10px;
    height: 60px;
`;

export const TypeText = styled.Text`
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    color: #20283D;
`;

