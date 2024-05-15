import { Platform } from "react-native";
import styled, { css } from "styled-components";

export const Button = styled.TouchableOpacity`
width: 90%;
height: 44px;
border-radius: 5px;
padding: 12px 8px ;
background-color: #496BBA;
margin-top: 15px;
`

export const ButtonModal = styled(Button)`
width: 100%;

${props => Platform.OS == "ios" ? css``
: css`
    margin: 0px 0px ; 
` }
`
export const ButtonForm = styled.TouchableOpacity`
width: 90%;
height: 44px;
border-radius: 5px;
padding: 12px 8px;
background-color: #496BBA;
margin-top: 30px;
`

export const ButtonTitle = styled.Text`
font-size: 14px;
font-family: "MontserratAlternates_500Medium";
color: #FFFFFF;
text-align: center;
align-self: center;
text-transform: uppercase;

`

export const BlueTitle = styled.Text`
font-size: 14px;
font-family: "MontserratAlternates_700Bold";
text-align: center;
text-transform: uppercase;

${props => props.clickButton ? css`
        color: #fbfbfb;
    `: css`
        color: #34898F;
    `}

`


export const ButtonGoogle = styled.TouchableOpacity`
width: 90%;
height: 44px;
border-radius: 5px;
padding: 8px 8px;
background-color: #FAFAFA;
margin-top: 15px;
border: 2px solid #496BBA ;
flex-direction: row; /* Adicionando flex-direction: row para organizar os itens em uma linha */
align-items: center;
justify-content: center;
`

export const ButtonTitleGoogle = styled.Text`
font-size: 14px;
font-family: "MontserratAlternates_500Medium";
color: #496BBA;
text-align: center;
text-transform: uppercase;

`

export const ButtonBack = styled.TouchableOpacity`
width: 100px;
position: absolute;
margin-top: 85px;
margin-left: 20px;
align-self: flex-start;
`


export const WhiteButton = styled.TouchableHighlight`
width: 110px;
height: 40px;

border: 2px solid #607EC5;
border-radius: 5px;

display:flex;
justify-content: center;
align-items:center;
`

export const BlueButton = styled.TouchableOpacity`

${props => props.clickButton ? css`
        background-color: #496bba;
        width: 30%;
        height: 35px;
        `
        : css`
            background-color: transparent;
            border: 2px solid #607EC5;
            width: 32%;
            height: 40px;
            
        `};
border-radius: 5px;
display:flex;
justify-content: center;
align-items:center;

`

export const BlueButtonTitle = styled.Text`
${props => props.clickButton ? css`
        color: #fbfbfb;
    `: css`
        color: #607EC5;
    `}
font-size: 12px;
font-family: "MontserratAlternates_600SemiBold";

`
export const SmallButton = styled.TouchableOpacity`
font-family: "MontserratAlternates_600SemiBold";
border-radius: 7px;
display: flex;
align-items:center;
justify-content: center;
${props => props.clickButton ? css`
        background-color: #496bba;
        width: 30%;
        height: 40px;
        `
        : css`
            background-color: transparent;
            border: 2px solid #60BFC5;
            width: 30%;
            height: 45px;
        `};
`

export const ButtonSendPhoto = styled.TouchableOpacity`
width: 47%;
height: 44px;
border-radius:5px;
/* padding: 12px; */
background-color: #49B3BA;
font-family: "MontserratAlternates_600SemiBold";
font-weight: bold;
font-size: 14px;
margin-top: 10px;
gap: 10px;
flex-direction:row ;
justify-content: center;
align-items: center;
`

export const ButtonFlip = styled(Button)`
width: 20%;
height: auto;
/* background-color: aqua; */
background-color: transparent;
align-items: center;
justify-content: center;
/* border: red 1px solid;s */
`

export const ButtonPhoto = styled.TouchableOpacity`
padding: 20px;
border-radius: 15px;
background-color: 'transparent';
align-items: "center";
justify-content: "center";
`