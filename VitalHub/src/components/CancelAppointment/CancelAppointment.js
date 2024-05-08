import { Text } from "react-native";
import { Container } from "../Container/StyleContainer";
import {ModalContainer, ModalContent } from "./StyleCancelAppointment";
import { Title } from "../Title/StyleTitle";
import { TextAccount, TextForgot } from "../Text/Text";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";
import api from "../../services/services";
import { useEffect } from "react";


const CancelAppointment = ({ isOpen, onClose, navigation, consulta }) => {

    if (!isOpen) {
        return null;
    }

    async function atualizarSituacao(){
        console.log("Cancelar" ,consulta.consultaId);
        await api.put(`/Consultas/Status?idConsulta=${consulta.consultaId}&status=canceladas`)
        .then(responde => {
            console.log("Atualizado");
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        console.log("Consulta");
    },[] )
    

    return (
        <ModalContainer>
            <ModalContent>
                <Title>Cancelar Consulta</Title>

                <TextForgot>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</TextForgot>

                <Button onPress = {() => {onClose; atualizarSituacao()}} >
                    <ButtonTitle>Confirmar</ButtonTitle>
                </Button>
                <LinkCancel onPress = {onClose}>Cancelar</LinkCancel>
            </ModalContent>
        </ModalContainer>
    );

};

export default CancelAppointment;



