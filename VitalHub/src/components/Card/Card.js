
import { useState } from "react"
import { Container, DoubleView } from "../Container/StyleContainer"
import { StatusGray, StatusGreen } from "../Status/Status"
import { TextAbout, TextAccount, TextBlue, TextRed } from "../Text/Text"
import { CardBox, ImageCard, RowCardBox, TextCardBox } from "./StyleCard"

const Card = ({ image, time, status, onPressCard, onPressShow, navigation, situation, Age, Priority, Name }) => {
    const [profile, setProfile] = useState("Paciente");

    const Check = () => {
        if (status === "agendadas") {
            return (
                <RowCardBox>
                    <DoubleView style={{ justifyContent: 'space-between' }}>
                        <StatusGreen time={time} />
                        <TextRed onPress={onPressCard}>Cancelar</TextRed>
                    </DoubleView>
                </RowCardBox>
            );
        } else if (status === "realizadas") {
            return (
                <RowCardBox>
                    <DoubleView style={{ justifyContent: 'space-between' }}>
                        <StatusGray time={time} />
                        <TextBlue onPress={onPressShow}>Ver Prontuario</TextBlue>
                    </DoubleView>
                </RowCardBox>
            );
        } else if (status === "canceladas") {
            return (
                <RowCardBox>
                    <StatusGray time={time} />
                </RowCardBox>
            );
        } else {
            return null;
        }
    }

    // Adjusted onPress logic
    // const handleCardPress = () => {
    //     if (status === "r") {
    //         if (profile === "Paciente") {
    //             navigation.replace("FormDoctor");
    //         } else {
    //             onPressShow();
    //         }
    //     }else if (status === "c") {
    //         onPressShow = null 
    //     }
    // };

    return (
        <CardBox onPress={() => {
            // if (profile == "Paciente" && situation.realizadas == true) {
            //     navigation.replace("FormDoctor");
            // }
            // // Verifica se a situação é cancelada e retorna null para esse caso
            // else if (situation.agendadas == true || situation.realizadas == true ) {
            //     onPressShow()
            // }
        }}>
            <ImageCard source={image} />
            <Container>
                <TextCardBox>
                    <TextAccount>{Name}</TextAccount>
                    <TextAbout>{Age} anos <TextAbout>{Priority} </TextAbout> </TextAbout>
                </TextCardBox>
                {Check()}
            </Container>
        </CardBox>
    );
};


export default Card;
