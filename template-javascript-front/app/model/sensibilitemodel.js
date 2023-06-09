import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        // data-oriented service instanciations (ex: API)
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