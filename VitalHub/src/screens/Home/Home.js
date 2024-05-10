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
import { ActivityIndicator, Text } from "react-native";

export const Home = ({ navigation }) => {

    const image = require("../../assets/PhotoProfile.png");

    const [selected, setSelected] = useState("agendadas");
    const [responseConsulta, setResponseConsulta] = useState([])
    const [dataConsulta, setDataConsulta] = useState('')
    const [token, setToken] = useState([]);
    const [isMedic, setIsMedic] = useState(token.role == 'Medico')
    const [consultaSelecionada, setConsultaSelecionada] = useState(null)
    const [fotoPerfil, setFotoPerfil] = useState(null)
    const [fotoCard, setFotoCard] = useState(null)
    const [isLoading, setIsLoading] = useState()
    const [responseLength, setResponseLength] = useState()

    async function profileLoad() {
        const tokenDecoded = await userDecodeToken();

        if (tokenDecoded) {
            setToken(tokenDecoded)
            setDataConsulta(moment().format('YYYY-MM-DD'))

        }

        const user = tokenDecoded.role == "Medico" ? "Medicos" : "Pacientes"
        await api.get(`/${user}/BuscarPorId?id=${tokenDecoded.jti}`).then(response => {
            setFotoPerfil(response.data.idNavigation.foto)

        }).catch(erro => {
            console.log(erro);
        })

        const photoCard = tokenDecoded.role == "Medico" ? "Pacientes" : "Medicos"
        await api.get(`/${user}/BuscarPorId?id=${tokenDecoded.jti}`).then(response => {
            setFotoCard(response.data.idNavigation.foto)
        }).catch(erro => {
            console.log(erro);
        })


    }

    async function getConsultas() {
        setIsLoading(true)
        try {
            const url = (token.role == 'Medico' ? 'Medicos' : 'Pacientes')
            await api.get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${token.jti}`)
                .then(response => {

                    const novaConsulta = response.data.map(item => ({
                        consultaId: item.id,
                        medicoNome: item.medicoClinica.medico.idNavigation.nome,
                        medicoCrm: item.medicoClinica.medico.crm,
                        medicoFoto: item.medicoClinica.medico.idNavigation.foto,
                        consultaSituacao: item.situacao.situacao,
                        clinicaId: item.medicoClinica.clinicaId,
                        especialidade: item.medicoClinica.medico.especialidade.especialidade1,
                        pacienteNome: item.paciente.idNavigation.nome,
                        pacienteIdade: item.paciente.dataNascimento,
                        pacienteEmail: item.paciente.idNavigation.email,
                        pacienteFoto: item.paciente.idNavigation.foto,
                        consultaPrioridade: item.prioridade.prioridade,
                        consultaData: item.dataConsulta,
                        consultaDescricao: item.descricao,
                        consultaDiagnostico: item.diagnostico,
                        consultaReceita: item.receita.medicamento
                    }));



                    setResponseConsulta(novaConsulta)
                    setIsLoading(false)
                    setResponseLength(false)

                }).catch(error => {
                    console.log(error)
                    setIsLoading(false)
                    setResponseLength(true)
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
        setConsultaSelecionada(consulta)

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
            <Header navigation={navigation} foto={{ uri: fotoPerfil }} />
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

                {
                    responseConsulta.length === 0 && token.role === 'Paciente' && responseLength == false ? (

                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Você não tem nenhum paciente para atender.</Text>

                    ) : isLoading && token.role === 'Paciente' ?
                        <ActivityIndicator style={{marginTop: 18}}/> : null
                }

                {

                    responseConsulta.length === 0 && token.role === 'Medico' && responseLength == false ? (

                        <Text style={{ textAlign: 'center', marginTop: 20 }}>Você não tem nenhum paciente para atender.</Text>

                    ) : isLoading && token.role === 'Medico' ?
                        <ActivityIndicator style={{marginTop: 18}} /> : null
                }




                <FlatContainer
                    data={responseConsulta}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.consultaId}
                    renderItem={({ item }) =>
                    (
                        item.consultaSituacao == selected && token.role == "Paciente" ? (
                            <>
                                <Card
                                    role={'Medico'}
                                    time={item.consultaData}
                                    email={item.pacienteEmail}
                                    image={{ uri: item.medicoFoto }}
                                    status={item.consultaSituacao}
                                    Name={item.medicoNome}
                                    Age={item.pacienteIdade}
                                    medicoCrm={item.medicoCrm}
                                    clinicaId={item.clinicaId}
                                    Priority={item.consultaPrioridade}
                                    specialty={item.especialidade}
                                    navigation={navigation}
                                    onPressCard={() => openModal()}
                                    onPressShow={() => showForm(item)}
                                />
                            </>

                        ) : item.consultaSituacao == selected && token.role == "Medico" ?
                            (
                                <Card
                                    role={"Paciente"}
                                    time={item.consultaData}
                                    email={item.pacienteEmail}
                                    image={{ uri: item.pacienteFoto }}
                                    status={item.consultaSituacao}
                                    Name={item.pacienteNome}
                                    Age={item.pacienteIdade}
                                    medicoCrm={item.medicoCrm}
                                    clinicaId={item.clinicaId}
                                    Priority={item.consultaPrioridade}
                                    specialty={item.especialidade}
                                    navigation={navigation}
                                    onPressCard={() => openModal()}
                                    onPressShow={() => showForm(item)}
                                />
                            ) : null

                    )}
                />


                {
                    token.role == "Paciente" ? (< StethoscopeView onPress={() => showSchedule()}>
                        <FontAwesome
                            name="stethoscope"
                            size={32}
                            color={"white"}
                        />
                    </StethoscopeView>
                    ) : null
                }


            </Container >

            <CancelAppointment
                isOpen={isModalOpen}
                onClose={closeModal}
                navigation={navigation}
                consulta={consultaSelecionada}
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
                foto={{ uri: fotoPerfil }}
            />


        </>
    )
}



