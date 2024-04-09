import { useEffect, useState } from "react";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";
import { TextAbout } from "../Text/Text";
import { Title } from "../Title/StyleTitle";
import { PhotoShow, ShowModalContainer, ShowModalContent } from "./StyleShowFormDoctor";

const ShowFormDoctor = ({
    isOpen,
    onClose,
    navigation,
    status,
    role,
    consulta,}) => {

    const image = require("../../assets/PhotoGirl.png");

    if (!isOpen) {
        return null;
    }

    useEffect(() => {
        console.log(consulta)
    }, [isOpen])

    const [profile, setProfile] = useState("Medico");

    return (
        <ShowModalContainer>
            <ShowModalContent>
                <PhotoShow source={image} />
                <Title>Dr. {consulta.medicoNome}</Title>
                <TextAbout>CRM {consulta.medicoCrm} <TextAbout> {consulta.especialidade}</TextAbout> </TextAbout>

                {status == "agendadas" ? (
                    <Button onPress={() => navigation.replace('LocalClinic', {clinica: consulta.clinicaId})}>
                        <ButtonTitle>Ver Local Consulta</ButtonTitle>
                    </Button>
                ) : (
                    <Button onPress={() => navigation.replace('FormDoctor')}>
                        <ButtonTitle>{role == "Medico" ? "Inserir Prontuário" : "Ver Prontuário"}</ButtonTitle>
                    </Button>
                )}

                <LinkCancel onPress={onClose} >Cancelar</LinkCancel>
            </ShowModalContent>
        </ShowModalContainer>
    );
};

export default ShowFormDoctor;
