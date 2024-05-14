import { InputText } from "./StyleInput";
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons'
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import moment from 'moment'; // Adicionando o import do moment

export function InputProfile({
    editable,
    placeholder,

}) {
    return (
        <InputText
            placeholder={placeholder}
            editable={editable}

        />

    )
}



export const InputSelect = ({ setHoraSelecionada }) => {

    const dataAtual = moment().format("YYYY-MM-DD")

    const [arrayOptions, setArrayOptions] = useState(null)

    function LoadOptions() {

        const horasRestantes = moment(dataAtual).add(24, 'hours').diff(moment(), 'hours')
        console.log("Aqui as Horas");
        console.log(horasRestantes);

        const options = Array.from({ length: horasRestantes },( _, index ) => {
            let valor = new Date().getHours() + (index + 1)
            return {
                label: `${valor}:00`, value: `${valor}:00`
            }
        })

        setArrayOptions( options )
    }


    useEffect(() => {
        LoadOptions()
    }, [])


    return (
        <View style={pickerSelectStyles.container}>
            {
                arrayOptions != null
                    ? (
                        <RNPickerSelect

                            placeholder={{
                                label: "Selecionar horário",
                                value: null,
                                color: '#34898F',
                            }}
                            useNativeAndroidPickerStyle={false}
                            enableSwipeMonths
                            style={pickerSelectStyles}
                            onValueChange={(value) => setHoraSelecionada(value)}
                            items={arrayOptions}
                            Icon={() => {
                                return <AntDesign name="caretdown" size={24} color="#60BFC5" style={pickerSelectStyles.icon} />;
                            }}
                            
                        />
                    )

                    : 

                    <ActivityIndicator
                    size="small"  // Pode ser 'small', 'large' ou um número para o tamanho personalizado
                    color="#60BFC5"  // Cor do indicador
                    style={pickerSelectStyles.activityIndicator}  
                    />
            }
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    
    inputAndroid: {
        width: 327,
        height: 53,
        borderColor: '#60BFC5',
        borderWidth: 2,
        borderRadius: 5,
        fontFamily: 'MontserratAlternates_600SemiBold',
        fontSize: 14,
        padding: 16,
        display: "flex",

        marginBottom: 42,
        marginTop: 10,

    },
    inputIOS: {
        height: 53,
        width: "100%",
        borderColor: '#60BFC5',
        borderWidth: 2,
        borderRadius: 5,
        fontFamily: 'MontserratAlternates_600SemiBold',
        fontSize: 14,
        padding: 16,
        marginBottom: 42,


    },
    container: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    icon: {
        right: 16,
        top: 22,
    },
    placeholder: {
        marginTop: 10,
        color: "#34898F"
    },
    activityIndicator: {
        marginTop: 30,  
    },
});