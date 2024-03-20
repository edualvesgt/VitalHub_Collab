import styled from 'styled-components/native';


export const ModalContainer = styled.View`
position: absolute;

width: 100%;
height: 1000px;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5);
`

export const ModalContent = styled.View`
position: relative;

bottom: 10%;
z-index: 50;
background-color: white;
padding: 20px;
border-radius: 10px;
width: 90%;
height: 600px;
justify-content: center;
align-items: center;
`



