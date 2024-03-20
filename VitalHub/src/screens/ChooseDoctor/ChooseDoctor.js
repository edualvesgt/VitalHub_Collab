import { useState } from "react"
import CardDoctor from "../../components/CardDoctor/CardDoctor"
import { ContainerClinic, FlatListClinic } from "../../components/Container/StyleContainer"
import { Title } from "../../components/Title/StyleTitle"
import { Button, ButtonTitle } from "../../components/Button/Button"
import { LinkCancel } from "../../components/Links/StyleLink"

export const ChooseDoctor = ({ navigation }) => {

    const [select, setSelected] = useState('')

    const rawData = [
        {
            name: "Doutor Eduardo ",
            field: "Pediatra"
        },
        {
            name: "Doutor Carlos ",
            field: "Cardiologista"
        },
        {
            name: "Doutora Ana",
            field: "Gine"
        },
        {
            name: "Doutor Pedro  ",
            field: "Geral"
        },
        {
            name: "Doutor Bezerra ",
            field: "Podologo"
        },
        {
            name: "Doutor Sidao  ",
            field: "Ortopedista"
        },
        
    ]
    return (
        <ContainerClinic>
            <Title>Selecionar Medico </Title>

            <FlatListClinic
                data={rawData}
                renderItem={({ item }) =>
                    <CardDoctor
                        select={select}
                        onPress={() => { setSelected(item.name) }}
                        name={item.name}
                        field={item.field}
                    />} />

            <Button onPress={() => navigation.navigate('ChooseData')}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>
            <LinkCancel onPress={() => navigation.navigate('Main')}> Cancelar </LinkCancel>

        </ContainerClinic>
    )
} 