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
import { Input, InputForm } from "../../components/Input/StyleInput"
import { set } from "date-fns"


export const Profile = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idUser, setIdUSer] = useState("")

    const [getPatient, setGetPatient] = useState([]);

    const [cpf, setCpf] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")

    const [enderecoTemp, setEnderecoTemp] = useState("")
    const [cepTemp, setCepTemp] = useState("")
    const [cidadetemp, setCidadeTemp] = useState("")
    const [emailTemp, setEmailTemp] = useState("")

    const [tokenKey, setTokenKey] = useState("")
    const [showCam, setShowCam] = useState(false)
    const [date, setDate] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [uriPhoto, setUriPhoto] = useState(null);


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

        await api.get(`/Pacientes/BuscarPorId?id=${idUser}`)
            .then(response => {
                setCpf(response.data.cpf)
                setDataNascimento(response.data.dataNascimento)
                setEndereco(response.data.endereco.logradouro)
                setCep(response.data.endereco.cep)
                setCidade(response.data.endereco.cidade)
                setUriPhoto(response.data.idNavigation.foto)
                console.log("Buscar Id", response.data.idNavigation.foto);
            })
            .catch(err => {
                console.log("erro Buscar por id");
                console.log(err);
            });

        console.log(getPatient);
    }

    async function EditProfile() {
        try {
            const response = await api.put(`/Pacientes?idUsuario=${idUser}`, {

                "cep": cep,
                "logradouro": endereco,
                "email": email,
                "cidade": cidade

            })
            if (response.status == 200) {
                setIsEditing(false)
            }
        } catch (error) {
            console.log(error.response.status);
            console.log(error.response.data);
        }
    }

    async function AlterarFotoPerfil() {
        const formData = new FormData();
        formData.append("Arquivo", {
            uri: uriPhoto,
            //name: `image.${uriPhoto.split(".")[1]}`,
            name: `image.jpg`,
            //type: `image/${uriPhoto.split(".")[1]}`
            type: `image/jpg`
        })
        console.log(idUser);
        await api.put(`/Usuario/AlterarFotoPerfil?idUsuario=${idUser}`, formData, {
            headers: {
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

    // Função para cancelar a edição e restaurar o valor original do CEP
    const cancelarEdicao = () => {
        setCep(cepTemp);
        setEndereco(enderecoTemp)
        setCidade(cidadetemp)
        setEmail(emailTemp)
        setIsEditing(false);
    };


    useEffect(() => {
        profileLoad();
        getToken();

        if (isEditing) {
            setCepTemp(cep)
            setCidadeTemp(cidade)
            setEnderecoTemp(endereco)
            setEmailTemp(email)
        }
        console.log("OIIIIIIIIIII");
        console.log(idUser);
    }, [idUser, isEditing])

    useEffect(() => {
        if (idUser != null) {
            PatientData()

        }
    }, [idUser])

    useEffect(() => {
        console.log(uriPhoto);
        if (uriPhoto) {
            AlterarFotoPerfil();
        }
    }, [uriPhoto])


    return (
        <Container>
            <HeaderContainer>
                <HeaderPhoto source={{ uri: uriPhoto }} />
                <ButtonCamera onPress={() => setShowCam(true)} >
                    <MaterialCommunityIcons name="camera-plus" size={20} color={"#fbfbfb"} />
                </ButtonCamera>
            </HeaderContainer>

            <Cam visible={showCam} getMediaLibrary={true} setUriPhoto={setUriPhoto} setShowCam={setShowCam} />

            <ModalTitle>
                <Title>{name}</Title>
                {isEditing ?
                    <InputForm
                        value={email}
                        onChangeText={(txt) => {
                            setEmail(txt.trim())
                        }} />
                    :
                    <TextAccount>{email}</TextAccount>}

            </ModalTitle>
            <ScrollForm>

                {isEditing ? (
                    <>
                        <BoxInput
                            textLabel={"Data de Nascimento"}
                            placeholder={dataNascimento}


                        />
                        <BoxInput
                            textLabel={"CPF"}
                            placeholder={formatarCPF(cpf)}

                        />
                        <BoxInputForm
                            textLabel={"Endereco"}
                            // placeholder={endereco}
                            editable={true}
                            value={endereco}
                            onChangeText={(txt) => {
                                setEndereco(txt.trim())
                            }}
                        />
                        <DoubleView>
                            <BoxInputForm
                                fieldWidth={40}
                                textLabel={"CEP"}
                                // placeholder={formatarCEP(cep)}
                                maxLength={10}
                                editable={true}
                                keyboardType='numeric'
                                value={cep}
                                onChangeText={(txt) => {
                                    setCep(txt.trim())
                                }}
                            />
                            <BoxInputForm
                                fieldWidth={40}
                                textLabel={"Cidade"}
                                // placeholder={cidade}
                                editable={true}
                                value={cidade}
                                onChangeText={(txt) => {
                                    setCidade(txt.trim())
                                }}
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
                            placeholder={""}
                        />
                        <BoxInput
                            textLabel={"Endereco"}
                            placeholder={endereco}
                        />
                        <DoubleView>
                            <BoxInput
                                fieldWidth={40}
                                textLabel={"Cep"}
                                placeholder={""}
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
                            <Button onPress={() => EditProfile()}>
                                <ButtonTitle>Salvar</ButtonTitle>
                            </Button>
                            <Button onPress={() => cancelarEdicao()}>
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
