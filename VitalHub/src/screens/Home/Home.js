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

    const [selected, setSelected] = useState("agendadas");
    const [responseConsulta, setResponseConsulta] = useState([])
    const [consultas, setConsultas] = useState(null)
    const [dataConsulta, setDataConsulta] = useState('')
    const [token, setToken] = useState([]);
    const [isMedic, setIsMedic] = useState(true)
    const [consultaSelecionada, setConsultaSelecionada] = useState(null)

    async function profileLoad() {
        const tokenDecoded = await userDecodeToken();

        if (tokenDecoded) {
            setToken(tokenDecoded)

            console.log(tokenDecoded);

            // setIsMedic(tokenDecoded === "Medico" )

            setDataConsulta(moment().format('YYYY-MM-DD'))
        }
    }

    async function getConsultas() {
        console.log(dataConsulta);

        try {
            //const url = (tokenDecoded.role == 'Medico' ? 'Medicos' : 'Pacientes')
            await api.get(`/Pacientes/BuscarPorData?data=${dataConsulta}&id=${token.jti}`)
                .then(response => {
                    const novaConsulta = response.data.map(item => ({
                        medicoNome: item.medicoClinica.medico.idNavigation.nome,
                        medicoCrm: item.medicoClinica.medico.crm,
                        consultaSituacao: item.situacao.situacao,
                        clinicaId: item.medicoClinica.clinicaId,
                        id: item.id,
                        especialidade: item.medicoClinica.medico.especialidade.especialidade1
                        
                    }))
                    setResponseConsulta(novaConsulta)
                    // console.log(response.data);
                    
                }).catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        if (dataConsulta != '') {
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
    const [cancel, setCancel] = useState(false);

    const showForm = (consulta) => {
        setConsultaSelecionada( consulta )

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
                    <ButtonFilter
                        clickButton={selected == "agendadas"}
                        selected={selected}
                        onPress={() => setSelected("agendadas")}
                        buttonTitle={'Agendadas'}
                    />

                    <ButtonFilter
                        clickButton={selected == "realizadas"}
                        selected={selected}
                        onPress={() => setSelected("realizadas")}
                        buttonTitle={'Realizadas'}
                    />

                    <ButtonFilter
                        clickButton={selected == "canceladas"}
                        selected={selected}
                        onPress={() => setSelected("canceladas")}
                        buttonTitle={'Canceladas'}
                    />
                </RowContainer>

                <FlatContainer
                    data={responseConsulta}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) =>
                    (
                        item.consultaSituacao == selected ? (
                            <Card
                                role={isMedic}
                                time={item.time}
                                image={image}
                                status={item.consultaSituacao}
                                Name={item.medicoNome}
                                Age={item.medicoCrm}
                                clinicaId={item.clinicaId}
                                specialty={item.especialidade}
                                navigation={navigation}
                                onPressCard={() => openModal()}
                                onPressShow={() => showForm( item )}
                            />
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

            <CancelAppointment
                isOpen={isModalOpen}
                onClose={closeModal}
                navigation={navigation}
            />

            <ScheduleAppointment
                isOpen={isModalSchedule}
                onClose={closeSchedule}
                navigation={navigation}
                roleUsuario={token.role}
            />

            < ShowFormDoctor
                nome={null}
                consulta={consultaSelecionada}
                jsonInfo={responseConsulta}
                isOpen={isShow}
                role={token.role}
                onClose={closeForm}
                navigation={navigation}
                status={selected}
            />


        </>
    )
}



