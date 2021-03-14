import {atom} from "recoil"

export const chooseSignInStepAtom = atom({
    key: "chooseSignInStep",
    default: 0
})

export const bookingSelectedDayAtom = atom({
    key: "bookingSelectedDay",
    default: ""
})