import { useEffect, useState } from "react";
import { ContainerClinic, ContainerLabel } from "../../components/Container/StyleContainer"
import { Label, Title } from "../../components/Title/StyleTitle"
import ChooseCalendar from "../../components/ChooseCalendar/ChooseCalendar";
import { InputSelect } from "../../components/Input/Input";
import { Button, ButtonTitle } from "../../components/Button/Button";
import { LinkCancel } from "../../components/Links/StyleLink";
import ConfirmAppontment from "../../components/ConfirmAppointment/ConfirmAppointment";
import { Text } from "react-native";
import moment from "moment"

export const ChooseData = ({ navigation, route }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };;

    function handleConfirm() {
        // Obtém a data atual
        const today = moment();

        // Verifica se a data selecionada é futura ou igual ao dia de hoje
        if (!moment(dataSelecionada).isAfter(today, 'day') || moment(dataSelecionada).isSame(today, 'day')) {
            setValidationDataAfter(true);
            return; // Interrompe a execução da função
        }

        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${dataSelecionada} ${horaSelecionada}`
        })
        openModal()
    }


    const [dataSelecionada, setDataSelecionada] = useState()
    const [horaSelecionada, setHoraSelecionada] = useState()
    const [agendamento, setAgendamento] = useState()
    const [validationData, setValidationData] = useState(false)
    const [validationDataAfter, setValidationDataAfter] = useState()

    useEffect(() => {
        console.log("route");
        console.log(route.params);

    }, [route])

    useEffect(() => {
        console.log("data selecionada");
        console.log(horaSelecionada);

    }, [horaSelecionada])

    useEffect(() => {
        // Verifica se a data selecionada é futura
        if (!moment(dataSelecionada).isAfter(moment(), 'day')) {
            setValidationDataAfter(true);
        } else {
            setValidationDataAfter(false); // Limpa a flag caso a data seja válida
        }
    }, [dataSelecionada]); // Dependência do useEffect

    useEffect(() => {
        return () => {
            setValidationDataAfter(false); // Limpa a flag quando o componente é desmontado
        };
    }, []);


    return (
        <ContainerClinic>

            <Title> Selecionar Data </Title>
            <ChooseCalendar
                setDataSelecionada={setDataSelecionada}
                dataSelecionada={dataSelecionada}
            />

            {
                validationDataAfter ?
                    <Text style={{ color: "red" }}>Não é possivel agendar consultas em uma data passada, Somente datas Futuras!</Text>
                    : null
            }
            <ContainerLabel>
                <Label>Selecione um horário disponível</Label>
            </ContainerLabel>

            <InputSelect
                setHoraSelecionada={setHoraSelecionada}
            />
            {
                !dataSelecionada || !horaSelecionada ?
                    <Text style={{ color: "red" }}>É necessário selecionar data e horário!</Text>
                    : null
            }



            <Button onPress={() => { dataSelecionada && horaSelecionada ? handleConfirm() : setValidationData(true) }}>
                <ButtonTitle>Confirmar</ButtonTitle>
            </Button>
            <LinkCancel onPress={() => navigation.navigate("Main")}>Cancelar</LinkCancel>

            <ConfirmAppontment isOpen={isModalOpen} onClose={closeModal} navigation={navigation} route={agendamento} />

        </ContainerClinic>

    )
}