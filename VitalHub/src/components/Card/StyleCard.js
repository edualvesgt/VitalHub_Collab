import styled from "styled-components";

export const CardBox = styled.TouchableOpacity`
box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1); /* Adiciona box-shadow na parte inferior */
background-color: #FFFFFF;
width: 100%;
height: 100px;
padding: 15px;
margin-top: 20px;
/* border: black; */
display: flex;
flex-direction: row;
justify-content:space-between;
align-items:center;
gap:10px;
elevation: 3;

`

export const CardBoxSelect = styled.TouchableOpacity`
box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); /* Adiciona box-shadow na parte inferior */
background-color: #FFFFFF;
width: 90%;
height: 100px;
padding: 15px;
margin-top: 20px;

display: flex;
flex-direction: row;
justify-content:space-between;
align-items:center;
gap:10px;
`

export const CardBoxSelected = styled.TouchableOpacity`
box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1); /* Adiciona box-shadow na parte inferior */
background-color: #FFFFFF;
width: 90%;
height: 100px;
padding: 15px;
margin-top: 20px;
border: 2px solid #496BBA;
display: flex;
flex-direction: row;
justify-content:space-between;
align-items:center;
gap:10px;

`


export const ImageCard = styled.Image`
width: 80px;
height: 80px;
border-radius: 5px;
`

export const TextCardBox = styled.View`
background-color: #FFFFFF;
width: 100%;
display: flex;
align-items:flex-start;
gap:3px;
padding-bottom: 10px;
/* margin-bottom: 10px; */
`

export const RowCardBox = styled.View`
width: 100%;
display:flex;
flex-direction:row;
justify-content:space-between;
background-color: #FFFFFF;
`