import { useEffect, useState } from "react"
import CardDoctor from "../../components/CardDoctor/CardDoctor"
import { ContainerClinic, FlatListClinic } from "../../components/Container/StyleContainer"
import { Title } from "../../components/Title/StyleTitle"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Links/StyleLink"
import api from "../../services/services"

export const ChooseDoctor = ({ navigation, route  }) => {

    const [select, setSelected] = useState('')
    const [medic, setMedic] = useState()
 
    const [listDoctor, setListDoctor] = useState([])

    async function ListDoctors() {
        //Instanciar A chamada da Api

        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`)
            .then(response => {
                setListDoctor(response.data)

                console.log("oiiiii");
                console.log(response.data);

            }).catch(error => {
                console.log(error);
            })
    }

    function handleSelect(doctor) {
        setSelected(doctor.idNavigation.nome)
        setMedic({
            medicoClinicaId: doctor.id,
            medicoLabel: doctor.idNavigation.nome
            
        })
    }

    function handleConfirm() {
        navigation.navigate('ChooseData', {
            agendamento:{
                ...route.params.agendamento, 
                ...medic
            }
        })
    }
    useEffect(() => {
        ListDoctors()
     
    }, [])

    return (
        <ContainerClinic>
            <Title>Selecionar Medico</Title>

            <FlatListClinic
                data={listDoctor}
                keyExtractor={(item) => item.id}
                renderItem={ ({ item }) => (
                    <CardDoctor
                        select={select}
                        onPress={() =>  handleSelect(item)}
                        name={item.idNavigation.nome}
                        field={item.especialidade.especialidade1}
                        imageLink = {item.idNavigation.foto}
                    />
                )}
            />


            <Button onPress={() => handleConfirm()}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>
            <LinkCancel onPress={() => navigation.navigate('Main')}> Cancelar </LinkCancel>

        </ContainerClinic>
    )
} 