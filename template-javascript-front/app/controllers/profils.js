import BaseController from "./basecontroller.js";
import MyModel from "../model/usersmodel.js";
import MymodelProfil from "../model/profilsmodel.js";

class profilsController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.modelP = new MymodelProfil()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.profilUser();
        this.getAllProfilsFromIdUser();
    }

    profilUser = async () => {
        document.getElementById("pseudo_compte").innerHTML = this.splitedToken.label_user
    }

    creaProfil = async () => {
        const id_user = this.splitedToken.id_user
        const pseudo_profil = document.getElementById("pseudo_profil").value
        const mdp_profil = document.getElementById("mdp_profil").value
        const isadmin_profil = false
        const avatar_profil =document.getElementById("avatar_profil")
        let base64 = ""
        if(avatar_profil?.files?.length > 0){
            base64 = await this.toBase64(avatar_profil.files[0])
        }
        let text_error = document.getElementById("text_error")
        if(pseudo_profil !== '' && mdp_profil !== ''){
            try {
                const data = {
                    "id_user": id_user,
                    "pseudo_profil": pseudo_profil,
                    "avatar_profil": base64,
                    "mdp_profil": mdp_profil,
                    "isadmin_profil": isadmin_profil
                }
                text_error.innerHTML = "Le création de votre profil est un succes !"
                await this.modelP.creaProfil(data)
                document.getElementById('Close').click()
                navigate("profils")
            }catch (e){
                if (e === 412){
                    text_error.innerHTML = "Le nom du profil est deja pris."
                }
                console.log(e)
            }
        }
        else{
            text_error.innerHTML = "Les champs ne sont pas correctement remplis."
        }
    }

    toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    async previewFile() {
        const preview = document.getElementById('img_profil');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            // on convertit l'image en une chaîne de caractères base64
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    delProfil = async (id_profil) => {
        try {
            console.log(id_profil)
            await this.modelP.delProfil(id_profil)
            navigate("profils")
        } catch {}
    }

    connexionProfil = async (id_profil) => {
        sessionStorage.setItem('tokenProfil' , id_profil);
        isconnectedProfil(sessionStorage.getItem("tokenProfil"));
    }

    getAllProfilsFromIdUser = async () => {
        try {
            const tabProfils = await this.modelP.getAllProfilsFromIdUser(this.splitedToken.id_user)
            for(let unProfil of tabProfils[0]){
                console.log(unProfil.id_profil);
                document.getElementById("contenu_profils").innerHTML +=
                    `<div class="m-4 col card border-info" style="width: 18rem">
                            <img src="../res/img/icone_profil.png" class="card-img-top" alt=""> 
                            <div class="card-body" >
                                <input id="${unProfil.id_profil}" type="hidden" value="${unProfil.id_profil}">
                                <h5 class="card-title">${unProfil.pseudo_profil}</h5>
                                <a onclick="profilsController.connexionProfil('${unProfil.id_profil}'); navigate('accueil')" class="btn btn-primary">Se connecter</a>
                                <a  onclick="profilsController.delProfil('${unProfil.id_profil}')" class="btn btn-danger">Supprimer</a>
                            </div>
                     </div>` ;
            }
            if (tabProfils[0].length < 4){
                document.getElementById("contenu_profils").innerHTML +=
                    `<div class="m-4 col card border-info" style="width: 18rem">
                            <img src="../res/img/icone_add.png" class="card-img-top" alt=""> 
                            <div class="card-body" >
                                <h5 class="card-title"></h5>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProfil">
                                  Creer un profil
                                </button>
                            </div>
                     </div>` ;
            }
        }catch (e){
            console.log(e)
        }
    }
}

export default () => window.profilsController = new profilsController()
