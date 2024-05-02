
import CardClinic from "../../components/CardClinic/CardClinic"
import { ContainerClinic, FlatListClinic } from "../../components/Container/StyleContainer"
import { Title } from "../../components/Title/StyleTitle"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Links/StyleLink"
import { useEffect, useState } from "react"
import api from "../../services/services"

export const ChooseClinic = ({ navigation, route }) => {


    const [listClinic, setListClinic] = useState([])
    const [select, setSelected] = useState('')
    const [clinica, setClinica] = useState(null)

    // Passa a cidade na rota buscar por cidade
    //FAzer a troca
    async function ListClinic() {
        await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`)
            .then(response => {
                setListClinic(response.data)
                console.log("Oiaa a lista das clinicas ");
                console.log(response.data);
            }).catch(error => {
                console.log(error);
                console.log(error.response.data);
            })
    }
    const handleSelectClinic = (clinic) => {
        if (select !== clinic.nomeFantasia) {
            setSelected(clinic.nomeFantasia);
            setClinica({
                clinicaId : clinic.id,
                clinicaLabel : clinic.nomeFantasia,
            });
        } else {
            setSelected('');
            setClinica(null);
        }
    };

    function handleConfirm() {
        navigation.navigate('ChooseDoctor', {
           agendamento : {
            ...route.params.agendamento,
            ...clinica
           }
        })
    }

    useEffect(() => {
        ListClinic();

    }, [])
    return (
        <ContainerClinic>
            <Title>Selecionar Clinica </Title>


            <FlatListClinic
                data={listClinic}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>

                    <CardClinic
                        select={select}
                        onPress={() => { handleSelectClinic(item) }}
                        // review={item.review}
                        location={item.endereco.logradouro}
                        number={item.endereco.numero}
                        name={item.nomeFantasia}
                        time={item.time}
                    />} />

            <Button onPress={() => handleConfirm()}>
                <ButtonTitle >Continuar</ButtonTitle>
            </Button>
            <LinkCancel onPress={() => navigation.navigate('Main')}> Cancelar </LinkCancel>
        </ContainerClinic>
    )
}