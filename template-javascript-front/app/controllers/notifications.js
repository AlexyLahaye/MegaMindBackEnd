import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js"
import MyModelNotification from "../model/notificationsmodel.js";

class notifController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost()
        this.modelProfil = new MyModelProfil()
        this.modelNotif = new MyModelNotification()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));

        this.showAllNotifs()
    }

    checkNotifs = async (id_notification) => {
        const uneNotif = await this.modelNotif.getNotifById(id_notification)
        uneNotif.is_check_notification = true
        console.log(uneNotif)
        await this.modelNotif.updateNotif(uneNotif)
    }

    showAllNotifs = async () => {
        const id_profil = sessionStorage.getItem("tokenProfil")
        const Profil = await this.modelProfil.getProfilByIdProfil(id_profil)
        console.log(Profil)
        const allNotifs = await this.modelNotif.getAllNotif(Profil[0].id_profil)

        if(allNotifs.length > 0){
            for (let uneNotif of allNotifs){
                // Conversion de la date pour un affichage compact
                const createdAt = new Date(uneNotif.createdAt);
                const currentDate = new Date();

                const diffInMillis = currentDate - createdAt;
                const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
                const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
                const diffInDays = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
                const diffInMonths = Math.floor(diffInDays / 30);
                const diffInYears = Math.floor(diffInDays / 365);


                let dateDiff = '';
                if (diffInMinutes < 1) {
                    dateDiff = "À l'instant";
                } else if (diffInHours < 1) {
                    dateDiff = `Il y a ${diffInMinutes} minutes`;
                } else if (diffInDays < 1) {
                    dateDiff = `Il y a ${diffInHours} heures`;
                } else if (diffInMonths < 1) {
                    dateDiff = `Il y a ${diffInDays} jours`;
                } else if (diffInYears < 1) {
                    dateDiff = `Il y a ${diffInMonths} mois`;
                } else {
                    dateDiff = `Il y a ${diffInYears} années`;
                }
                if (uneNotif.is_check_notification !== true){
                    document.getElementById("ensmbl_notif").innerHTML +=
                        `
                        <div id='une_notif'>
                            <div id="contenu_notif">${uneNotif.contenu_notification}</div>
                            <div id="date_notif">${dateDiff}</div>
                            <div id="check_notif"><img onclick='notifController.checkNotifs("${uneNotif.id_notification}")' id="img_check" src="./res/img/CheckLogo.png"></div>
                        </div>
                        `
                }else{
                    document.getElementById("ensmbl_notif").innerHTML +=
                        `
                        <div id='une_notifChkd'>
                            <div id="contenu_notif">${uneNotif.contenu_notification}</div>
                            <div id="date_notif">${dateDiff}</div>
                            <div id="check_notif"><img id="img_check" src="./res/img/CheckLogo2.png"></div>
                        </div>
                        `
                }

            }

        }else{
            document.getElementById("ensmbl_notif").innerHTML = "Vous n'avez aucune notification pour le moment."
        }
    }

}

export default () => window.notifController = new notifController()