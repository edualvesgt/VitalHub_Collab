import { InputText } from "./StyleInput";
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign } from '@expo/vector-icons'


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



export const InputSelect = () => {
    return (
        <View style={pickerSelectStyles.container}>
            <RNPickerSelect

                placeholder={{
                    label: "Selecionar horário",
                    value: null,
                    color: '#34898F',
                }}
                useNativeAndroidPickerStyle={false}
                enableSwipeMonths
                style={pickerSelectStyles}

                Icon={() => {
                    return <AntDesign name="caretdown" size={24} color="#60BFC5" style={pickerSelectStyles.icon} />;
                }}
                items={[
                    { label: '16h30m', value: 'hour1' },
                    { label: '12h', value: 'hour2' },
                    { label: '08h30m', value: 'hour3' }
                ]}
            />
        </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 53,
        borderColor: '#60BFC5',
        borderWidth: 2,
        borderRadius: 5,
        fontFamily: 'MontserratAlternates_600SemiBold',
        fontSize: 14,
        padding: 16,
        marginBottom:42,


    },
    container: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: 16,
        top: 22,
    },
    placeholder: {
        marginTop:10,
        color: "#34898F"
    }
});