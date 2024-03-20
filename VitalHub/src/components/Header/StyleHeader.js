import styled from "styled-components";

import { LinearGradient } from 'expo-linear-gradient'
export const HeaderContainer = styled(LinearGradient).attrs({
    colors: ['#60BFC5', '#496BBA'],
    start: { x: 0.05, y: 1.08 },
    end: { x: 1, y: 0 }
})`
height:20%;
border-radius:0px 0px 25px 25px;
flex-direction: row;
justify-content:space-between;
`
export const HeaderContent = styled.SafeAreaView`
margin-top:60px;
`

export const HeaderBox = styled.TouchableOpacity`
width: 45%;
height: 60px;
margin-left:20px;
flex-direction: row;
margin-top: 18%;

`

export const TitleHeader = styled.Text`
color: #FECC2B;
font-size: 24px;
font-family:"Quicksand_500Medium";
text-align: center;
`

export const DataUser = styled.View`
align-items: flex-start;
justify-content: center;
margin-left: 10px;
`

export const TextDefault = styled.Text`
color: #4E4B59;
font-style: 16px;
font-family: "Quicksand_500Medium";
`
export const NameUser = styled.Text`
color: #FBFBFB;
font-style: 18px;
font-family: "MontserratAlternates_600SemiBold";
`

