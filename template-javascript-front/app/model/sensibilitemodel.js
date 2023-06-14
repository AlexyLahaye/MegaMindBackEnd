import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();

    }


    getAllSensi = async () => {
        try{
            return await this.MegaMindAPI.getAllSensi();
        }
        catch{
            console.log("Il n'y a pas de sensibilite dans la table sensbilite (c'est pas normal)");
            return undefined;
        }
    }
}