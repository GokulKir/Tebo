import { atom , selector } from "recoil";

export const UIDSTORING = atom({
    key: "UIDSTORING",
    default:null
})


export const CONFIRMPOPUP = atom({
    key:"CONFIRMPOPUP",
    default:null
})


export const userState = atom({
  key: 'userState',
  default:  null,
});

export const isLoggedInState = selector({
  key: 'isLoggedInState',
  get: ({ get }) => {
    const user = get(userState);
    return user !== null;
  },
});

export const logoutState = atom({
  key: 'logoutState',
  default: false,
});