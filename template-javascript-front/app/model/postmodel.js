import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        // data-oriented service instanciations (ex: API)
        this.MegaMindAPI = new MegaMindAPI();

    }

    creaPost = async (data) => {
        console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        try{
            return await this.MegaMindAPI.creaPost(data);
        }
        catch (e) {
            console.log(e)
            return undefined;
        }
    }

    getAllPostOfFollowedProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getAllPostOfFollowedProfil(id_profil);
        }
        catch (e) {
            console.log("Il n'y a pas de posts a afficher");
            return undefined;
        }
    }

    getAllPostFromIdProfil = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getAllPostFromIdProfil(id_profil);
        }
        catch (e) {
            console.log("Il n'y a pas de posts a afficher");
            return undefined;
        }
    }

    getMostComPosts = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getMostComPosts();
        }
        catch (e) {
            console.log("Il n'y a pas de posts a afficher");
            return undefined;
        }
    }

    getMostLikedPosts = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getMostLikedPosts();
        }
        catch (e) {
            console.log("Il n'y a pas de posts a afficher");
            return undefined;
        }
    }
}