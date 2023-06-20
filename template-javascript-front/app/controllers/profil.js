import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js";
import MyModelFollow from "../model/followmodel.js";
import MyModelNotification from "../model/notificationsmodel.js";

class profilController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost()
        this.modelProfil = new MyModelProfil()
        this.modelFollow = new MyModelFollow()
        this.modelNotification = new MyModelNotification()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.getAllPostFromIdProfil();
    }

    creaFollow = async (id_profil_user, id_profil) => {
        await this.modelFollow.creaFollow(id_profil_user, id_profil)
        document.getElementById("button_abo").innerHTML = `<div id="button_abo"><div onclick="profilController.deleteFollow('${id_profil_user}', '${id_profil}')">unfollow</div></div>`
        const allNotifProfil = await this.modelNotification.getAllNotif(id_profil)
        const Profil = await this.modelProfil.getProfilByIdProfil(id_profil_user)
        if (allNotifProfil.length === 0){
            await this.modelNotification.creaNotif(`${id_profil}`,`${id_profil_user}`,`${Profil[0].pseudo_profil} vous a follow`,2)
        }else{
            for (let uneNotif of allNotifProfil){
                // Vérification des notification existantes
                if(uneNotif.is_check_notification === false){
                    if(uneNotif.id_profil_acteur_noctification === id_profil_user && uneNotif.id_type_notification !== 2){
                        await this.modelNotification.creaNotif(`${id_profil}`,`${id_profil_user}`,`${Profil[0].pseudo_profil} vous a follow`,2)
                    }
                }
                else{
                    if(uneNotif.is_check_notification === true && uneNotif.id_type_notification === 2){
                        await this.modelNotification.creaNotif(`${id_profil}`,`${id_profil_user}`,`${Profil[0].pseudo_profil} vous a follow`,2)
                    }
                }
            }
        }
        this.getAllPostFromIdProfil()
    }

    deleteFollow = async (id_profil_user, id_profil) => {
        await this.modelFollow.deleteFollow(id_profil_user, id_profil)
        document.getElementById("button_abo").innerHTML = `<div id="button_abo"><div onclick="profilController.creaFollow('${id_profil_user}', '${id_profil}')">follow</div></div>`
        this.getAllPostFromIdProfil()
    }

    getAllPostFromIdProfil = async () => {
        try {
            let Profil =""
            let id_profil = ""
            if (sessionStorage.getItem("tokenProfilClicked")){
                Profil = await this.modelProfil.getProfilByIdProfil(sessionStorage.getItem("tokenProfilClicked"))
                id_profil = sessionStorage.getItem("tokenProfilClicked")
                sessionStorage.removeItem("tokenProfilClicked")
            }else {
                Profil = await this.modelProfil.getProfilByIdProfil(sessionStorage.getItem("tokenProfil"))
                id_profil = sessionStorage.getItem("tokenProfil")
            }
            const responseReqFollow = await this.modelFollow.getNbOfFollowFromIdProfil(id_profil)
            const nbFollow = responseReqFollow.nbAllFollowFromProfil;
            const responseReqFollowing = await this.modelFollow.getNbOfFollowingFromIdProfil(id_profil)
            const nbFollowing = responseReqFollowing.nbAllFollowingFromProfil;
            document.getElementById("MegaMind_contenu").innerHTML =
                `<div id=entete-P> Profil
                    <div id='entete-Banner_Perso'>
                        <img id='imgB_profil'>
                    </div>
                    <div id=entete_text-P>
                        <img id='imgP_profil' width=60px src='res/img/profilLogo.png'>${Profil[0].pseudo_profil}
                    </div>
                    <div id="stat_abo">
                        <div id=NbAbonnements onclick='navigate("abonnements"); sessionStorage.setItem("tokenProfilInspected", "${id_profil}")'>${nbFollow} Abonnements</div>
                        <div id=NbAbonnes onclick='navigate("abonnes"); sessionStorage.setItem("tokenProfilInspected", "${id_profil}") '>${nbFollowing} Abonnés</div>
                    </div>
                </div>
                <div id=contenus-P><div id='txtAddPost'></div>`;
            const avatar_profil = Profil[0].avatar_profil
            if (avatar_profil !== ""){
                document.getElementById(`imgP_profil`).src = avatar_profil
            }

            const tabPosts = await this.modelPost.getAllPostFromIdProfil(id_profil);
            await this.composePost(tabPosts, "contenus-P")
            if (tabPosts[0].length === 0){
                document.getElementById("contenus").innerHTML +=
                    `Vous devez suivre des utilisateurs pour avoir un visuel sur leurs poste, nous vous invitont a vous rendre dans l'onglet explorer ou à rechercher des utilisateurs avec la barre de recherche.`;
            }
            if(sessionStorage.getItem("tokenProfil") !== id_profil){
                const id_profil_user = sessionStorage.getItem("tokenProfil")
                const resReqVerifF = await this.modelFollow.isFollowed(id_profil_user, id_profil)
                const verifFollow = resReqVerifF.verifFollow
                let btDisplay = ``
                console.log(verifFollow)
                if(verifFollow !== true){
                    btDisplay = `<div id="btn_abo"><div id="button_abo" onclick="profilController.creaFollow('${id_profil_user}', '${id_profil}')">follow</div></div>`
                } else {
                    btDisplay = `<div id="btn_abo"><div id="button_abo" onclick="profilController.deleteFollow('${id_profil_user}', '${id_profil}')">unfollow</div></div>`
                }
                document.getElementById("stat_abo").innerHTML += btDisplay
            }
        }catch (e){
            console.log(e)
        }
    }
}

export default () => window.profilController = new profilController()