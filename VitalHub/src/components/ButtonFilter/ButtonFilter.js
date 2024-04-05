import { BlueButton, BlueButtonTitle } from "../Button/Button"


export const ButtonFilter = ({ clickButton, selected, buttonTitle, onPress = null }) => {
    return (
        <>

            <BlueButton clickButton={clickButton} selected={selected} onPress={onPress}><BlueButtonTitle clickButton={clickButton}>{buttonTitle}</BlueButtonTitle></BlueButton>

        </>
    )
}