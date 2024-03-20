import { Label, Title } from "../Title/StyleTitle";
import { ModalContainer, ModalContent } from "./StyleScheduleAppointment";
import { LinkCancel } from "../Links/StyleLink";
import { BlueTitle, Button, ButtonModal, ButtonTitle, SmallButton } from "../Button/Button";
import { RowContainerButton } from "../Container/StyleContainer";
import { BoxInputCreate, } from "../BoxInput/BoxInput";


const ScheduleAppointment = ({ isOpen, onClose, navigation }) => {

    if (!isOpen) {
        return null;
    }

const handleConfirm = () => {
    navigation.navigate("ChooseClinic");
    onClose();
};

<ButtonModal onPress={handleConfirm}>
    <ButtonTitle>Confirmar</ButtonTitle>
</ButtonModal>

return (
    <ModalContainer>
        <ModalContent>
            {/* Titulo agendar  */}
            <Title>Agendar Consulta</Title>

            {/* Input Com select */}

            <Label>Qual o nível da consulta</Label>
            <RowContainerButton>
                <SmallButton><BlueTitle>Rotina</BlueTitle></SmallButton>
                <SmallButton><BlueTitle>Exames</BlueTitle></SmallButton>
                <SmallButton><BlueTitle>Urgencia</BlueTitle></SmallButton>
            </RowContainerButton>

            <BoxInputCreate
                textLabel={"Informe a Localizacao Desejada"}
                placeholder={"Informe a localizacao"}
            />

            {/* botao  */}
            <ButtonModal onPress={handleConfirm} >
                <ButtonTitle>Confirmar</ButtonTitle>
            </ButtonModal>
            <LinkCancel onPress={onClose} >Cancelar</LinkCancel>

        </ModalContent>
    </ModalContainer>
);

};

export default ScheduleAppointment;


