
import { ModalContainer, ModalContent } from "./StyleConfirm";
import { Title } from "../Title/StyleTitle";
import { LabelTextAppointment, TextAppointment, TextForgot } from "../Text/Text";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";
import { TextCardBox } from "../Card/StyleCard";
import { useEffect, useState } from "react";
import api from "../../services/services";
import { userDecodeToken } from "../../utils/Auth";



const ConfirmAppontment = ({ isOpen, onClose, navigation, route }) => {

    if (!isOpen) {
        return null;
    }


    const [profile, setProfile] = useState()

    async function ProfileLoad() {
        const token = await userDecodeToken()
        console.log('token');
        console.log(token);
        if (token) {
            setProfile(token.jti);
        }
    }


    useEffect(() => {
        ProfileLoad()
    }, [])


    async function AppointmentPost() {
        await api.post("/Consultas/Cadastrar", {
            ...route,
            pacienteId: profile,
            situacaoId: '813735A9-CDC7-497F-B601-0BFDEEABE3C6'
        }).then(async response => {
            console.log(response);
            await navigation.replace("Main")
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <ModalContainer>
            <ModalContent>
                <Title>Agendar Consulta</Title>

                <TextForgot>Consulte os dados selecionados para a sua consulta</TextForgot>
                <TextCardBox>
                    <LabelTextAppointment>Data da Consulta</LabelTextAppointment>
                    <TextAppointment>{route.dataConsulta}</TextAppointment>

                    <LabelTextAppointment>Medico(a) da Consulta</LabelTextAppointment>
                    <TextAppointment>{route.medicoLabel}</TextAppointment>
                    {/* <TextAppointment>Pediatra</TextAppointment> */}
                    
                    <LabelTextAppointment>Local da Consulta</LabelTextAppointment>
                    <TextAppointment>{route.localizacao}</TextAppointment>

                    <LabelTextAppointment>Tipo de Consulta</LabelTextAppointment>
                    <TextAppointment>{route.tipo}</TextAppointment>

                </TextCardBox>


                <Button onPress={() => AppointmentPost()} >
                    <ButtonTitle>Confirmar</ButtonTitle>
                </Button>
                <LinkCancel onPress={() => navigation.navigate("Main")} >Cancelar</LinkCancel>
            </ModalContent>
        </ModalContainer>
    );

};

export default ConfirmAppontment;



