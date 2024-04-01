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

    const currentDate = new Date();

    // Convertendo a data para o formato ISO 8601
    const currentDateTime = currentDate.toISOString();

    const currentYear = currentDate.getFullYear()

    async function getConsultas() {
        const tokenDecoded = await userDecodeToken();


        await api.get(`/Pacientes/BuscarPorData?data=${currentDateTime}&id=${tokenDecoded.jti}`)
            .then(response => {
                setConsultas(response.data)

                setPacienteInfo(consultas[0].paciente)
                console.log(pacienteInfo.dataNascimento);
                const age = pacienteInfo.dataNascimento.slice(0, 4)
                console.log(age);

                const ageAtual = currentYear - age

                console.log(ageAtual);
                
            }).catch(error => {
                console.log(error);
            })


        
        
    }


    useEffect(() => {
        getConsultas();
    }, [])

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
                <Calendar />
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
                        <Card situation={item.situacao} time={item.time} image={item.image} status={item.status} navigation={navigation}
                            onPressCard={() => openModal()} onPressShow={() => showForm()} />}
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
