import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
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
import api, { Appointment } from '../../services/services';

export const FormDoctor = ({ navigation }) => {


    const [openModal, setOpenModal] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("")
    const [listAppointment, setListAppointment] = useState([])

    async function profileLoad() {
        const token = await userDecodeToken();
        setName(token.name);
        setEmail(token.email);
        setRole(token.role)
        // console.log(token);
        // console.log(role);

        await GetAppointment(token.token)
    }

    async function GetAppointment(token) {

        await api.get(Appointment, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            setListAppointment(response.data)
        }).catch(error => {
            console.log(error);
        })

    }
    useEffect(() => {
        profileLoad()
    }, [])

    return (
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
                            // placeholder={listAppointment[0].descricao} 
                            />

                            <BoxInputForm
                                textLabel={"Diagnostico"}
                            // placeholder={listAppointment[0].diagnostico}
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
                                placeholder={listAppointment.length > 0 ? listAppointment[0].descricao : ""}
                            />

                            <BoxInputForm
                                textLabel={"Diagnostico"}
                                placeholder={listAppointment.length > 0 ? listAppointment[0].descricao : ""}
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
    )
}
