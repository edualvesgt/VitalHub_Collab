import { useEffect, useState } from "react"
import { BoxInput, BoxInputForm } from "../../components/BoxInput/BoxInput"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container, DoubleView, InputContainer } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderContent, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { ModalTitle } from "../../components/Modal/Modal"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ButtonCamera, ButtonLogout, ScrollForm } from "./StyleProfile"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api, { GetPacient } from "../../services/services"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from "react-native"
import Cam from "../../components/Cam/Cam"

export const Profile = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idUser, setIdUSer] = useState("")

    const [tokenKey, setTokenKey] = useState("")
    const [showCam, setShowCam] = useState(false)
    const [date, setDate] = useState("");
    const [getPatient, setGetPatient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [uriPhoto, setUriPhoto] = useState(null)


    async function profileLoad() {

        const TokenDecoded = await userDecodeToken()
        setName(TokenDecoded.name);
        setEmail(TokenDecoded.email);
        setIdUSer(TokenDecoded.jti);

    }

    async function getToken() {
        const token = await AsyncStorage.getItem('token');
        

        if (token != null) {
            setTokenKey(token.token)
        }
    }

    async function PatientData() {

        await api.get(GetPacient, {
            headers: {
                'accept ': `*/*`,
                'Authorization': `Bearer ${tokenKey}`
            }
        })
            .then(response => {
                
                setGetPatient(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri : uriPhoto,
            name: `image.${uriPhoto.split(".")[1]}`,
            type: `image/${uriPhoto.split(".")[1]}`
        })
        console.log(idUser);
        await api.put(`/Usuario/AlterarFotoPerfil?id=${idUser}`, formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log(response);
        }).catch(erro => {
            console.log("Alterar foto");
            console.log(erro);
        })
    }

   
    async function profileLogout(token) {
        try {

            await AsyncStorage.removeItem("token", navigation.replace("Login"));
        } catch (error) {
            console.log(error);
        }
    }

    const formatarCEP = (cep) => {
        return cep.substring(0, 5) + '-' + cep.substring(5);
    };

    // Função para formatar CPF com pontos
    const formatarCPF = (cpf) => {
        return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
    };

    useEffect(() => {
        profileLoad();
        getToken();
    }, [])

    useEffect(() => {
        
        PatientData()
    }, [tokenKey])

    useEffect(() => {
        console.log(uriPhoto);
        if(uriPhoto){
            AlterarFotoPerfil();
        }
    }, [uriPhoto])


    return (
        <Container>
            <HeaderContainer>
                <HeaderPhoto source={{uri: uriPhoto}} />
                <ButtonCamera onPress={() => setShowCam(true)} >
                    <MaterialCommunityIcons name="camera-plus" size={20} color={"#fbfbfb"} />
                </ButtonCamera>
            </HeaderContainer>

            <Cam visible={showCam} getMediaLibrary={true} setUriPhoto={setUriPhoto} setShowCam={setShowCam} />

            <ModalTitle>
                <Title>{name}</Title>
                <TextAccount>{email}</TextAccount>
            </ModalTitle>
            <ScrollForm>

                {isEditing ? (
                    <>
                        <BoxInputForm
                            textLabel={"Data de Nascimento"}
                            // placeholder={getPatient.dataNascimento ? new Date(getPatient.dataNascimento).toLocaleDateString() : ""}
                            editable={true}
                        />
                        <BoxInputForm
                            textLabel={"CPF"}
                            // placeholder={formatarCPF(getPatient.cpf) || ""}
                            editable={true}
                        />
                        <BoxInputForm
                            textLabel={"Endereco"}
                            // placeholder={getPatient.endereco.logradouro || ""}
                            editable={true}
                        />
                        <DoubleView>
                            <BoxInputForm
                                fieldWidth={40}
                                textLabel={"CEP"}
                                // placeholder={formatarCEP(getPatient.endereco.cep) || ""}
                                editable={true}
                            />
                            <BoxInputForm
                                fieldWidth={40}
                                textLabel={"Cidade"}
                                // placeholder={getPatient.endereco.cidade || "
                                editable={true}
                            />
                        </DoubleView>
                    </>
                ) : (
                    <>
                        <BoxInput
                            textLabel={"Data de Nascimento"}
                        // placeholder={getPatient.dataNascimento ? new Date(getPatient.dataNascimento).toLocaleDateString() : ""}
                        />
                        <BoxInput
                            textLabel={"CPF"}
                        // placeholder={formatarCPF(getPatient.cpf) || ""}
                        />
                        <BoxInput
                            textLabel={"Endereco"}
                        // placeholder={getPatient.endereco.logradouro || ""}
                        />
                        <DoubleView>
                            <BoxInput
                                fieldWidth={40}
                                textLabel={"CEP"}
                            // placeholder={formatarCEP(getPatient.endereco.cep) || ""}
                            />
                            <BoxInput
                                fieldWidth={40}
                                textLabel={"Cidade"}
                            // placeholder={getPatient.endereco.cidade || ""}
                            />
                        </DoubleView>
                    </>
                )}

                <InputContainer>
                    {isEditing ? (
                        <>
                            <Button>
                                <ButtonTitle>Salvar</ButtonTitle>
                            </Button>
                            <Button onPress={() => setIsEditing(false)}>
                                <ButtonTitle>Cancelar</ButtonTitle>
                            </Button>
                        </>
                    ) : (
                        <Button onPress={() => setIsEditing(true)}>
                            <ButtonTitle>Editar</ButtonTitle>
                        </Button>
                    )}
                    <ButtonLogout onPress={() => { profileLogout() }}>
                        <ButtonTitle>SAIR DO APP</ButtonTitle>
                    </ButtonLogout>
                </InputContainer>
            </ScrollForm>

        </Container>
    );
}
