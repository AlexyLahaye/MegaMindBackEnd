import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        // data-oriented service instanciations (ex: API)
        this.MegaMindAPI = new MegaMindAPI();

    }

    getUsers = async () => {
        try{
            return await this.MegaMindAPI.getUsers();
        }
        catch{
            return undefined;
        }
    }

    getOneUser = async (label_user) => {
        try{
            console.log(label_user);
            return await this.MegaMindAPI.getOneUser(label_user);
        }
        catch{
            return undefined;
        }
    }

    authUser =  async (label_user, mdp_user) => {
        try{
            return await this.MegaMindAPI.authUser(label_user, mdp_user);
        }
        catch (e){
            return undefined;
        }
    }

    creaUser =  async (label_user, mdp_user) => {
        return await this.MegaMindAPI.creaUser(label_user, mdp_user);
    }

}