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

    //dates
    const currentDate = new Date();
    const currentDateFormat = String(currentDate.getDate()).padStart(2, '0')
    const currentDateTime = currentDate.toISOString();
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1;

    async function getConsultas() {

        const tokenDecoded = await userDecodeToken();
        setToken(tokenDecoded)

        const url = (tokenDecoded.role == 'Medico' ? 'Medicos' : 'Pacientes')

        await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${tokenDecoded.jti}`)
            .then(response => {
                setConsultas(response.data)

                console.log(consultas);


            }).catch(error => {
                console.log(" Deu erro");
            })

        setPacienteInfo(consultas[0].paciente)

        const monthUser = pacienteInfo.dataNascimento.slice(5, 7)
        const dateUser = pacienteInfo.dataNascimento.slice(8, 10)

        console.log(dateUser);

        console.log(currentDateFormat);
        const age = pacienteInfo.dataNascimento.slice(0, 4)

        const idade = (currentYear - age) - 1

        if (currentMonth >= monthUser) {
            if (currentDateFormat >= dateUser) {
                const novaIdade = idade + 1
                return setIdade(novaIdade)
            }
            else { setIdade(idade) }
        }
    }


    useEffect(() => {

        if (dataConsulta != '') {

            getConsultas();
        }

    }, [dataConsulta])

    // Define os dados dos itens que serão exibidos
    // Cada item representa uma consulta com um ID, tempo, imagem e status

    // const dataItens = [
    //     {
    //         id: 'fsdfsfsdf',
    //         time: '22:00',
    //         image: image,
    //         status: "r" // 'r' representa 'realizada'
    //     },
    //     {
    //         id: 'sdfsdf',
    //         time: '23:00',
    //         image: image,
    //         status: "a" // 'a' representa 'agendada'
    //     },
    //     {
    //         id: 'asdas',
    //         time: '16:00',
    //         image: image,
    //         status: "c" // 'c' representa 'cancelada'
    //     }
    // ]

    // Função para verificar se um item deve ser exibido com base no filtro ativo
    const Check = (data) => {
        if (data.status === "a" && selected.agendadas == true) {
            return true;
        }
        if (data.status === "r" && selected.realizadas == true) {
            return true;
        }
        if (data.status === "c" && selected.canceladas == true) {
            return true;
        }
        return false;
    }

    // Filtra os itens com base no filtro ativo
    // const data = dataItens.filter(Check);


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
                    <ButtonFilter onPress={() => { setSelected({ agendadas: true }) }} selected={selected.agendadas} buttonTitle={'Agendadas'} />
                    {/* Renderiza o componente ButtonFilter para as consultas realizadas */}
                    <ButtonFilter onPress={() => { setSelected({ realizadas: true }) }} selected={selected.realizadas} buttonTitle={'Realizadas'} />
                    {/* Renderiza o componente ButtonFilter para as consultas canceladas */}
                    <ButtonFilter onPress={() => { setSelected({ canceladas: true }) }} selected={selected.canceladas} buttonTitle={'Canceladas'} />
                </RowContainer>

                {/* Renderiza o componente FlatContainer que irá renderizar os itens da lista */}
                <FlatContainer
                    data={consultas}
                    renderItem={({ item }) =>
                        <Card situation={item.situacao} time={item.time} image={item.image} Age={idade} Name={token.name}
                            status={consultas[0].situacaoId.toUpperCase() == "3696C8B9-2ACE-4E17-BB62-0EFD3A0D88A1" ? "agendadas"
                                : consultas[0].situacaoId.toUpperCase() == "32B379B4-450E-4208-BE2A-262870446238" ? "realizadas"
                                : "canceladas"} navigation={navigation}
                            Priority={consultas[0].prioridadeId.toUpperCase() == "41F7AF1C-FA6A-4E19-BB20-5F654F4284E6"
                                ? "Rotina"
                                : consultas[0].prioridadeId.toUpperCase() == "97E7F23F-2DB5-4590-978E-32C0D5729EDD" ? "Exame"
                                    : "Urgência"} onPressCard={() => openModal()} onPressShow={() => showForm()} />}
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
            <ScheduleAppointment isOpen={isModalSchedule} onClose={closeSchedule} navigation={navigation} />
            <ShowFormDoctor isOpen={isShow} onClose={closeForm} navigation={navigation} situacion={selected} titleName={"Nome da Pessoa"} about={"Informacoes"} />
        </>
    )
}
