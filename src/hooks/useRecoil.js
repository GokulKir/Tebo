import { atom } from "recoil"


const useRecoil = () => {

    const Backid = atom({
        key: "Backid",
        default: null
    })

    return {
        Backid
    }

}

export default useRecoil