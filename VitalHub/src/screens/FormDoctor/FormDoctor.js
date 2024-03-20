import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { BoxInputForm, BoxInputPhoto } from "../../components/BoxInput/BoxInput"
import { Button, ButtonSendPhoto, ButtonTitle } from "../../components/Button/Button"
import { Container, ContainerForm, DoubleView, HR, InputContainer, TransparentContainer, ViewRow } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { LinkCancel } from "../../components/Links/StyleLink"
import { TextAccount, TextRed } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ScrollForm } from "../Profile/StyleProfile"
import { MaterialIcons } from '@expo/vector-icons'
import Cam from '../../components/Cam/Cam';

export const FormDoctor = ({ navigation }) => {


    const [openModal, setOpenModal] = useState(false);
    return (
        <Container>
            <HeaderContainer>
                <HeaderPhoto source={require("../../assets/PhotoProfile.png")} />
            </HeaderContainer>

            <ContainerForm>

                <Title>Richard Kosta</Title>
                <TextAccount>22 Anos    richard.kosta@gmail.com</TextAccount>
                <ScrollForm>

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

                    <InputContainer>
                        <Button>
                            <ButtonTitle>Salvar</ButtonTitle>
                        </Button>

                        <Button>
                            <ButtonTitle onPress={() => navigation.navigate('EditFormDoctor')}>Editar</ButtonTitle>
                        </Button>

                        <LinkCancel onPress={() => navigation.replace('Home')}>Cancelar</LinkCancel>

                    </InputContainer>

                    <BoxInputPhoto
                        fieldHeigth={120}
                        placeholder={"Nenhuma Foto"}
                        textLabel={"Exames Medicos"} />

                    <ViewRow>
                        <ButtonSendPhoto onPress={() => {setOpenModal(true); console.log("OnOpen:::",{openModal});}}>
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

                    <BoxInputForm
                        fieldHeigth={120}
                        placeholder={"Resultado do Exame "}
                    />

                    <LinkCancel style={{ textAlign: 'center' }} onPress={() => navigation.replace('Main')}>Voltar</LinkCancel>
                </ScrollForm>
            </ContainerForm>

            <Modal animationType="slide" transparent={true} visible={openModal} >
                <Cam onPress={() => {setOpenModal(false); console.log("OnClose:::",{openModal});}} />
            </Modal>


        </Container>

    )
}
