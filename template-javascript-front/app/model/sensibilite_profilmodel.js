import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();

    }
    CreaSensiProfil = async (data) => {
        try{
            return await this.MegaMindAPI.CreaSensiProfil(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    updateSensiProfil = async (data) => {
        try{
            return await this.MegaMindAPI.updateSensiProfil(data);
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
            return undefined;
        }
    }
}