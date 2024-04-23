import { BoxInput } from "../../components/BoxInput/BoxInput"
import { Container, DoubleView } from "../../components/Container/StyleContainer"
import { LinkCancel } from "../../components/Links/StyleLink"
import { TextAppointment } from "../../components/Text/Text"
import { Title } from "../../components/Title/StyleTitle"


import Map from "../../components/Map/Map"
import { useEffect, useState } from "react"
import api from "../../services/services"
import { ActivityIndicator } from "react-native"

export const LocalClinic = ({ navigation, route }) => {
    const [clinica, setClinica] = useState(null)
    useEffect(() => {
        BuscarClinica();
    }, [route.params])

    async function BuscarClinica() {
        console.log(route.params.clinica);
        await api.get(`/Clinica/BuscarPorId?id=${route.params.clinica}`)
            .then(response => {
                setClinica(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }



    return (

        (
            clinica != null ? (
                <>
                    <Map latitudeFinal={clinica.endereco.latitude} longitudeFinal={clinica.endereco.longitude}/>

                    <Container>


                        <Title style={{ marginTop: 30 }}>{clinica.nomeFantasia} </Title>
                        <TextAppointment>{clinica.endereco.cidade}</TextAppointment>

                        <BoxInput
                            textLabel={"Endereco"}
                            placeholder={`${clinica.endereco.logradouro}`}
                        />
                        <DoubleView>

                            <BoxInput

                                fieldWidth={40}
                                placeholder={`${clinica.endereco.numero}`}
                                textLabel={"Numero"}
                            />
                            <BoxInput
                                fieldWidth={40}
                                placeholder={`${clinica.endereco.cidade}`}
                                textLabel={"Cidade"} />

                        </DoubleView>

                        <LinkCancel style={{ marginTop: 50 }} onPress={() => navigation.replace("Home")}>Voltar</LinkCancel>
                    </Container>
                </>
            ) : (<ActivityIndicator />)
        )
    )
}

