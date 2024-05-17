import { Platform } from "react-native";
import styled, { css } from "styled-components";

export const ModalTitle = styled.View`
width: 75%;
height:140px;
border-radius: 5px;
position: relative;
z-index: 2;

margin-top: 240px;

background-color: white;

${props => Platform.OS == "ios" ? css`box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.25);` : css`elevation: 3;`}
display: flex;
align-items:center;
justify-content:center;
`