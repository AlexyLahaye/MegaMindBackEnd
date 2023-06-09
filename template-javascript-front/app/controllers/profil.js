import BaseController from "./basecontroller.js";
import MyModel from "../model/postmodel.js";
import MyModelP from "../model/profilsmodel.js";

class profilController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.modelP = new MyModelP()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.getAllPostFromIdProfil(sessionStorage.getItem("tokenProfil"));
    }

    getAllPostFromIdProfil = async (id_profil) => {
        try {
            const Profil = await this.modelP.getProfilByIdProfil(id_profil)
            document.getElementById("MegaMind").innerHTML =
                `<div id=entete-P> Profil
                    <div id='entete-Banner_Perso'>
                        <img id='imgB_profil' src='../res/img_banniere/${id_profil}.png'>
                    </div>
                    <div id=entete_text-P>
                        <img id='imgP_profil' width=60px src='../res/img_profil/${id_profil}.png'>${Profil[0].pseudo_profil}
                    </div>
                    <div id=stat_abo>
                        <div id=NbAbonnements onclick=''>0 Abonnements</div>
                        <div id=NbAbonnes onclick=''>0 Abonnés</div>
                    </div>
                </div>
                <div id=contenus-P><div id='txtAddPost'></div>`;

            const tabPosts = await this.model.getAllPostFromIdProfil(id_profil);

            for(let unPost of tabPosts[0]){
                document.getElementById("contenus-P").innerHTML +=
                    `<div class=un_post id='un_post-${unPost.id_post}'>
                        <div id=un_post-entete><div id='img_profil-entete'>
                            <img onclick='' id=p_profil width=40px src='../res/img_profil/${unPost.id_profil}.png'>
                        </div>
                        <div id='txt-entete'>${Profil[0].pseudo_profil}
                            <div id=date_post>${new Date(unPost.createdAt).toLocaleString()}</div>
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
                        <div id=like>
                        <div id=btlike><img id=btlike src='../res/img/LikeLogo1.png'></div>
                            <div id='btlike${unPost.id_post}'>0</div>
                        </div>
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

export default () => window.profilController = new profilController()