import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();

    }
    CUSensiProfil = async (data) => {
        try{
            return await this.MegaMindAPI.CUSensiProfil(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    getSensiProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getSensiProfil(id_profil);
        }
        catch{
            console.log("Il n'y a pas de sensibilite profil dans la table sensbilite profil");
            return undefined;
        }
    }
}