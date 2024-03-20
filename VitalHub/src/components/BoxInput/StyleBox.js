import styled from "styled-components";

//Component que Possui label e input
export const FieldContent = styled.View`
/* Define o valor da Largura de acordo com o valor da props */
width:${props => `${props.fieldWidth}%`};

margin-top:20px;
align-self: center;

/* margin-left:35px; */
/* border:1px solid purple; */

`
export const FieldContentForm = styled.View`
/* Define o valor da Largura de acordo com o valor da props */
width:${props => `${props.fieldWidth}%`};

margin-top:20px;
align-self: center;

/* margin-left:35px; */

`