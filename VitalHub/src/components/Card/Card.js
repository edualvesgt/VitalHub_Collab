
import { useState } from "react"
import { Container, DoubleView } from "../Container/StyleContainer"
import { StatusGray, StatusGreen } from "../Status/Status"
import { TextAbout, TextAccount, TextBlue, TextRed } from "../Text/Text"
import { CardBox, ImageCard, RowCardBox, TextCardBox } from "./StyleCard"

const Card = ({
    image,
    time,
    status,
    onPressCard,
    onPressShow,
    navigation,
    specialty,
    Age,
    Priority,
    Name,
    role }) => {
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


    return (
        <CardBox role={role} status={status} onPress={() => {
            if (role == "Paciente" && status == "realizadas") {
                navigation.replace("FormDoctor");
            }
            // Verifica se a situação é cancelada e retorna null para esse caso
            else if (status == "agendadas") {
                onPressShow()
            }
        }} >
            <ImageCard source={image} />
            <Container>
                <TextCardBox>
                    <TextAccount>{Name}</TextAccount>
                    <TextAbout > {role ? `${Age} Anos ` : `CRM ${Age}`}  <TextAbout>{Priority} </TextAbout> </TextAbout>
                </TextCardBox>
                {Check()}
            </Container>
        </CardBox>
    );
};


export default Card;
