import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();
    }
    creaLike = async (id_post, id_profil, id_etat_like) => {
        try{
            const data = {
                "id_contenu_like": id_post,
                "id_profil_like": id_profil,
                "id_etat_like":id_etat_like
            }
            return await this.MegaMindAPI.creaLike(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    deleteLike = async (id_post, id_profil, id_etat_like) =>{
        try{
            const data = {
                "id_contenu_like": id_post,
                "id_profil_like": id_profil,
                "id_etat_like":id_etat_like
            }
            return await this.MegaMindAPI.deleteLike(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }
}