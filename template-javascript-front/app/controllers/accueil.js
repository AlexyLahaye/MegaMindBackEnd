import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js";
import MyModelLike from "../model/likemodel.js";
import MyModelNotif from "../model/notificationsmodel.js";
class accueilController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost();
        this.modelProfil = new MyModelProfil();
        this.modelLike = new MyModelLike();
        this.modelNotification = new MyModelNotif()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.likegestion()
        sessionStorage.removeItem("addLike");
        sessionStorage.removeItem("removeLike");
        this.getAllPostOfFollowedProfil(sessionStorage.getItem("tokenProfil"));
    }

    likegestion = async () =>{
        const addLikeStorage = JSON.parse(sessionStorage.getItem("addLike"))
        const removeLikeStorage = JSON.parse(sessionStorage.getItem("removeLike"))

        if (addLikeStorage !== null){
            for (let unAjoutLike of addLikeStorage){
                await this.modelLike.creaLike(unAjoutLike.id_post, unAjoutLike.id_profil, unAjoutLike.id_etat_like)
                const Post = await this.modelPost.getPostById(unAjoutLike.id_post)
                const Profil = await this.modelProfil.getProfilByIdProfil(unAjoutLike.id_profil)
                const allNotifProfil = await this.modelNotification.getAllNotif(Post[0].id_profil)
                if (allNotifProfil.length === 0){
                    await this.modelNotification.creaNotif(`${Post[0].id_profil}`,`${unAjoutLike.id_profil}`,`${Profil[0].pseudo_profil} a like <div onclick='sessionStorage.setItem("tokenPost", "${unAjoutLike.id_post}"); navigate("post")'>votre post</div>`,1)
                }else{
                    for (let uneNotif of allNotifProfil){
                        // Vérification des notification existantes
                        if(uneNotif.is_check_notification === false){
                            if(uneNotif.id_profil_acteur_noctification === unAjoutLike.id_profil && uneNotif.id_type_notification !== 1){
                                await this.modelNotification.creaNotif(`${Post[0].id_profil}`,`${unAjoutLike.id_profil}`,`${Profil[0].pseudo_profil} a like <div onclick='sessionStorage.setItem("tokenPost", "${unAjoutLike.id_post}"); navigate("post")'>votre post</div>`,1)
                            }
                        }else{
                            await this.modelNotification.creaNotif(`${Post[0].id_profil}`,`${unAjoutLike.id_profil}`,`${Profil[0].pseudo_profil} a like <div onclick='sessionStorage.setItem("tokenPost", "${unAjoutLike.id_post}"); navigate("post")'>votre post</div>`,1)
                        }
                    }
                }
            }
        }
        if (removeLikeStorage !== null){
            for (let unDeleteLike of removeLikeStorage){
                await this.modelLike.deleteLike(unDeleteLike.id_post, unDeleteLike.id_profil, unDeleteLike.id_etat_like)
            }
        }

    }

    getAllPostOfFollowedProfil = async () => {
        try {
            const tabPosts = await this.modelPost.getAllPostOfFollowedProfil(sessionStorage.getItem("tokenProfil"))
            await this.composePost(tabPosts, "contenus")
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