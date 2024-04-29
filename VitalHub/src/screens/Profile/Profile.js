import { useEffect, useId, useState } from "react"
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
import { formatarIdade } from "../../components/Card/Card"


export const Profile = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idUser, setIdUser] = useState("")

    const [getPatient, setGetPatient] = useState([]);

    const [cpf, setCpf] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")

    const [tokenKey, setTokenKey] = useState("")
    const [showCam, setShowCam] = useState(false)
    const [date, setDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const [uriPhoto, setUriPhoto] = useState(null);
    const [userUriPhoto, setUserUriPhoto] = useState(null)


    async function profileLoad() {

        const TokenDecoded = await userDecodeToken()
        setName(TokenDecoded.name);
        setEmail(TokenDecoded.email);
        setIdUser(TokenDecoded.jti);

        await api.get(`/Pacientes/BuscarPorId?id=${TokenDecoded.jti}`)
        .then(response => {
        
            setCpf(response.data.cpf)
            setDataNascimento(response.data.dataNascimento)
            setEndereco(response.data.endereco.logradouro)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
            setUriPhoto(response.data.idNavigation.foto)

        })
        .catch(err => {
            console.log("erro /Pacientes/BuscarPorId", err);
        });
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: uriPhoto,
            name: `image.jpg`,
            // name: `image.jpg`,
            type: `image/jpg`
            // type: `image/jpg`
        })
        console.log(idUser);
        await api.put(`/Usuario/AlterarFotoPerfil?id=${idUser}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            console.log("Alterar foto perfil");
        }).catch(erro => {
            console.log("Alterar foto");
            console.log(erro );
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
    }, [])

    // useEffect(() => {
    //     if (idUser != null) {
    //         PatientData()
    //     }
    // }, [idUser])

    useEffect(() => {
        setUserUriPhoto(uriPhoto)

        if (userUriPhoto) {
            AlterarFotoPerfil();
        }

    }, [uriPhoto])


    return (
        <Container>
            <HeaderContainer>
                <HeaderPhoto source={{ uri: userUriPhoto }} />
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
                            placeholder={dataNascimento}
                        />
                        <BoxInput
                            textLabel={"CPF"}
                            placeholder={formatarCPF(cpf)}
                        />
                        <BoxInput
                            textLabel={"Endereco"}
                            placeholder={endereco}
                        />
                        <DoubleView>
                            <BoxInput
                                fieldWidth={40}
                                textLabel={"Cep"}
                                placeholder={formatarCEP(cep)}
                            />
                            <BoxInput
                                fieldWidth={40}
                                textLabel={"Cidade"}
                                placeholder={cidade}
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
