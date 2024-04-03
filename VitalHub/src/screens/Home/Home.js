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

export const Home = ({ navigation }) => {

    const image = require("../../assets/PhotoProfile.png");

    const [selected, setSelected] = useState("pendentes");
    const [responseConsulta, setResponseConsulta] = useState([])
    const [consultas, setConsultas] = useState([])
    const [dataConsulta, setDataConsulta] = useState('')
    const [token, setToken] = useState([])

    
    

    async function getConsultas() {
        console.log(dataConsulta);
        try {
            const tokenDecoded = await userDecodeToken();
            setToken(tokenDecoded)

            //const url = (tokenDecoded.role == 'Medico' ? 'Medicos' : 'Pacientes')

            const res = await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${tokenDecoded.jti}`)
            setResponseConsulta(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }

        const novaConsulta = responseConsulta.map(item => ({
            medicoNome: item.medicoClinica.medico.idNavigation.nome,
            medicoCrm: item.medicoClinica.medico.crm,
            consultaSituacao: item.situacao.situacao,
            id: item.id
        }))

        setConsultas(novaConsulta)
        console.log(consultas);
       
    }

    useEffect(() => {

        if (dataConsulta != '') {
            console.log("Ja chamei");
            getConsultas();
        }

    }, [dataConsulta])

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

    return (
        <>
            <Header navigation={navigation} />
            <Container>

                <Calendar setDataConsulta={setDataConsulta} />

                <RowContainer>
                    <ButtonFilter clickButton={selected == "pendentes"} selected={selected} onPress={() => setSelected("pendentes")} buttonTitle={'Agendadas'} />

                    <ButtonFilter clickButton={selected == "realizadas"} selected={selected} onPress={() => setSelected("realizadas")} buttonTitle={'Realizadas'} />

                    <ButtonFilter clickButton={selected == "canceladas"} selected={selected} onPress={() => setSelected("canceladas")} buttonTitle={'Canceladas'} />
                </RowContainer>

                <FlatContainer
                    data={consultas}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    (
                        item.consultaSituacao == "Pendentes" ? (

                            <Card
                                situation={item.situacao}
                                time={item.time}
                                image={item.image}
                                status={item.consultaSituacao}
                                Name={item.medicoNome}
                                Age={item.medicoCrm}
                                navigation={navigation}
                                onPressCard={() => openModal()} onPressShow={() => showForm()} />
                        ) : null


                    )}
                />

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
