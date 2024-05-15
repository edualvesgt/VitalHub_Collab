import styled from "styled-components";

export const Container = styled.View`
flex:1;
align-items:center;
justify-content: center;
background-color: #FBFBFB;
`
export const ContainerClinic = styled.SafeAreaView`
flex:1;
align-items:center;
justify-content: center;
background-color: white;
`

export const ContentClinic = styled.View`
    width: 100%;
    height: 90%;
    /* border: 1px solid black; */
    align-items: center;
    padding-bottom: 10% ;
`

export const CheckEmail = styled.View`
margin-top: 20px;
flex-direction: row;
justify-content: space-between;
width: 90%;

`

export const DoubleView = styled.View`
width: 90%;
flex-direction: row;
justify-content:space-between;
align-items: center;
align-self: center;
`

export const ContainerRow = styled(DoubleView)`
justify-content: center;
`
export const ContainerButtonCam = styled.View`
//border: 1px solid black;
background-color:#0003 ;
margin-top: 40px;
width: 100%;
flex-direction: row;
justify-content: flex-end;
gap: 80px;

`

export const ViewRow = styled(DoubleView)`
width: 90%;
/* border: black; */
align-self: center;
justify-self: center;
justify-content: space-between;
`
export const InputContainer = styled.View`
width: 100%;
margin-top: 30px;
gap:10px;
align-self: center;
align-items: center;

`
export const ContainerForm = styled.View`
width: 100%;
margin-top: 320px;
align-items: center;

`

export const RowContainer = styled.View`
display: flex;
flex-direction:row;
align-items: center;
gap:15px;
margin: 40px 20px 0px 20px;
`
export const RowContainerButton = styled.View`
width: 100%;
display: flex;
flex-direction:row;
align-items: center;
gap:15px;
margin-top: 10px;
/* border: 1px; */
`


export const FlatContainer = styled.FlatList`
width: 100%;
`
export const FlatListClinic = styled.FlatList`
width: 100%;
height: 80%;

margin: 20px 0px 0px 0px;

background-color: white;

`

export const TransparentContainer = styled.TouchableOpacity`
background-color: transparent;
align-items: center;
justify-content: center;
/* border: 1px; */
margin-top: 10px;

width: 40%;
height: 44px;

text-transform: uppercase;
font-weight: bold;
font-size: 18px;
`

export const HR = styled.View`
border-bottom-color: #8C8A97;
border-bottom-width: 2px;
width: 90%;
margin-top:  20px;
align-self: center;
`
export const ContainerLabel = styled.View`
/* border: 1px; */
align-items: flex-start;
width: 90%;
`

export const ContainerCam = styled.View`
width: 100%;
height: 80%;
margin-top: 15%;
`

export const ContainerPhoto = styled.View`
margin: 10px;
flex-direction: 'row';
`

export const ContainerItens = styled.View`
width: 100%;
align-items: center;
`
