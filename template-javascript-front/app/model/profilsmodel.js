import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        // data-oriented service instanciations (ex: API)
        this.MegaMindAPI = new MegaMindAPI();

    }

    getProfilByIdProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getProfilByIdProfil(id_profil);
        }
        catch (e) {
            console.log("Il n'y a pas de profil pour cet ID ");
            return undefined;
        }
    }

    getAllProfilsFromIdUser = async (id_user) => {
        try{
            return await this.MegaMindAPI.getAllProfilsFromIdUser(id_user);
        }
        catch (e) {
            console.log("Il n'y a pas de profils pour et utilisateur");
            return undefined;
        }
    }

    creaProfil = async (data) => {
        try{
            return await this.MegaMindAPI.creaProfil(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    delProfil = async (id_profil) => {
        try{
            console.log(id_profil)
            return await this.MegaMindAPI.delProfil(id_profil);
        }
        catch (e) {
            console.log("Na pas marcher");
            return undefined;
        }
    }

    getMostFollowedProfil = async () => {
        try{
            return await this.MegaMindAPI.getMostFollowedProfil();
        }
        catch (e) {
            return e;
        }
    }
}