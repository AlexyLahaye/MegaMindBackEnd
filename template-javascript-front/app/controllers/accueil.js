import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js";

class accueilController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost();
        this.modelProfil = new MyModelProfil();
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.getAllPostOfFollowedProfil(sessionStorage.getItem("tokenProfil"));
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