import BaseController from "./basecontroller.js";
import MyModelPost from "../model/postmodel.js";
import MyModelProfil from "../model/profilsmodel.js";

class explorerController extends BaseController {
    constructor() {
        super()
        this.modelPost = new MyModelPost();
        this.modelProfil = new MyModelProfil();
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.getMostLikedPosts();
        this.getMostComPosts();
        this.getMostFollowedProfil();
    }

    getMostFollowedProfil = async () => {
        try{
            const tabProfils = await this.modelProfil.getMostFollowedProfil();
            let cpt = 0
            for(let unProfil of tabProfils[0]){
                document.getElementById("profilTop3").innerHTML +=
                    `<div id=un_abo>
                        <div id='img_profil-entete'>
                            <img onclick='' class="p_profil" id=p_profil${cpt} width=40px src='res/img/profilLogo.png'>
                        </div>${unProfil.pseudo_profil}
                    </div>`;
                const avatar_profil = unProfil.avatar_profil
                if (avatar_profil !== ""){
                    document.getElementById(`p_profil${cpt}`).src = avatar_profil
                }
                cpt ++
            }
        }catch (e){
            console.log(e)
        }
    }

    getMostComPosts = async () => {
        try{
            const tabPosts = await this.modelPost.getMostComPosts(sessionStorage.getItem("tokenProfil"));
            console.log(tabPosts)
            await this.composePost(tabPosts, "postComTop3")
        }catch (e){
            console.log(e)
        }
    }

    getMostLikedPosts = async () => {
        try{
            const tabPosts = await this.modelPost.getMostLikedPosts(sessionStorage.getItem("tokenProfil"));
            await this.composePost(tabPosts ,"postLikeTop3")
        }catch (e){
            console.log(e)
        }
    }
}

export default () => window.explorerController = new explorerController()