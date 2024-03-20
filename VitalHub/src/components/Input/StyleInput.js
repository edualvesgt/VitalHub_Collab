import styled from "styled-components";

export const Input = styled.TextInput.attrs({placeholderTextColor :"#34898F", })`
width:90%;
height:53px;
padding:16px;
margin-top: 15px;
margin-bottom: 15px;
border: 2px solid #49B3BA;
border-radius: 5px;

color: #34898F;
font-size:16px;
font-family:"MontserratAlternates_600SemiBold";
`

export const InputCheck = styled.TextInput.attrs({placeholderTextColor :"#34898F", })`
border: 2px solid #77CACF;
width: 18%;
height: 62px;
/* gap: 5.66%; */
border-radius: 5px;
padding: 5px 18px;
margin-bottom: 30px;
color: #34898F ;
font-size: 40px;
font-family: "Quicksand_600SemiBold";
text-align: center;

`

export const InputProfile =styled.TextInput.attrs({placeholderTextColor :"#33303E" })`
width: 100%;
height: 53px;
margin-top: 10px;
font-size: 16px;
font-family: "MontserratAlternates_600SemiBold";
border-radius: 5px;
padding: 16px;
color: #33303E;
background-color: #F5F3F3;
`
export const InputForm =styled.TextInput.attrs({placeholderTextColor :"#34898F" })`
height:${props => `${props.fieldHeigth}px`};
width: 100%;
margin-top: 10px;
/* height: 120px; */
font-size: 16px;
font-family: "MontserratAlternates_600SemiBold";
border-radius: 5px;
border: 2px solid #49B3BA;
padding: 16px;
color: #34898F;
background-color: #F5F3F3;
`


