import { BlueButton, BlueButtonTitle, WhiteButton, WhiteButtonTitle } from "../Button/Button"


export const ButtonFilter = ({selected = false, buttonTitle, onPress=null}) => {
    return(
        <>
            {selected ? 
            <BlueButton onPress={onPress}><BlueButtonTitle>{buttonTitle}</BlueButtonTitle></BlueButton>
            :
            <WhiteButton onPress={onPress}><WhiteButtonTitle>{buttonTitle}</WhiteButtonTitle></WhiteButton>
            }
        </>
    )
}