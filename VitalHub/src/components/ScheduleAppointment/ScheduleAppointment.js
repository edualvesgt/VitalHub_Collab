import { Label, Title } from "../Title/StyleTitle";
import { ModalContainer, ModalContent } from "./StyleScheduleAppointment";
import { LinkCancel } from "../Links/StyleLink";
import { BlueTitle, Button, ButtonModal, ButtonTitle, SmallButton } from "../Button/Button";
import { RowContainerButton } from "../Container/StyleContainer";
import { BoxInputCreate, } from "../BoxInput/BoxInput";
import { useState } from "react";





const ScheduleAppointment = ({ isOpen, onClose, navigation,type }) => {

    // Nivel 0
    const Rotina = { id: "D25CAB1E-AC65-4B89-B2E8-31BA08106774", tipo: "Rotina" }
    // Nivel 1
    const Exame = { id: "E3561EE1-AEED-41FB-8E4B-11C80BA495C8", tipo: "Exame" }
    // Nivel 2
    const Urgencia = { id: "221794B0-ABA1-43EB-9C79-B8F68A3DF97B", tipo: "Urgencia" }

    const [click, setClick] = useState("rotina")
    const [clickButton, setClickButton] = useState(click == type)
    const [agendamento, setAgendamento] = useState()

    if (!isOpen) {
        return null;
    }

    const handleConfirm = () => {
        navigation.replace("ChooseClinic", { agendamento: agendamento });
        onClose();
    };




    return (
        <ModalContainer>
            <ModalContent>
          
                <Label>Qual o nível da consulta</Label>

                <RowContainerButton>

                    <SmallButton onPress={() => {setAgendamento({ ...agendamento, prioridadeId: Rotina.id, tipo: Rotina.tipo }); setClick("rotina")} } clickButton={click == "rotina"}>
                        <BlueTitle clickButton={click == "rotina"}>Rotina</BlueTitle>
                    </SmallButton>

                    <SmallButton onPress={() => {setAgendamento({ ...agendamento, prioridadeId: Exame.id, tipo: Exame.tipo }); setClick("exame")}} clickButton={click == "exame"}  >
                        <BlueTitle clickButton={click == "exame"}>Exames</BlueTitle>
                    </SmallButton>

                    <SmallButton onPress={() => {setAgendamento({ ...agendamento, prioridadeId: Urgencia.id, tipo: Urgencia.tipo }); setClick("urgencia")}} clickButton={click == "urgencia"}  >
                        <BlueTitle clickButton={click == "urgencia"}>Urgencia</BlueTitle>
                    </SmallButton>
                </RowContainerButton>

                <BoxInputCreate
                    textLabel={"Informe a Localizacao Desejada"}
                    placeholder={"Informe a Sua Cidade"}
                    editable = {true}
                    value={agendamento ? agendamento.localizacao : null}

                    onChangeText={(txt) => setAgendamento({
                        ...agendamento,
                        localizacao: txt
                    })}

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


