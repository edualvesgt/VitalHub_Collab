import styled from "styled-components"

export const ScrollForm = styled.ScrollView`
width: 100%;
height:90%;

`

export const ScrollCreate = styled.ScrollView`
width: 100%;
`
export const ContainerForm = styled.SafeAreaView`
width:100%;

`
export const ButtonLogout = styled.TouchableOpacity`
    width: 40%;
    height: 50px;
    background-color: #ACABB7;
    border-radius: 5px;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
    align-self: center;
    padding-top: 5%;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({activeOpacity: 0.8})`

    padding: 12px;
    border-radius: 10px;
    background-color: #496bba;
    border: 1px solid #fbfbfb;

    position: absolute;
    bottom: -10px;
    right: -15px;
    z-index: 99;

`
