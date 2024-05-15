
import { useEffect, useState } from "react"
import { BoxInput, BoxInputForm } from "../../components/BoxInput/BoxInput"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container, DoubleView, InputContainer } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { ModalTitle } from "../../components/Modal/Modal"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ButtonCamera, ButtonLogout, ScrollForm } from "./StyleProfile"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../services/services"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Cam from "../../components/Cam/Cam"
import moment from 'moment';
import { Alert, Text } from "react-native"



export const Profile = ({ navigation, route }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [idUser, setIdUser] = useState("")
    const [role, setRole] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');

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
    const [cpfTemp, setCpftemp] = useState("")
    const [dataNascimentoTemp, setDataNascimentoTemp] = useState("");

    const [tokenKey, setTokenKey] = useState("")
    const [showCam, setShowCam] = useState(false)
    const [date, setDate] = useState("");
    const [isEditingCpf, setIsEditingCpf] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [foto, setFoto] = useState(null)

    const formattedDate = moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const [uriPhoto, setUriPhoto] = useState(null);
    const [newUriPhoto, setNewUriPhoto] = useState()



    const handleChange = (inputDate) => {
        inputDate = inputDate.replace(/\D/g, ''); // Remove qualquer caractere não numérico
        if (inputDate.length > 8) {
            inputDate = inputDate.substring(0, 8); // Limita a data a 8 caracteres (DDMMAAAA)
        }
        if (inputDate.length > 2 && inputDate.charAt(2) !== '/') {
            inputDate = inputDate.substring(0, 2) + '/' + inputDate.substring(2); // Adiciona a barra após o segundo dígito do dia
        }
        if (inputDate.length > 5 && inputDate.charAt(5) !== '/') {
            inputDate = inputDate.substring(0, 5) + '/' + inputDate.substring(5); // Adiciona a barra após o segundo dígito do mês
        }
        // Verifica se a data está completa e se não possui caracteres não numéricos após o dia/mês/ano
        if (inputDate.length === 10 && !/[^0-9]/.test(inputDate.substring(6))) {
            setDate(inputDate);
            setDataNascimento(inputDate); // Atualiza o estado dataNascimento com a data formatada
            setErrorMessage(''); // Limpa a mensagem de erro se a data estiver no formato correto
        } else {
            setErrorMessage("Digite sua Data de Nascimento somente com números no padrão 'DD/MM/YYYY', por exemplo: 15022002");
        }
    };



    async function profileLoad() {


        const TokenDecoded = await userDecodeToken()
        setName(TokenDecoded.name);
        setEmail(TokenDecoded.email);
        setIdUser(TokenDecoded.jti);
        setRole(TokenDecoded.role)

        if (TokenDecoded.role && TokenDecoded.jti) {

            const user = TokenDecoded.role == "Medico" ? "Medicos" : "Pacientes"
            await api.get(`/${user}/BuscarPorId?id=${TokenDecoded.jti}`)
                .then(response => {

                    if (user == "Pacientes") {

                        setCpf(response.data.cpf)
                        setDataNascimento(response.data.dataNascimento)
                        setEndereco(response.data.endereco.logradouro)
                        setCep(response.data.endereco.cep)
                        setCidade(response.data.endereco.cidade)
                        setFoto(response.data.idNavigation.foto)
                    }
                    else {

                        setCrm(response.data.crm)
                        setEndereco(response.data.endereco.logradouro)
                        setCep(response.data.endereco.cep)
                        setFoto(response.data.idNavigation.foto)
                        setCidade(response.data.endereco.cidade)
                    }

                })
                .catch(err => {

                    console.log("erro Buscar por id", err);
                });
        }
    }


    async function EditProfile(role) {
        console.log("Entrou na Funcao");

        setIsEditing(false);
        let url = "/Pacientes";
        const data = {
            // Campos comuns a ambos os perfis
            "dataNascimento": formattedDate,
            "cep": cep,
            "logradouro": endereco,
            "email": email,
            "cidade": cidade
        };

        if (role === "Medico") {
            url = "/Medicos"
            data.crm = crm; // Adiciona o CRM ao objeto de dados apenas para médicos
            delete data.cpf; // Remove o CPF do objeto de dados para médicos
        } else {
            data.cpf = cpf; // Adiciona o CPF ao objeto de dados apenas para pacientes
            delete data.crm; // Remove o CRM do objeto de dados para pacientes
        }

        // Adicione alguns console.log para verificar os valores de `url` e `data`
        console.log("URL:", url);
        console.log("Data:", data);

        const nameId = role == "Medico" ? "idMedico" : "idUsuario"
        try {
            console.log("Entrou no Try");
            const response = await api.put(`${url}?${nameId}=${idUser}`, data);

            console.log("response");
            console.log(response);
            console.log("Data");
            console.log(response.data);

        } catch (error) {
            console.log("Erro");
            console.log(error);
        }
    }


    async function AlterarFotoPerfil() {

        if (uriPhoto != null) {

            const formData = new FormData();
            formData.append("Arquivo", {
                uri: uriPhoto,
                name: `image.${uriPhoto.split('.').pop()}`,
                type: `image/${uriPhoto.split('.').pop()}`

            })
            await api.put(`/Usuario/AlterarFotoPerfil?id=${idUser}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(response => {
                console.log(response.data, "Alterar foto perfil deu bom");
                setFoto(uriPhoto)
            }).catch(erro => {
                console.log("Alteração de foto falhou", erro);
            })
        }

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
    }

    const iniciarEdicao = () => {
        setEnderecoTemp(endereco);
        setCepTemp(cep);
        setCpftemp(cpf)
        setCidadeTemp(cidade);
        setDataNascimentoTemp(dataNascimento);
        setEmailTemp(email);
        setIsEditing(true);
        if (cpf == "null" || date == "null") {
            setIsEditingCpf(true);
            console.log("Entrou True" + cpf);

        } else {
            setIsEditingCpf(false);
            console.log("Entrou false " + cpf);
        }
    };

    // Função para cancelar a edição e restaurar o valor original do CEP
    const cancelarEdicao = () => {
        setCep(cepTemp);
        setEndereco(enderecoTemp)
        setCidade(cidadetemp)
        setEmail(emailTemp)
        setCpf(cpfTemp)
        setDataNascimento(dataNascimentoTemp)
        setIsEditing(false);
    };


    useEffect(() => {
        profileLoad();
        console.log(cpf);
    }, [])

    useEffect(() => {

        if (uriPhoto != "") {

            AlterarFotoPerfil();
        }
    }, [uriPhoto])


    return (
        <Container>
            <HeaderContainer>
                <HeaderPhoto source={{ uri: foto }} />
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

                {
                    role == "Paciente" && isEditing ? (

                        <>

                            {isEditingCpf ? (
                                <>
                                    <BoxInputForm
                                        textLabel={"Data de Nascimento"}
                                        keyboardType='number-pad'
                                        editable={true}
                                        onChangeText={handleChange}
                                        placeholder={"dd/mm/aaaa"}

                                    />
                                    {errorMessage !== '' && <Text style={{ color: 'red', margin: 10 }}>{errorMessage}</Text>}

                                    <BoxInputForm
                                        textLabel={"CPF"}
                                        placeholder={cpf == "null" ? "000.000.000-00" : cpf}
                                        editable={true}
                                        onChangeText={(txt) => setCpf(txt)}
                                        
                                    />
                                </>
                            ) : (

                                <>
                                    <BoxInput
                                        textLabel={"Data de Nascimento"}
                                        keyboardType='numeric'
                                        value={moment(dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}


                                    />
                                    <BoxInput
                                        textLabel={"CPF"}
                                        placeholder={formatarCPF(cpf)}
                                    />
                                </>
                            )}
                            < BoxInputForm
                                textLabel={"Endereco"}
                                placeholder={"Endereco"}
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
                                    placeholder={"CEP"}
                                    editable={true}
                                    onChangeText={(txt) => {
                                        setCep(txt.trim())
                                    }}
                                />
                                <BoxInputForm
                                    fieldWidth={40}
                                    textLabel={"Cidade"}
                                    editable={true}
                                    placeholder={"Cidade"}
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
                                placeholder={dataNascimento != null ? moment(dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY') : "Data nascimento"}
                            />
                            <BoxInput
                                textLabel={"CPF"}
                                placeholder={cpf === "null" ? "CPF" : formatarCPF(cpf)}
                            />
                            <BoxInput
                                textLabel={"Endereço"}
                                placeholder={endereco === "null" ? "Endereço" : endereco}
                            />
                            <DoubleView>
                                <BoxInput
                                    fieldWidth={40}
                                    textLabel={"Cep"}
                                    placeholder={cep === "null" ? "CEP" : formatarCEP(cep)}
                                />
                                <BoxInput
                                    fieldWidth={40}
                                    textLabel={"Cidade"}
                                    placeholder={cidade === "null" ? "Cidade" : cidade}
                                />
                            </DoubleView>
                        </>
                    ) : role == 'Medico' && isEditing ? (
                        <>

                            <BoxInput
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
                            <Button onPress={() => EditProfile(role)}>
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
