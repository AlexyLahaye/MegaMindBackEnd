import BaseController from "./basecontroller.js";
import MyModel from "../model/postmodel.js";
import MyModelP from "../model/profilsmodel.js";

class accueilController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.modelP = new MyModelP()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.getAllPostOfFollowedProfil(sessionStorage.getItem("tokenProfil"));
    }


    getAllPostOfFollowedProfil = async (id_profil) => {
        try {
            const tabPosts = await this.model.getAllPostOfFollowedProfil(sessionStorage.getItem("tokenProfil"))
            for(let unPost of tabPosts[0]){
                const Profil = await this.modelP.getProfilByIdProfil(unPost.id_profil)
                let isliKed = "";

                // Vérification si l'utilisateur à déja like le post.
                if (unPost.isLiked !== true){
                    isliKed = "<div id=bt_like><img id=btlike src='../res/img/Likelogo1.png'></div>"
                } else {
                    isliKed = "<div id=bt_like><img id=btlike src='../res/img/Likelogo21.png'></div>"
                }

                // Conversion de la date pour un affichage compact
                const createdAt = new Date(unPost.createdAt);
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


                const avatar_profil = Profil[0].avatar_profil
                if (avatar_profil === ""){
                    document.getElementById("p_profil").src = avatar_profil
                }

                document.getElementById("contenus").innerHTML +=
                    `<div class=un_post id='un_post-$id_post'>
                        <div id=un_post-entete><div id='img_profil-entete'>
                            <img onclick='' id=p_profil width=40px src='../res/img/profilLogo.png'>
                        </div>
                        <div id='txt-entete'>${Profil[0].pseudo_profil}
                            <div id=date_post>${dateDiff}</div>
                        </div>
                        <div id='param_post-hidden${unPost.id_post}'></div>
                        <div id=param_post>
                            <img id='param_post-Logo' onclick='' src='../res/img/ParametreLogo.png'>
                        </div>
                    </div>
                    <div id=click_post onclick=''>
                        <div id=post_contenu>${unPost.contenu_post}</div>
                    </div>
                    <div id=un_post-conclusion>
                        <div id=fond_post>
                            <div id=com onclick=''>
                                <div id=bt_com><img id=btcom src='../res/img/MessageLogo2.png'></div>
                                <div id=nb_com>0</div>
                            </div>
                        <div id=like><div id=btlike>
                            ${isliKed}
                            <div id='btlike${unPost.id_post}'></div>
                        </div>
                        <div id=nb_like>${unPost.nbLike}</div>
                    </div>
                    </div>
                    <input type=hidden value=${unPost.id_post}></input></input></div></div>`;
            }
            if (tabPosts[0].length === 0){
                document.getElementById("contenus").innerHTML +=
                    `Vous devez suivre des utilisateurs pour avoir un visuel sur leurs poste, nous vous invitont a vous rendre dans l'onglet explorer ou à rechercher des utilisateurs avec la barre de recherche.`;
            }
        }catch (e){
            console.log(e)
        }
    }
}

export default () => window.acceuilController = new accueilController()