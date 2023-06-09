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
            for(let unProfil of tabProfils[0]){
                document.getElementById("profilTop3").innerHTML +=
                    `<div id=un_abo>
                        <div id='img_profil-entete'>
                            <img onclick='' id=p_profil width=40px src='../res/img_profil/${unProfil.id_profil}.png'>
                        </div>${unProfil.pseudo_profil}
                    </div>`;
            }
        }catch (e){
            console.log(e)
        }
    }

    getMostComPosts = async () => {
        try{
            const tabPosts = await this.modelPost.getMostComPosts();

            for(let unPost of tabPosts[0]){
                console.log(unPost.id_profil)
                const Profil = await this.modelProfil.getProfilByIdProfil(unPost.id_profil)
                console.log(Profil)
                document.getElementById("postComTop3").innerHTML +=
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
                        <div id=like><div id=btlike>
                            <div id='btlike${unPost.id_post}'>0</div>
                        </div>
                        <div id=nb_like>0</div>
                    </div>
                    </div>
                    <input type=hidden value=${unPost.id_post}></input></input></div></div>`;
            }
        }catch (e){
            console.log(e)
        }
    }

    getMostLikedPosts = async () => {
        try{
            const tabPosts = await this.modelPost.getMostComPosts();
            for(let unPost of tabPosts[0]){
                const Profil = await this.modelProfil.getProfilByIdProfil(unPost.id_profil)
                const btnlike = `<div id='btlike${unPost.id_post}'>0</div>`
                document.getElementById("postLikeTop3").innerHTML +=
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
                        <div id=like><div id=btlike>
                            ${btnlike}
                        </div>
                        <div id=nb_like>0</div>
                    </div>
                    </div>
                    <input type=hidden value=${unPost.id_post}></input></input></div></div>`;
            }
        }catch (e){
            console.log(e)
        }
    }
}

export default () => window.explorerController = new explorerController()