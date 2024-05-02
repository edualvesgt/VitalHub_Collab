import { useEffect, useState } from "react";
import { ContainerClinic, ContainerLabel } from "../../components/Container/StyleContainer"
import { Label, Title } from "../../components/Title/StyleTitle"
import ChooseCalendar from "../../components/ChooseCalendar/ChooseCalendar";
import { InputSelect } from "../../components/Input/Input";
import { Button, ButtonTitle } from "../../components/Button/Button";
import { LinkCancel } from "../../components/Links/StyleLink";
import ConfirmAppontment from "../../components/ConfirmAppointment/ConfirmAppointment";

export const ChooseData = ({ navigation, route }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };;

    function handleConfirm() {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${dataSelecionada} ${horaSelecionada}`
        })
        openModal()
    }

    const [dataSelecionada, setDataSelecionada] = useState()
    const [horaSelecionada, setHoraSelecionada] = useState()
    const [agendamento, setAgendamento] = useState()

    useEffect(() => {
        console.log("route");
        console.log(route.params);

    }, [route])

    useEffect(() => {
        console.log("data selecionada");
        console.log(horaSelecionada);

    }, [horaSelecionada])

    return (
        <ContainerClinic>

            <Title> Selecionar Data </Title>
            <ChooseCalendar
                setDataSelecionada={setDataSelecionada}
                dataSelecionada={dataSelecionada}
            />
            <ContainerLabel>
                <Label>Selecione um horário disponível</Label>
            </ContainerLabel>
            <InputSelect
                setHoraSelecionada={setHoraSelecionada}
            />
            <Button onPress={() => handleConfirm()}>
                <ButtonTitle>Confirmar</ButtonTitle>
            </Button>
            <LinkCancel onPress={() => navigation.navigate("Main")}>Cancelar</LinkCancel>

            <ConfirmAppontment isOpen={isModalOpen} onClose={closeModal} navigation={navigation} route={agendamento} />
        </ContainerClinic>

    )
}