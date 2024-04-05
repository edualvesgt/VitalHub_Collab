import { useEffect, useState } from "react";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";
import { TextAbout } from "../Text/Text";
import { Title } from "../Title/StyleTitle";
import { PhotoShow, ShowModalContainer, ShowModalContent } from "./StyleShowFormDoctor";
import { Alert } from "react-native";

const ShowFormDoctor = ({
    isOpen,
    onClose,
    navigation,
    status,
    role,
    consulta,
    nome,
    info,
    jsonInfo }) => {

    const image = require("../../assets/PhotoGirl.png");

    if (!isOpen) {
        return null;
    }

    useEffect(() => {
        console.log(consulta)
    }, [isOpen])

    const [profile, setProfile] = useState("Medico");
    const infoConsult = jsonInfo
    return (
        <ShowModalContainer>
            <ShowModalContent>
                <PhotoShow source={image} />
                <Title>Dr. {consulta.medicoNome}</Title>
                <TextAbout>CRM {consulta.medicoCrm} <TextAbout> {consulta.especialidade}</TextAbout> </TextAbout>

                {status == "agendadas" ? (
                    <Button onPress={() => navigation.replace('LocalClinic',)}>
                        <ButtonTitle>Ver Local Consulta</ButtonTitle>
                    </Button>
                ) : (
                    <Button onPress={() => Alert.alert('Prontuário', 'Estou a inserir um prontuário')}>
                        <ButtonTitle>Inserir Prontuario</ButtonTitle>
                    </Button>
                )}

                <LinkCancel onPress={onClose} >Cancelar</LinkCancel>
            </ShowModalContent>
        </ShowModalContainer>
    );
};

export default ShowFormDoctor;
