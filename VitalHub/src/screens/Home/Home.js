import { useEffect, useState } from "react";

import { FontAwesome } from '@expo/vector-icons'

import { ButtonFilter } from "../../components/ButtonFilter/ButtonFilter";

import Calendar from "../../components/Calendar/Calendar";

import moment from "moment";

import { Container, FlatContainer, RowContainer } from "../../components/Container/StyleContainer";

import { Header } from "../../components/Header/Header";

import { StethoscopeView } from "./StyleHome"
// Importa o componente Card que será usado para exibir os detalhes de cada consulta
import Card from "../../components/Card/Card";
import CancelAppointment from "../../components/CancelAppointment/CancelAppointment";
import ShowFormDoctor from "../../components/ShowFormDoctor/ShowFormDoctor";
import ScheduleAppointment from "../../components/ScheduleAppointment/ScheduleAppointment";
import api from "../../services/services";
import { userDecodeToken } from "../../utils/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import ScheduleAppointment from "../../components/ScheduleAppointment/ScheduleAppointment";

export const Home = ({ navigation }) => {

    const image = require("../../assets/PhotoProfile.png");

    // Define o estado inicial dos botões selecionadoss
    // Este estado será usado para controlar qual filtro está ativo
    const [selected, setSelected] = useState({
        agendadas: true,
        realizadas: false,
        canceladas: false,
    });

    const [consultas, setConsultas] = useState([])
    const [pacienteInfo, setPacienteInfo] = useState([])
    const [dataConsulta, setDataConsulta] = useState('')
    const [idade, setIdade] = useState("")
    const [token, setToken] = useState([])

    async function getConsultas() {
        const tokenDecoded = await userDecodeToken();
        setToken(tokenDecoded)

        //const url = (tokenDecoded.role == 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${tokenDecoded.jti}`)
            .then(response => {
                setConsultas(response.data)
                console.log(response.data);

            }).catch(error => {
                console.log(" Deu erro" + error);
            })
    }

    useEffect(() => {

        if (dataConsulta != '') {

            getConsultas();
        }

    }, [dataConsulta])

    // Função para verificar se um item deve ser exibido com base no filtro ativo
    const Check = (data) => {
        if (data.status === "agendadas" && selected.agendadas == true) {
            return true;
        }
        if (data.status === "realizadas" && selected.realizadas == true) {
            return true;
        }
        if (data.status === "canceladas" && selected.canceladas == true) {
            return true;
        }
        return false;
    }

    // Filtra os itens com base no filtro ativo
    const data = consultas.filter(Check);


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };;

    const [isShow, setIsShow] = useState(false);

    const showForm = () => {
        setIsShow(true)

    }
    const closeForm = () => {
        setIsShow(false)
    }
    const [isModalSchedule, setModalSchedule] = useState(false);

    const showSchedule = () => {
        setModalSchedule(true)
    }

    const closeSchedule = () => {
        setModalSchedule(false)
    }

    // Renderiza o componente Header, Container, Calendar, RowContainer, ScrollForm e FlatContainer
    // O componente ButtonFilter é usado para controlar os filtros
    // O componente Card é usado para exibir os detalhes de cada consulta
    return (
        <>
            <Header navigation={navigation} />
            <Container>
                <Calendar setDataConsulta={setDataConsulta} />
                <RowContainer>
                    {/* Renderiza o componente ButtonFilter para as consultas agendadas */}
                    <ButtonFilter onPress={() => { setSelected({ agendadas : true}) }} selected={selected.agendadas} buttonTitle={'Agendadas'} />
                    {/* Renderiza o componente ButtonFilter para as consultas realizadas */}
                    <ButtonFilter onPress={() => { setSelected({ realizadas: true }) }} selected={selected.realizadas} buttonTitle={'Realizadas'} />
                    {/* Renderiza o componente ButtonFilter para as consultas canceladas */}
                    <ButtonFilter onPress={() => { setSelected({ canceladas: true }) }} selected={selected.canceladas} buttonTitle={'Canceladas'} />
                </RowContainer>

                {/* Renderiza o componente FlatContainer que irá renderizar os itens da lista */}
                <FlatContainer
                    data={consultas}
                    renderItem={({ item }) =>
                        item.situacao.situacao == selected && (
                            <ButtonFilter  buttonTitle={'Agendadas'} />

                            // <Card situation={item.situacao} time={item.time} image={item.image} Name={consultas[0].medicoClinica.medico.idNavigation.nome} Age={consultas[0].medicoClinica.medico.crm}
                            //     status={consultas[0].situacaoId.toUpperCase() == "3696C8B9-2ACE-4E17-BB62-0EFD3A0D88A1" ? "agendadas"
                            //         : consultas[0].situacaoId.toUpperCase() == "32B379B4-450E-4208-BE2A-262870446238" ? "realizadas"
                            //             : "canceladas"} navigation={navigation}
                            //     Priority={consultas[0].prioridadeId.toUpperCase() == "41F7AF1C-FA6A-4E19-BB20-5F654F4284E6"
                            //         ? "Rotina"
                            //         : consultas[0].prioridadeId.toUpperCase() == "97E7F23F-2DB5-4590-978E-32C0D5729EDD" ? "Exame"
                            //             : "Urgência"} onPressCard={() => openModal()} onPressShow={() => showForm()} />
                        )}
                    keyExtractor={item => item.id} />

                <StethoscopeView onPress={() => showSchedule()}>
                    <FontAwesome
                        name="stethoscope"
                        size={32}
                        color={"white"}
                    />
                </StethoscopeView>

                {/* {profile === "Paciente" && (
                    )} */}

            </Container>

            <CancelAppointment isOpen={isModalOpen} onClose={closeModal} navigation={navigation} />
            <ScheduleAppointment isOpen={isModalSchedule} onClose={closeSchedule} navigation={navigation} roleUsuario={token.role} />
            <ShowFormDoctor isOpen={isShow} onClose={closeForm} navigation={navigation} situacion={selected} titleName={"Nome da Pessoa"} about={"Informacoes"} />
        </>
    )
}
