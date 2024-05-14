import { Platform } from "react-native";
import styled, { css } from "styled-components";

export const LinkMedium = styled.Text`
font-size:16px;
font-family:"MontserratAlternates_500Medium";
color: #8C8A97;
/* margin-top: 10px; */
margin-bottom: 15px;
/* align-self:left; */
margin-left: 20px;
text-decoration: underline;
`

export const TextLink = styled.Text`
color: #4D659D;
text-decoration: underline;
font-family: "Quicksand_600SemiBold";
font-size: 14px;
`

export const LinkCode = styled.Text`
color: #344F8F;
text-decoration: underline;
margin-top: 30px;
font-family: "Quicksand_600SemiBold";
font-size: 14px;

`
export const LinkCancel = styled.Text`
color: #344F8F;
text-decoration: underline;

font-family: "MontserratAlternates_500Medium";
font-size: 14px;
${props => Platform.OS == "ios" ? css`margin-top: 30px;`
: css`
margin-top: 30px;
margin-bottom: 50px;`}

`



