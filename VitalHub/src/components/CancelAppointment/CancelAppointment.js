import { Text } from "react-native";
import { Container } from "../Container/StyleContainer";
import {ModalContainer, ModalContent } from "./StyleCancelAppointment";
import { Title } from "../Title/StyleTitle";
import { TextAccount, TextForgot } from "../Text/Text";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";


const CancelAppointment = ({ isOpen, onClose, navigation }) => {

    if (!isOpen) {
        return null;
    }

    
    

    return (
        <ModalContainer>
            <ModalContent>
                <Title>Cancelar Consulta</Title>

                <TextForgot>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</TextForgot>

                <Button onPress = {onClose} >
                    <ButtonTitle>Confirmar</ButtonTitle>
                </Button>
                <LinkCancel onPress = {onClose}>Cancelar</LinkCancel>
            </ModalContent>
        </ModalContainer>
    );

};

export default CancelAppointment;



