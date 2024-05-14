import { Image, Platform } from "react-native"
import { InputForm, InputProfile } from "../Input/StyleInput"
import { Label } from "../Label/Label"
import { FieldContent } from "./StyleBox"

export const BoxInput = ({ textLabel, placeholder, fieldWidth = 90, editable = false ,value,onChangeText , keyboardType , maxLength }) => {

    return (

        <FieldContent fieldWidth={fieldWidth} >
            <Label textLabel={textLabel} />

            <InputProfile

                editable={editable}
                placeholder={placeholder}
                value = {value}
                onChangeText = {onChangeText}
                maxLength = {maxLength}
                keyboardType = {keyboardType}
            />
        </FieldContent>
    )
}



export const BoxInputForm = ({ textLabel, placeholder, fieldWidth = 90, fieldHeigth, editable = false , value,onChangeText , keyboardType , maxLength , type }) => {
    return (
        <FieldContent fieldWidth={fieldWidth}>
            <Label textLabel={textLabel} />

            <InputForm
                editable={editable}
                fieldHeigth={fieldHeigth}
                placeholder={placeholder}
                value = {value}
                type = {type}
                onChangeText = {onChangeText}
                maxLength = {maxLength}
                keyboardType = {keyboardType}
            />
        </FieldContent>
    )
}
export const BoxInputCreate = ({ textLabel, placeholder, fieldWidth = 90, fieldHeigth, editable = false , onChangeText , value }) => {
    return (
        <FieldContent style={{ alignItems: 'flex-start', width: '100%', backgroundColor: 'white' }}>
            <Label

                textLabel={textLabel} />

            <InputForm
                style={{ fontSize: 16, marginTop: 10, marginBottom: Platform.OS == "ios" ? 200 : 150  , backgroundColor: 'white' }}
                editable={editable}
                fieldHeigth={fieldHeigth}
                placeholder={placeholder}
                onChangeText = { onChangeText}
                value = {value}
            />
        </FieldContent>
    )
}

export const BoxInputPhoto = ({ textLabel, placeholder, fieldWidth = 90, fieldHeigth, editable = false, source, uriPhotoForm }) => {
    return (
        <FieldContent fieldWidth={fieldWidth}>
            <Label textLabel={textLabel} />

            {
                uriPhotoForm != null ?
                    (
                        <Image style={{ height: 120, width: "100%", borderRadius: 5 }} source={source} />
                    )
                    :
                    (
                        <InputForm
                            editable={editable}
                            fieldHeigth={fieldHeigth}
                            placeholder={placeholder}
                        />
                    )

            }




        </FieldContent>
    )
}


