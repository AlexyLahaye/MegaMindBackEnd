import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js";
import MyModelCommentaire from "../model/commentairemodel.js";
class postController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost();
        this.modelProfil = new MyModelProfil();
        this.modelCommentaire = new MyModelCommentaire();
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.showPostPage();
    }

    creaCom = async () => {
        const data = {
            "id_post_com": sessionStorage.getItem("tokenPost"),
            "id_profil_com": sessionStorage.getItem("tokenProfil"),
            "contenu_com": document.getElementById("Rpd_geny").value,
            "sensibilite_com": 0
        }
        try {
            await this.modelCommentaire.creaCom(data)
            document.getElementById("txt_signal").innerHTML = "Le commentaire à bien été créé."
            document.getElementById("contenu_post").innerHTML = ""
            await this.showPosts()
        }catch (e){
            //Gestion d'affichage pour l'utilisateur ex:Vous n'avez pas renseigné de message ect.
            console.log(e)
        }
    }

    showPosts = async () => {
        // Affiche s'il y en a les commentaires sous le post
        const commentaires = await this.modelCommentaire.getAllComFromIdPost(sessionStorage.getItem("tokenPost"))
        let showCom = ""
        if (commentaires[0].length !== 0){
            let cpt = 1
            for(const unCom of commentaires[0]){
                const Profil = await this.modelProfil.getProfilByIdProfil(unCom.id_profil_com)

                // Conversion de la date pour un affichage compact
                const createdAt = new Date(unCom.createdAt);
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

                document.getElementById("contenu_post").innerHTML +=
                    `<div class=un_post>
                            <div id=un_post-entete>
                                <div id='img_profil-entete'>
                                    <img onclick='sessionStorage.setItem("tokenProfilClicked", "${Profil[0].id_profil}");navigate("profil")' class="p_profil" id=p_profil${cpt} width=40px src='res/img/profilLogo.png'>
                                </div>
                                <div id='txt-entete'>${Profil[0].pseudo_profil}
                                    <div id=date_post>${dateDiff}</div>
                                </div>
                                <div id=param_post>
                                    <img id='param_post-Logo' onclick='' src='res/img/ParametreLogo.png'>
                                </div>
                            </div>
                            <div id=click_post>
                                <div id=post_contenu>${unCom.contenu_com}</div>
                            </div>`;
                const avatar_profil = Profil[0].avatar_profil
                if (avatar_profil !== ""){
                    document.getElementById(`p_profil${cpt}`).src = avatar_profil
                }
                cpt ++
            }
        } else {
            document.getElementById("contenu_post").innerHTML +=  "Il n'y a aucun commentaire sous ce post pour le moment."
        }
    }


    showPostPage = async () => {
        try {
            const lePost = await this.modelPost.getPostById(sessionStorage.getItem("tokenPost"))
            let tabPosts = []
            tabPosts.push(lePost)

            // Affiche le post selectionné
            await this.composePost(tabPosts, "contenus")

            // J'affiche le "Formulaire" pour envoyé un message sous le post selectionné
            document.getElementById("contenus").innerHTML +=
                `<div id="add_com">
                    <textarea id="Rpd_geny" placeholder="Repondre avec un commentaire"></textarea>
                    <buttonAdd onclick="postController.creaCom()" id="btn_add_com">Envoyer</buttonAdd>
                </div>
                <div id="txt_signal"></div>
                <div id="contenu_post"></div>`

            await this.showPosts()

        }catch(e){
            console.log(e)
        }
    }



}

export default () => window.postController = new postController()