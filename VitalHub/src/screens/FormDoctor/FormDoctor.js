import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text } from 'react-native';
import { BoxInput, BoxInputForm, BoxInputPhoto } from "../../components/BoxInput/BoxInput"
import { Button, ButtonSendPhoto, ButtonTitle } from "../../components/Button/Button"
import { Container, ContainerForm, HR, InputContainer, InputContainerFormDoctor, TransparentContainer, ViewRow } from "../../components/Container/StyleContainer"
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
    const [consultaExame, setConsultaExame] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [medicamento, setMedicamento] = useState("")
    const [descricao, setDescricao] = useState("")
    const [diagnostico, setDiagnostico] = useState("")

    async function profileLoad() {
        const token = await userDecodeToken();
        setName(token.name);
        setEmail(token.email);
        setRole(token.role);

        setConsultaId(route.params.consultaId);
        setConsultaExame(route.params.consultaExame);
        setDescricao(route.params.consultaDescricao)
        setDiagnostico(route.params.consultaDiagnostico)
        setMedicamento(route.params.consultaReceita)
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

        }).catch(err => {
            console.log(err);
        })
    }

    async function ExameBuscarPorId() {
        console.log("dada", consultaId);
        await api.get(`/Exame/BuscarPorIdConsulta?idConsulta=${consultaId}`)
            .then(response => {
                let descricao = '';
                response.data.forEach(element => {
                    descricao += element.descricao
                });
                // console.log('response',response)
                setDescricaoExame(descricao);

            })
            .catch(error => {
                alert(`Erro ao buscar exame: ${error}`)
            })
    }

    async function AtualizarProntuario() {
        await api.put(`/Consultas/Prontuario`,
            {
                consultaId: consultaId,
                medicamento: medicamento,
                descricao: descricao,
                diagnostico: diagnostico
            })
            .then(response => {
                setIsEditing(false);

                api.put(`Consultas/Status?idConsulta=${consultaId}&status=realizadas`)
            })
            .catch(e => {
                console.log(e.data);
            })
    }

    function formatarIdade(Idade) {
        if (Idade != null) {

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
        }

        // return `${userDia}`;
    }

    useEffect(() => {
        profileLoad()
        console.log(route.params);
    }, [])

    useEffect(() => {
        if (consultaId != null) {
            ExameBuscarPorId()
        }
    }, [consultaId])


    useEffect(() => {
        if (uriPhotoForm != null && consultaId != null) {
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
                    <TextAccount>{formatarIdade(route.params.pacienteIdade)}Anos <TextAbout>{route.params.email}</TextAbout> </TextAccount>

                    <ScrollForm>
                        {role === 'Paciente' ? (
                            descricaoExame == "" ?
                                (
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
                                            placeholder={consultaExame}
                                            fieldHeigth={"max-content"}
                                            multiline={true}
                                            scrollEnabled={true}
                                        />

                                        <InputContainer>

                                            <Button onPress={() => navigation.replace("Main")}>
                                                <ButtonTitle>Salvar</ButtonTitle>
                                            </Button>

                                            <LinkCancel onPress={() => navigation.replace('Home')}>Cancelar</LinkCancel>

                                        </InputContainer>
                                    </>
                                )
                                :
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
                                       

                                        {/* <TransparentContainer>
                                <TextRed>Cancelar</TextRed>
                            </TransparentContainer> */}
                                    </ViewRow>
                                    <HR />

                                    <ScrollView nestedScrollEnabled style={{ borderWidth: 2, borderColor: "#49B3BA", borderRadius: 5, width: "90%", alignSelf: "center", padding: 10, marginTop: 20 }}>
                                        <Text style={{ textAlign: "justify" }}>{descricaoExame ? descricaoExame : ''}</Text>
                                    </ScrollView>
                                    {/* <BoxInputPhoto
                                        placeholder={descricaoExame}
                                        fieldHeigth={"max-content"}
                                        multiline={true}
                                        scrollEnabled={true}
                                    /> */}

                                    <InputContainerFormDoctor>

                                        <Button onPress={() => navigation.replace("Main")}>
                                            <ButtonTitle>Voltar</ButtonTitle>
                                        </Button>

                                    </InputContainerFormDoctor>
                                </>
                        )

                            : (
                                <>
                                    <BoxInputForm
                                        fieldHeigth={120}
                                        textLabel={"Descricao"}
                                        placeholder={"Descricao"}
                                        value={descricao}
                                        editable={isEditing}
                                        onChangeText={(txt) => {
                                            setDescricao(txt)
                                        }}
                                    />

                                    <BoxInputForm
                                        textLabel={"Diagnostico"}
                                        placeholder={"Diagnostico"}
                                        value={diagnostico}
                                        editable={isEditing}
                                        onChangeText={(txt) => {
                                            setDiagnostico(txt)
                                        }}
                                    />
                                    <BoxInputForm
                                        fieldHeigth={120}
                                        textLabel={"Prescricao Medica"}
                                        placeholder={"Prescricao Medica"}
                                        value={medicamento}
                                        editable={isEditing}
                                        onChangeText={(txt) => {
                                            setMedicamento(txt)
                                        }}
                                    />

                                    <ViewRow>
                                        {
                                            isEditing ?
                                                <Button onPress={() => { AtualizarProntuario() }}>
                                                    <ButtonTitle>Salvar</ButtonTitle>
                                                </Button>

                                                :
                                                <Button onPress={() => { setIsEditing(true); }}>
                                                    <ButtonTitle >Editar</ButtonTitle>
                                                </Button>

                                        }



                                        <LinkCancel onPress={() => { navigation.replace('Main'); setIsEditing(false) } }>Cancelar</LinkCancel>

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
