import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { BoxInputForm, BoxInputPhoto } from "../../components/BoxInput/BoxInput"
import { Button, ButtonSendPhoto, ButtonTitle } from "../../components/Button/Button"
import { Container, ContainerForm, HR, InputContainer, TransparentContainer, ViewRow } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { LinkCancel } from "../../components/Links/StyleLink"
import { TextAccount, TextRed } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ScrollForm } from "../Profile/StyleProfile"
import { MaterialIcons } from '@expo/vector-icons'
import Cam from '../../components/Cam/Cam';
import { userDecodeToken } from '../../utils/Auth';

export const FormDoctor = ({ navigation }) => {


    const [openModal, setOpenModal] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("")
    async function profileLoad() {
        const token = await userDecodeToken();
        setName(token.name);
        setEmail(token.email);
        setRole(token.role)
        // console.log(token);
        // console.log(role);
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
                <TextAccount>22 Anos    {email}</TextAccount>
                <ScrollForm>
                    {role === 'medico' ? (
                        <>
                            <BoxInputForm
                                fieldHeigth={120}
                                textLabel={"Descricao"}
                                placeholder={"Descricao"} />

                            <BoxInputForm
                                textLabel={"Diagnostico"}
                                placeholder={"Diagnostico"}
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
                                placeholder={"Descricao"} />

                            <BoxInputForm
                                textLabel={"Diagnostico"}
                                placeholder={"Diagnostico"}
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
