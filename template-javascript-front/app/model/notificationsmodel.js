import MegaMindAPI from "../services/MegaMindAPI.js";

export default class MyModel {
    constructor() {
        this.MegaMindAPI = new MegaMindAPI();
    }
    creaNotif = async (id_profil_notifier, id_profil_acteur_noctification, contenu_notification, id_type_notification) => {
        try{
            const data = {
                "id_profil_notifier": id_profil_notifier,
                "id_profil_acteur_noctification": id_profil_acteur_noctification,
                "contenu_notification":contenu_notification,
                "id_type_notification":id_type_notification,
                "is_check_notification":false
            }
            return await this.MegaMindAPI.creaNotif(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    deleteNotif = async (id_notification) =>{
        try{
            return await this.MegaMindAPI.deleteNotif(id_notification);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    getAllNotif = async (id_profil) => {
        try{
            return await this.MegaMindAPI.getAllNotif(id_profil);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    getNotifById = async (id_notification) => {
        try{
            return await this.MegaMindAPI.getNotifById(id_notification);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

    updateNotif = async (data) => {
        try{
            return await this.MegaMindAPI.updateNotif(data);
        }
        catch (e) {
            console.log(e)
            console.log("Na pas marcher");
            return undefined;
        }
    }

}