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

export const FormDoctor = ({ navigation, route }) => {


    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("")
    const [listAppointment, setListAppointment] = useState(null)
    const [dados, setDados] = useState([])

    async function profileLoad() {
        const token = await userDecodeToken();
        setName(token.name);
        setEmail(token.email);
        setRole(token.role)
        setListAppointment(route.params.consultaId)
    }

    useEffect(() => {
        console.log("Rodou");
        profileLoad()
    }, [])

    useEffect(() => {
        if (listAppointment != null) {
            GetAppointment();
        }
    }, [listAppointment]);


    async function GetAppointment() {
        console.log("Inicio da Funcao ");
        console.log(listAppointment);
        await api.get(`/Consultas/BuscarPorId?id=${listAppointment}`)
            .then(response => {
                console.log(response.data);
                 setDados(response.data);
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
                                    placeholder={dados.descricao}
                                />

                                <BoxInputForm
                                    textLabel={"Diagnostico"}
                                    placeholder={dados.diagnostico}
                                />
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Prescricao Medica"}
                                    placeholder={dados.receita.medicamento}
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
                                    placeholder={dados.descricao}
                                />

                                <BoxInputForm
                                    textLabel={"Diagnostico"}
                                    placeholder={dados.diagnostico}
                                />
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Prescricao Medica"}
                                    placeholder={dados.receita.medicamento}
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
