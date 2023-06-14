import BaseController from "./basecontroller.js";
import MyModelProfil from "../model/profilsmodel.js";
import MyModelSensiProfil from "../model/sensibilite_profilmodel.js";

class parametreController extends BaseController {
    constructor() {
        super()
        this.modelProfil = new MyModelProfil()
        this.modelSensiProfil = new MyModelSensiProfil()
        this.getInfoProfil()
        this.getInfoSensi()
    }

    getInfoProfil = async () => {
        const Profil = await this.modelProfil.getProfilByIdProfil(sessionStorage.getItem("tokenProfil"))

        //Vérification si l'utilisateur à deja modifié les information de son profil,

        //Vérification si la date actuelle est la date de la derniere modification est plus ou egal a 2 jours.



        document.getElementById("infoProfil").innerHTML =
            `<label>Derniere modification il y a : </label>
            <h4>Information du profil</h4>
                <div class="flex">
                    <label>Pseudo du profil :</label>
                    <input type="text" placeholder="${Profil[0].pseudo_profil}">
                    <button id="BTPost" onclick="">Enregistrer</button>
                </div>
                <div class="flex">
                    <label>Ajout ou Mofication du mot de passe :</label>
                    <input type="password" placeholder="mot de passe"/>
                    <label>Confirmation du mot de passe :</label>
                    <input type="password" placeholder="confirmation mot de passe"/>
                    <button id="BTPost" onclick="">Enregistrer</button>
                </div>
            `
    }

    getInfoSensi = async () => {
        const SensiProfil = await this.modelSensiProfil.getSensiProfil(sessionStorage.getItem("tokenProfil"))
        if(SensiProfil !== undefined){
            document.getElementById("infoSensi").innerHTML =
                `<h4>Options sensibilité</h4>`;
        }
    }

}

export default () => window.parametreController = new parametreController()