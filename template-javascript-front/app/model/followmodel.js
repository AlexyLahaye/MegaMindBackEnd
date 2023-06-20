import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();
    }
    creaFollow = async (id_profil, id_profil_suivi) => {
        try{
            const data = {
                "id_profil": id_profil,
                "id_profil_suivi": id_profil_suivi
            }
            return await this.MegaMindAPI.creaFollow(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    deleteFollow = async (id_profil, id_profil_suivi) =>{
        try{
            const data = {
                "id_profil": id_profil,
                "id_profil_suivi": id_profil_suivi
            }
            return await this.MegaMindAPI.deleteFollow(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    getNbOfFollowFromIdProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getNbOfFollowFromIdProfil(id_profil)
        }
        catch (e){
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }
    getNbOfFollowingFromIdProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getNbOfFollowingFromIdProfil(id_profil)
        }
        catch (e){
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }
    getAllOfFollowFromIdProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getAllOfFollowFromIdProfil(id_profil)
        }
        catch (e){
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }
    getAllOfFollowingFromIdProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getAllOfFollowingFromIdProfil(id_profil)
        }
        catch (e){
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    isFollowed = async (id_profil, id_profil_suivi) => {
        try{
            return await this.MegaMindAPI.isFollowed(id_profil,id_profil_suivi)
        }
        catch (e){
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }
}