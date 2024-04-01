import { useEffect, useState } from "react"
import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { Container, DoubleView, InputContainer } from "../../components/Container/StyleContainer"
import { HeaderContainer, HeaderContent, HeaderPhoto } from "../../components/HeaderPhoto/HeaderPhoto"
import { ModalTitle } from "../../components/Modal/Modal"
import { TextAccount } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"
import { ButtonLogout, ScrollForm } from "./StyleProfile"
import { userDecodeToken } from "../../utils/Auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api, { GetPacient } from "../../services/services"
export const Profile = ({ navigation }) => {

    async function profileLoad() {
        const token = await userDecodeToken();
        // console.log(token)
        setName(token.name)
        setEmail(token.email)

        // Chamando os dados do perfil
        await PatientData(token.token);
    }



    async function PatientData(Token) {
        await api.get(GetPacient, {
            headers: {
                'Authorization': `Bearer ${Token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setGetPatient(response.data);
                // Atualiza o estado com os dados do paciente
            }).catch(error => {
                console.log(error);
            })
    }


    useEffect(() => {
        profileLoad();
    }, [])

    async function profileLogout(token) {
        try {
            const token = await userDecodeToken();
            await AsyncStorage.removeItem("token", navigation.replace("Login"))
            // await AsyncStorage.getItem("token", console.log(token) )
        } catch (error) {
            console.log(error)
        }
    }

    const [name, setName] = useState("")
    const [date, setDate] = useState("")
    const [email, setEmail] = useState("")
    const [getPatient, setGetPatient] = useState([])


    // Função para formatar CPF com pontos
    const formatarCPF = (cpf) => {
        return cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
    };
    const formatarCEP = (cep) => {
        if (cep) {
            return cep.substring(0, 5) + '-' + cep.substring(5);
        } else {
            return 'CEP inválido';
        }
    };
    return (

        <Container>
            <HeaderContainer>
                <HeaderPhoto source={require("../../assets/PhotoProfile.png")} />
            </HeaderContainer>

            <ModalTitle>
                <Title>{name}</Title>
                <TextAccount>{email}</TextAccount>
            </ModalTitle>

            <ScrollForm>

                <BoxInput
                    textLabel={"Data de Nascimento"}
                    // Use a função formatarData para exibir a data no formato desejado
                    placeholder={new Date(getPatient.dataNascimento).toLocaleDateString()} />
                <BoxInput
                    textLabel={"CPF"}
                    placeholder={formatarCPF(getPatient.cpf)}
                />

                <BoxInput
                    textLabel={"Endereco"}
                    placeholder={getPatient.endereco.logradouro}
                />

                <DoubleView>
                    <BoxInput
                        fieldWidth={40}
                        textLabel={"CEP"}
                        placeholder={formatarCEP(getPatient.endereco.cep)}
                    />
                    <BoxInput
                        fieldWidth={40}
                        textLabel={"Cidade"}
                        placeholder={"Brazolas"}
                    />
                </DoubleView>

                <InputContainer>
                    <Button>
                        <ButtonTitle>Salvar</ButtonTitle>
                    </Button>

                </InputContainer>

                <ButtonLogout onPress={() => { profileLogout() }}>
                    <ButtonTitle>SAIR DO APP</ButtonTitle>
                </ButtonLogout>

            </ScrollForm>
        </Container>

    )
}