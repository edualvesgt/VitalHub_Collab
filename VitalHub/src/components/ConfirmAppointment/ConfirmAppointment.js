
import { ModalContainer, ModalContent } from "./StyleConfirm";
import { Title } from "../Title/StyleTitle";
import { LabelTextAppointment, TextAppointment, TextForgot } from "../Text/Text";
import { Button, ButtonTitle } from "../Button/Button";
import { LinkCancel } from "../Links/StyleLink";
import { TextCardBox } from "../Card/StyleCard";


const ConfirmAppontment = ({ isOpen, onClose, navigation }) => {

    if (!isOpen) {
        return null;
    }




    return (
        <ModalContainer>
            <ModalContent>
                <Title>Agendar Consulta</Title>

                <TextForgot>Consulte os dados selecionados para a sua consulta</TextForgot>
                <TextCardBox>
                    <LabelTextAppointment>Data da Consulta</LabelTextAppointment>
                    <TextAppointment>1 de novembro 2023</TextAppointment>

                    <LabelTextAppointment>Medico(a) da Consulta</LabelTextAppointment>
                    <TextAppointment>Eduardo</TextAppointment>
                    <TextAppointment>Pediatra</TextAppointment>

                    <LabelTextAppointment>Local da Consulta</LabelTextAppointment>
                    <TextAppointment>Sao Paulo</TextAppointment>

                    <LabelTextAppointment>Tipo de Consulta</LabelTextAppointment>
                    <TextAppointment>Rotina</TextAppointment>

                </TextCardBox>


                <Button onPress = {() => navigation.navigate("Main")} >
                    <ButtonTitle>Confirmar</ButtonTitle>
                </Button>
                <LinkCancel onPress = {() => navigation.navigate("Main")} >Cancelar</LinkCancel>
            </ModalContent>
        </ModalContainer>
    );

};

export default ConfirmAppontment;



