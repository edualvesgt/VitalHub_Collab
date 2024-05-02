
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
import { Home } from "../Home/Home"
import { Input, InputForm } from "../../components/Input/StyleInput"
import { set } from "date-fns"


export const Profile = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idUser, setIdUser] = useState("")
    const [role, setRole] = useState(null)

    const [getPatient, setGetPatient] = useState([]);

    const [cpf, setCpf] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    const [crm, setCrm] = useState("")

    const [enderecoTemp, setEnderecoTemp] = useState("")
    const [cepTemp, setCepTemp] = useState("")
    const [cidadetemp, setCidadeTemp] = useState("")
    const [emailTemp, setEmailTemp] = useState("")

    const [tokenKey, setTokenKey] = useState("")
    const [showCam, setShowCam] = useState(false)
    const [date, setDate] = useState("");
    const [isEditingCpf, setIsEditingCpf] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [uriPhoto, setUriPhoto] = useState(null);
    const [userUriPhoto, setUserUriPhoto] = useState(null)


    async function profileLoad() {

        const TokenDecoded = await userDecodeToken()
        setName(TokenDecoded.name);
        setEmail(TokenDecoded.email);
        setIdUser(TokenDecoded.jti);
        setRole(TokenDecoded.role)



        const user = TokenDecoded.role == "Medico" ? "Medicos" : "Pacientes"
        await api.get(`/${user}/BuscarPorId?id=${TokenDecoded.jti}`)
            .then(response => {
                console.log(response.data);
                if (user == "Pacientes") {

                    setCpf(response.data.cpf)
                    setDataNascimento(response.data.dataNascimento)
                    setEndereco(response.data.endereco.logradouro)
                    setCep(response.data.endereco.cep)
                    setCidade(response.data.endereco.cidade)
                    setUriPhoto(response.data.idNavigation.foto)
                }
                else {

                    setCrm(response.data.crm)
                    setEndereco(response.data.endereco.logradouro)
                    setCep(response.data.endereco.cep)
                    setUriPhoto(response.data.idNavigation.foto)
                }

            })
            .catch(err => {
                
                console.log("erro Buscar por id", err);
            });

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
        formData.append("Image", {
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

    const iniciarEdicao = () => {
        setEnderecoTemp(endereco);
        setCepTemp(cep);
        setCidadeTemp(cidade);
        setEmailTemp(email);
        setIsEditing(true);
        if (cpf) {
            setIsEditingCpf(false);
        } else {
            setIsEditingCpf(true);
        }
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
    }, [])

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

                {
                    role == "Paciente" && isEditing ? (

                        <>
                            <BoxInputForm
                                textLabel={"Data de Nascimento"}
                                keyboardType='numeric'
                                value={dataNascimento}

                            />
                            {isEditingCpf ? (
                                <BoxInputForm
                                    textLabel={"CPF"}
                                    value={cpf}
                                    editable={true}
                                    onChangeText={(txt) => setCpf(txt)}
                                />
                            ) : (
                                <BoxInput
                                    textLabel={"CPF"}
                                    placeholder={formatarCPF(cpf)}
                                />
                            )}
                            < BoxInputForm
                                textLabel={"Endereco"}
                                value={endereco}
                                editable={true}
                                onChangeText={(txt) => {
                                    setEndereco(txt)
                                }}
                            />
                            <DoubleView>
                                <BoxInputForm
                                    fieldWidth={40}
                                    keyboardType='numeric'
                                    textLabel={"CEP"}
                                    value={cep}
                                    editable={true}
                                    onChangeText={(txt) => {
                                        setCep(txt.trim())
                                    }}
                                />
                                <BoxInputForm
                                    fieldWidth={40}
                                    value={cidade}
                                    textLabel={"Cidade"}
                                    editable={true}

                                    onChangeText={(txt) => {
                                        setCidade(txt)
                                    }}
                                />
                            </DoubleView>
                        </>
                    ) : role == "Paciente" ? (
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
                    ) : role == 'Medico' && isEditing ? (
                        <>
                            <BoxInputForm
                                textLabel={"Data de Nascimento"}
                                value={dataNascimento}
                            />
                            <BoxInputForm
                                textLabel={"CRM"}
                                value={crm}

                            />
                            <BoxInputForm
                                textLabel={"Endereco"}
                                editable={true}
                                value={endereco}
                                onChangeText={(txt) => {
                                    setEndereco(txt)
                                }}
                            />
                            <DoubleView>
                                <BoxInputForm
                                    fieldWidth={40}
                                    textLabel={"CEP"}
                                    value={cep}
                                    editable={true}
                                    onChangeText={(txt) => {
                                        setCep(txt.trim())
                                    }}
                                />
                                <BoxInputForm
                                    fieldWidth={40}
                                    textLabel={"Cidade"}
                                    value={cidade}
                                    editable={true}
                                    onChangeText={(txt) => {
                                        setCidade(txt)
                                    }}
                                />
                            </DoubleView>
                        </>
                    ) :
                        (
                            <>
                                <BoxInput
                                    textLabel={"Data de Nascimento"}
                                    placeholder={dataNascimento}
                                />
                                <BoxInput
                                    textLabel={"CRM"}
                                    placeholder={crm}
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
                            <Button onPress={() => EditProfile()}>
                                <ButtonTitle>Salvar</ButtonTitle>
                            </Button>
                            <Button onPress={() => cancelarEdicao()}>
                                <ButtonTitle>Cancelar</ButtonTitle>
                            </Button>
                        </>
                    ) : (
                        <Button onPress={() => iniciarEdicao()}>
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
