import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();

    }
    creaCom = async (data) => {
        try{
            return await this.MegaMindAPI.creaCom(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    getAllComFromIdPost = async (id_post) => {
        try{
            return await this.MegaMindAPI.getAllComFromIdPost(id_post);
        }
        catch{
            console.log("Il n'y a pas de commentaire pour ce post");
            return undefined;
        }
    }
}