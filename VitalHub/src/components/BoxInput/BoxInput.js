import { InputForm, InputProfile } from "../Input/StyleInput"
import { Label } from "../Label/Label"
import { FieldContent } from "./StyleBox"

export const BoxInput = ({ textLabel, placeholder, fieldWidth = 90, editable = false  }) => {

    return (
        
        <FieldContent fieldWidth={fieldWidth} >
            <Label textLabel={textLabel} />

            <InputProfile
            
                editable={editable}
                placeholder={placeholder}
            />
        </FieldContent>
    )
}



export const BoxInputForm = ({ textLabel, placeholder, fieldWidth = 90, fieldHeigth, editable = false }) => {
    return (
        <FieldContent fieldWidth={fieldWidth}>
            <Label textLabel={textLabel} />

            <InputForm
                editable={editable}
                fieldHeigth={fieldHeigth}
                placeholder={placeholder}
            />
        </FieldContent>
    )
}
export const BoxInputCreate = ({ textLabel, placeholder, fieldWidth = 90, fieldHeigth, editable = false }) => {
    return (
        <FieldContent style={{ alignItems: 'flex-start', width: '100%', backgroundColor: 'white' }}>
            <Label 
            
            textLabel={textLabel} />

            <InputForm
                style={{ fontSize: 16, marginTop: 10 , marginBottom: 200 ,backgroundColor: 'white'}}
                editable={editable}
                fieldHeigth={fieldHeigth}
                placeholder={placeholder}
            />
        </FieldContent>
    )
}

export const BoxInputPhoto = ({ textLabel, placeholder, fieldWidth = 90, fieldHeigth, editable = false }) => {
    return (
        <FieldContent fieldWidth={fieldWidth}>
            <Label textLabel={textLabel} />

            <InputForm
                editable={editable}
                fieldHeigth={fieldHeigth}
                placeholder={placeholder}
            />
        </FieldContent>
    )
}


