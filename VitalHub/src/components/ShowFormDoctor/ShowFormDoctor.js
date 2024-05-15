import { useEffect, useState } from "react";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";
import { TextAbout } from "../Text/Text";
import { Title } from "../Title/StyleTitle";
import { PhotoShow, ShowModalContainer, ShowModalContent } from "./StyleShowFormDoctor";
import { formatarIdade } from "../Card/Card";


const ShowFormDoctor = ({
    isOpen,
    onClose,
    navigation,
    status,
    role,
    foto,
    consulta, }) => {

    if (!isOpen) {
        return null;
    }

    useEffect(() => {
        
    }, [isOpen])

    const [profile, setProfile] = useState("Medico");

    useEffect(() => {
        console.log(consulta.medicoFoto);
    }, [])

    return (
        role == "Medico" ? (
            <ShowModalContainer>
                <ShowModalContent>
                    <PhotoShow source={{uri : consulta.pacienteFoto}} />
                    <Title>{consulta.pacienteNome}</Title>
                    <TextAbout>{formatarIdade(consulta.pacienteIdade)} Anos<TextAbout> {consulta.pacienteEmail}</TextAbout> </TextAbout>

                    {status == "agendadas" ? (
                        <Button onPress={() => { navigation.replace('FormDoctor', { clinica: consulta.clinicaId }) }}>
                            <ButtonTitle>{"Inserir Prontuário"}</ButtonTitle>
                        </Button>
                    ) : (
                        <Button onPress={() => navigation.replace('FormDoctor',
                            {
                                consultaDescricao: consulta.consultaDescricao,
                                consultaDiagnostico: consulta.consultaDiagnostico,
                                consultaReceita: consulta.consultaReceita,
                                consultaId: consulta.consultaId,
                                pacienteIdade : consulta.pacienteIdade,
                                pacienteFoto : consulta.pacienteFoto,
                                nome: consulta.pacienteNome,
                                email : consulta.pacienteEmail
                            })}>
                            <ButtonTitle>Ver prontuario</ButtonTitle>
                        </Button>
                    )}

                    <LinkCancel onPress={onClose} >Cancelar</LinkCancel>
                </ShowModalContent>
            </ShowModalContainer>
        ) : (
            <ShowModalContainer>
                <ShowModalContent>
                    <PhotoShow source={{uri : consulta.medicoFoto}} />
                    <Title>Dr. {consulta.medicoNome}</Title>
                    <TextAbout>CRM {consulta.medicoCrm} <TextAbout> {consulta.especialidade}</TextAbout> </TextAbout>

                    {status == "agendadas" ? (
                        <Button onPress={() => { navigation.replace('LocalClinic', { clinica: consulta.clinicaId }) }}>
                            <ButtonTitle>Ver Local Consulta</ButtonTitle>
                        </Button>
                    ) : (
                        <Button onPress={() => navigation.replace('FormDoctor',
                            {
                                consultaDescricao: consulta.consultaDescricao,
                                consultaDiagnostico: consulta.consultaDiagnostico,
                                consultaReceita: consulta.consultaReceita,
                                consultaId: consulta.consultaId,
                                pacienteIdade : consulta.pacienteIdade,
                                pacienteFoto : consulta.pacienteFoto,
                                email: consulta.pacienteEmail

                            })}>
                            <ButtonTitle>Ver Prontuário</ButtonTitle>
                        </Button>
                    )}

                    <LinkCancel onPress={onClose} >Cancelar</LinkCancel>
                </ShowModalContent>
            </ShowModalContainer>
        )
    );
};

export default ShowFormDoctor;
