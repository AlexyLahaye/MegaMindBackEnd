import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js";

class profilController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost()
        this.modelProfil = new MyModelProfil()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.getAllPostFromIdProfil(sessionStorage.getItem("tokenProfil"));
    }

    getAllPostFromIdProfil = async (id_profil) => {
        try {
            const Profil = await this.modelProfil.getProfilByIdProfil(id_profil)
            document.getElementById("MegaMind").innerHTML =
                `<div id=entete-P> Profil
                    <div id='entete-Banner_Perso'>
                        <img id='imgB_profil'>
                    </div>
                    <div id=entete_text-P>
                        <img id='imgP_profil' width=60px src='res/img/profilLogo.png'>${Profil[0].pseudo_profil}
                    </div>
                    <div id=stat_abo>
                        <div id=NbAbonnements onclick=''>0 Abonnements</div>
                        <div id=NbAbonnes onclick=''>0 Abonnés</div>
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
        }catch (e){
            console.log(e)
        }
    }
}

export default () => window.profilController = new profilController()