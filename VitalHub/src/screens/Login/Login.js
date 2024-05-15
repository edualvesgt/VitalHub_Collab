import { LinkMedium, TextLink } from "../../components/Links/StyleLink";
import { Button, ButtonGoogle, ButtonTitle, ButtonTitleGoogle } from "../../components/Button/Button";
import { Container } from "../../components/Container/StyleContainer";
import { ContentAccount } from "../../components/ContentAccount/StyleContentAccount";
import { Input } from "../../components/Input/StyleInput";
import { GoogleLogo, Logo } from "../../components/Logo/StyleLogo";
import { TextAccount } from "../../components/Text/Text";
import { Title } from "../../components/Title/StyleTitle";
import { useEffect, useState } from "react";
import api, { LoginResorce } from "../../services/services";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDecodeToken } from "../../utils/Auth";
import { ActivityIndicator, Text } from 'react-native';

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("eduardo.silva@gmail.com");
    const [senha, setSenha] = useState("eduardo.silva@gmail.com");
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Estado para armazenar mensagens de erro

    // Função para validar os campos antes do envio
    const validateFields = () => {
        if (!email || !senha) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return false;
        }
        return true;
    };
    async function Login() {
        if (!validateFields()) {
            return; // Se os campos não forem válidos, interrompe a função
        }
    
        setLoading(true);
        setDisabled(true);
    
        try {
            const response = await api.post('/Login', {
                email: 'eduardo.silva@gmail.com',
                senha: 'eduardo.silva@gmail.com'
                // email: 'gabriel.victor@gmail.com',
                // senha: 'gabriel.victor@gmail.com'
            })


            await AsyncStorage.setItem("token", JSON.stringify(response.data))
            // console.log(response);
            navigation.replace("Main")
        } catch (error) {
            console.log(error);
            // Verifica se o erro é devido a um status 401
            if (error.response && error.response.status === 401) {
                setErrorMessage("Email ou senha incorretos.");
            } else {
                setErrorMessage("Erro ao tentar entrar.");
            }
            setDisabled(false);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        // Limpa a mensagem de erro quando o componente é montado
        setErrorMessage("");
    }, []);

    return (
        <Container>
            
            <Logo source={require("../../assets/VitalHub_LogoAzul.png")} />
            <Title>Entrar ou Criar Conta</Title>
            <Input
                placeholder={"Usuario ou Email"}
                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />
            <Input
                placeholder={"Senha"}
                secureTextEntry={true}
                value={senha}
                onChangeText={(txt) => setSenha(txt)}
            />
            <TextAccount>{errorMessage && <Text style={{ color: 'red', margin: 10 }}>{errorMessage}</Text>}</TextAccount>

            <LinkMedium onPress={() => navigation.navigate('ForgotPassword')}>Esqueceu Sua Senha?</LinkMedium>

            <Button onPress={() => { Login() }} disabled={disabled}>
                <ButtonTitle> {loading ? <ActivityIndicator size="small" color="#ffffff" /> : "Entrar"}</ButtonTitle>
            </Button>

            {/* <ButtonGoogle>
                <GoogleLogo source={require('../../assets/GOOGLE.png')} />
                <ButtonTitleGoogle> Login with Google</ButtonTitleGoogle>
            </ButtonGoogle> */}

            <ContentAccount>
                <TextAccount>Não tem conta?
                    <TextLink onPress={() => navigation.navigate('CreateAccount')}>Crie uma conta agora!</TextLink> </TextAccount>
            </ContentAccount>
        </Container>
    )
}
