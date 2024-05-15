import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { BoxInput, BoxInputForm, BoxInputPhoto } from "../../components/BoxInput/BoxInput"
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
    const [uriPhotoForm, setUriPhotoForm] = useState(null)
    const [listAppointment, setListAppointment] = useState([])
    const [showCamForm, setShowCamForm] = useState(false)
    const [descricaoExame, setDescricaoExame] = useState("")
    const [descricaoOcr, setDescricaoOcr] = useState("")
    const [consultaId, setConsultaId] = useState(null)

    async function profileLoad() {
        const token = await userDecodeToken();
        setName(token.name);
        setEmail(token.email);
        setRole(token.role)
        setConsultaId(route.params.consultaId)
    }

    async function InserirExame() {
        
        const formData = new FormData();
        formData.append("ConsultaId", consultaId);
        formData.append("Image", {
            uri: uriPhotoForm,
            name: `image.jpg`,
            type: `image/jpeg`
        })

        await api.post(`/Exame/Cadastrar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(async (response) => {

            setDescricaoExame(response.data.descricao)
            console.log(descricaoExame);

        }).catch(err => {
            console.log(err);
        })
    }
    function formatarIdade(Idade) {
        const date = new Date();
        const anoAtual = date.getFullYear();
        const diaAtual = date.getDate();
        const mesAtual = date.getMonth() + 1;

        const userAno = Idade.slice(0, 4)
        const userDia = Idade.slice(8, 10)
        const userMes = Idade.slice(5, 7)

        const userIdade = anoAtual - userAno
        if (mesAtual < userMes) {
            return userIdade - 1;
        }
        else {
            if (diaAtual < userDia) {
                return `${userIdade - 1} `;
            }
        }

        // return `${userDia}`;
    }

    useEffect(() => {
        profileLoad()
        console.log(route.params);
    }, [])


    useEffect(() => {
        if (uriPhotoForm != null && consultaId != null) {
            console.log("entrou na ocr");
            InserirExame();
        }
    }, [uriPhotoForm])

    return (
        (role != null ? (
            <Container>
                <HeaderContainer>
                    <HeaderPhoto source={{ uri: route.params.pacienteFoto }} />
                </HeaderContainer>

                <ContainerForm>

                    <Title>{route.params.nome}</Title>
                    <TextAccount>{formatarIdade(route.params.pacienteIdade)} Anos <TextAbout>{route.params.email}</TextAbout> </TextAccount>

                    <ScrollForm>
                        {role === 'Paciente' ? (
                            <>
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Descricao"}
                                    placeholder={route.params.consultaDescricao}
                                />

                                <BoxInputForm
                                    textLabel={"Diagnostico"}
                                    placeholder={route.params.consultaDiagnostico}
                                />
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Prescricao Medica"}
                                    placeholder={route.params.consultaReceita}

                                />



                                <BoxInputPhoto
                                    fieldHeigth={120}
                                    uriPhotoForm={uriPhotoForm}
                                    placeholder={"Nenhuma Foto"}
                                    textLabel={"Exames Medicos"}
                                    source={{ uri: uriPhotoForm }}
                                    editable={false}
                                />

                                <ViewRow>
                                    <ButtonSendPhoto onPress={() => { setShowCamForm(true); }}>
                                        <ButtonTitle>
                                            <MaterialIcons name="add-a-photo" size={24} color={"white"} />
                                        </ButtonTitle>
                                        <ButtonTitle>ENTRAR</ButtonTitle>
                                    </ButtonSendPhoto>

                                    {/* <TransparentContainer>
                                        <TextRed>Cancelar</TextRed>
                                    </TransparentContainer> */}
                                </ViewRow>
                                <HR />

                                <BoxInputPhoto
                                    placeholder={descricaoExame}
                                    fieldHeigth={"max-content"}
                                    multiline={true}
                                    scrollEnabled={true}
                                />
                                
                                <InputContainer>

                                    <Button>
                                        <ButtonTitle>Salvar</ButtonTitle>
                                    </Button>

                                    <LinkCancel onPress={() => navigation.replace('Home')}>Cancelar</LinkCancel>

                                </InputContainer>
                            </>
                        ) : (
                            <>
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Descricao"}
                                    placeholder={route.params.consultaDescricao}
                                />

                                <BoxInputForm
                                    textLabel={"Diagnostico"}
                                    placeholder={route.params.consultaDiagnostico}
                                />
                                <BoxInputForm
                                    fieldHeigth={120}
                                    textLabel={"Prescricao Medica"}
                                    placeholder={route.params.consultaReceita}
                                />

                                <ViewRow>
                                    <Button>
                                        <ButtonTitle>Salvar</ButtonTitle>
                                    </Button>

                                    <Button>
                                        <ButtonTitle onPress={() => navigation.navigate('EditFormDoctor')}>Editar</ButtonTitle>
                                    </Button>

                                    <LinkCancel onPress={() => navigation.replace('Home')}>Cancelar</LinkCancel>

                                </ViewRow>
                                <HR />
                            </>
                        )}


                        {/* <LinkCancel style={{ textAlign: 'center' }} onPress={() => navigation.replace('Main')}>Voltar</LinkCancel> */}
                    </ScrollForm>
                </ContainerForm>

                <Modal animationType="slide" transparent={true} visible={showCamForm} >
                    <Cam
                        getMediaLibrary={true}
                        visible={showCamForm}
                        setUriPhotoForm={setUriPhotoForm}
                        setShowCamForm={setShowCamForm}
                        showCamForm={showCamForm}
                    />
                </Modal>

            </Container>
        ) : (<ActivityIndicator />))
    )
}
