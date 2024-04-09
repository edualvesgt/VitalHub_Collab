import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { BoxInputForm, BoxInputPhoto } from "../../components/BoxInput/BoxInput"
import { Button, ButtonSendPhoto, ButtonTitle } from "../../components/Button/Button"
import { Container, ContainerForm, HR, InputContainer, TransparentContainer, ViewRow } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { LinkCancel } from "../../components/Links/StyleLink"
import { TextAbout, TextAccount, TextRed } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ScrollForm } from "../Profile/StyleProfile"
import { MaterialIcons } from '@expo/vector-icons'
import Cam from '../../components/Cam/Cam';
import { userDecodeToken } from '../../utils/Auth';
import api from '../../services/services';

export const FormDoctor = ({ navigation,idConsulta }) => {

    const IdConsulta = idConsulta
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("")
    const [listAppointment, setListAppointment] = useState([])


    useEffect(() => {
        profileLoad()
    }, [])


    async function profileLoad() {
        const token = await userDecodeToken();
        setName(token.name);
        setEmail(token.email);
        setRole(token.role)
        console.log("AQUIIII");
        console.log(token);
        // console.log(role);

        await GetAppointment(token.jti)
    }

    async function GetAppointment(token) {
        console.log("Inicio da Funcao ");
        console.log(token);

        await api.get(`/Pacientes/BuscarPorID?id=${token}`)
            .then(response => {

                setListAppointment(response.data.consulta)

                // Supondo que listAppointment é o array de consultas
                const mostRecentAppointment = listAppointment.find(appointment => appointment.id === IdConsulta);

                


            })
            .catch(error => {
                console.log(error);
            })

    }


    return (
        (role != null ? (
            <Container>
                <HeaderContainer>
                    <HeaderPhoto source={require("../../assets/PhotoProfile.png")} />
                </HeaderContainer>

                <ContainerForm>

                    <Title>{name}</Title>
                    <TextAccount>Idade vir da Home <TextAbout>{email}</TextAbout> </TextAccount>

                    <ScrollForm>
                        {role === 'medico' ? (
                            <>
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Descricao"}
                                    placeholder={listAppointment[0].descricao}
                                />

                                <BoxInputForm
                                    textLabel={"Diagnostico"}
                                    placeholder={listAppointment[0].diagnostico}
                                />
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Prescricao Medica"}
                                    placeholder={"Prescricao Medica"}
                                />

                                <BoxInputForm
                                    fieldHeigth={120}
                                    placeholder={"Resultado do Exame "}
                                />

                                <BoxInputPhoto
                                    fieldHeigth={120}
                                    placeholder={"Nenhuma Foto"}
                                    textLabel={"Exames Medicos"} />

                                <ViewRow>
                                    <ButtonSendPhoto onPress={() => { setOpenModal(true); }}>
                                        <ButtonTitle>
                                            <MaterialIcons name="add-a-photo" size={24} color={"white"} />
                                        </ButtonTitle>
                                        <ButtonTitle>ENTRAR</ButtonTitle>
                                    </ButtonSendPhoto>

                                    <TransparentContainer>
                                        <TextRed>Cancelar</TextRed>
                                    </TransparentContainer>
                                </ViewRow>
                                <HR />

                                <InputContainer>
                                    <Button>
                                        <ButtonTitle>Salvar</ButtonTitle>
                                    </Button>

                                    <Button>
                                        <ButtonTitle onPress={() => navigation.navigate('EditFormDoctor')}>Editar</ButtonTitle>
                                    </Button>

                                    <LinkCancel onPress={() => navigation.replace('Home')}>Cancelar</LinkCancel>

                                </InputContainer>
                            </>
                        ) : (
                            <>
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Descricao"}
                                    placeholder={"listAppointment.consulta.descricao"}
                                />

                                <BoxInputForm
                                    textLabel={"Diagnostico"}
                                    placeholder={""}
                                />
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Prescricao Medica"}
                                    placeholder={"Prescricao Medica"}
                                />
                            </>
                        )}


                        <LinkCancel style={{ textAlign: 'center' }} onPress={() => navigation.replace('Main')}>Voltar</LinkCancel>
                    </ScrollForm>
                </ContainerForm>

                <Modal animationType="slide" transparent={true} visible={openModal} >
                    <Cam onPress={() => { setOpenModal(false); }} />
                </Modal>

            </Container>
        ) : (<ActivityIndicator />))
    )
}
