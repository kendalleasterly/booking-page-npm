import {atom} from "recoil"

export const firestoreAtom = atom({
    key: "firestore",
    default: {},
    dangerouslyAllowMutability: true
})

export const authAtom = atom({
    key: "auth",
    default: {},
    dangerouslyAllowMutability: true
})