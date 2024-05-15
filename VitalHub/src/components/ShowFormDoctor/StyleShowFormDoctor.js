import { Platform } from 'react-native';
import { css } from 'styled-components';
import styled from 'styled-components/native';


export const ShowModalContainer = styled.View`
position: absolute;

width: 100%;
height: 100%;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5);
`

export const ShowModalContent = styled.View`
position: fixed;

left: 0;
right: 0;
bottom: 0;
z-index: 50;
background-color: white;
${props => Platform.OS == "ios" ? 
css`padding: 20px 20px 20px 20px;` : css` padding: 35px 20px 0px 20px;`}

border-radius: 10px;
width: 90%;
height: 60%;
justify-content: center;
align-items: center;
`
export const PhotoShow = styled.Image`
width: 100%;
${props => Platform.OS === "android" ? 
css`height: 45% ;` : css`height: 50% ;`}

border-radius: 10px;
margin-bottom: 20px;
`


