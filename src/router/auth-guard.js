import { store } from "../store/store";

let Editors =(to, from, next) => {
    if(store.getters.user){
        next()
    }else{
        next('/login')
    }
};

let Admins =(to, from, next) => {
    if(store.getters.user){
        if(store.getters.user.hasAdmin){
            next()
        }
    }else{
        next('/')
    }
};

export default {
    guardEdit:Editors,
    guardAdmin:Admins
};
