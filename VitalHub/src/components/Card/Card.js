
import { useEffect, useState } from "react"
import { Container, DoubleView } from "../Container/StyleContainer"
import { StatusGray, StatusGreen } from "../Status/Status"
import { TextAbout, TextAccount, TextBlue, TextRed } from "../Text/Text"
import { CardBox, ImageCard, RowCardBox, TextCardBox } from "./StyleCard"

function formatarIdade(Idade){
    const date = new Date();
    const anoAtual = date.getFullYear();
    const diaAtual = date.getDate();
    const mesAtual = date.getMonth() + 1;

    const userAno = Idade.slice(0, 4)
    const userDia = Idade.slice(8, 10)
    const userMes = Idade.slice(5, 7)

    const userIdade = anoAtual - userAno
    if (mesAtual < userMes) {
        return userIdade - 1;
    }
    else {
        if (diaAtual < userDia) {
            return `${userIdade - 1}`;
        }
    }

    // return `${userDia}`;
}


export {formatarIdade};

const Card = ({
    image,
    time,
    status,
    onPressCard,
    onPressShow,
    navigation,
    specialty,
    email,
    Consulta,
    Age,
    Priority,
    Name,
    medicoCrm,
    role }) => {
    const [profile, setProfile] = useState("Paciente");

    function timeConsulta(time) {
        return time.slice(11, 16); 
    }
    

    const Check = () => {
        if (status === "agendadas") {
            return (
                <RowCardBox>
                    <DoubleView style={{ justifyContent: 'space-between' }}>
                        <StatusGreen time={timeConsulta(time)} />
                        <TextRed onPress={onPressCard}>Cancelar</TextRed>
                    </DoubleView>
                </RowCardBox>
            );
        } else if (status === "realizadas") {
            return (
                <RowCardBox>
                    <DoubleView style={{ justifyContent: 'space-between' }}>
                        <StatusGray time={timeConsulta(time)} />
                        <TextBlue onPress={onPressShow}>Ver Prontuario</TextBlue>
                    </DoubleView>
                </RowCardBox>
            );
        } else if (status === "canceladas") {
            return (
                <RowCardBox>
                    <StatusGray time={timeConsulta(time)} />
                </RowCardBox>
            );
        } else {
            return null;
        }
    }


    return (
        <CardBox Consulta={Consulta} role={role} status={status} onPress={() => {
            if (role == "Paciente" && status == "realizadas") {
                navigation.replace("FormDoctor" ,
                {
                    consultaDescricao: Consulta.consultaDescricao,
                    // consultaDiagnostico: consulta.consultaDiagnostico,
                    consultaReceita: Consulta.consultaReceita,
                    consultaId: Consulta.consultaId
                });
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
                    <TextAbout > {role == "Medico" ? `CRM ${medicoCrm} ` : `${formatarIdade(Age)} Anos`}  <TextAbout>{Priority == "0" ? "Rotina"
                        : Priority == "1" ? "Exame" : "Urgência"} </TextAbout> </TextAbout>
                </TextCardBox>
                {Check()}
            </Container>
        </CardBox>
    );
};


export default Card;
