import styled, {css} from "styled-components"
import { Platform } from "react-native"




export const CardBoxClinic = styled.TouchableOpacity`
     /* Adiciona box-shadow na parte inferior */
background-color: #FFFFFF;  
width: 90%;
height: 84px;
padding: 15px;

margin-top: 20px;
flex-direction: row;
justify-content:space-between;
align-items:center;
gap:10px;
/* border: 1px; */

${props => Platform.OS === "ios" ? css`
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    `:
        css` elevation: 10;`}
`
export const CardBoxClinicSelected = styled(CardBoxClinic)`
border: 2px solid #496BBA;
`
export const TextCardBox = styled.View`
background-color: #FFFFFF;
width: 40%;
/* align-content:flex-end; */
/* gap:3px; */
padding-bottom: 10px;
/* border: 1px; */
/* margin-bottom: 10px; */
`

export const AllStatusBox = styled.View`
width: 20%;

/* border: 1px; */
align-items: flex-end;
/* justify-content:space-between; */
background-color: #FFFFFF;
`