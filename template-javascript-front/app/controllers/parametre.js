import BaseController from "./basecontroller.js";
import MyModelProfil from "../model/profilsmodel.js";
import MyModelSensi from "../model/sensibilitemodel.js";
import MyModelSensiProfil from "../model/sensibilite_profilmodel.js";

class parametreController extends BaseController {
    constructor() {
        super()
        this.modelProfil = new MyModelProfil()
        this.modelSensi = new MyModelSensi()
        this.modelSensiProfil = new MyModelSensiProfil()
        this.getInfoProfil()
        this.loadSensiEcriture()
        this.loadSensiLecture()
        this.loadBlackList()
    }

    async updateProfil(id_profil) {
        const Profil = await this.modelProfil.getProfilByIdProfil(id_profil)
        console.log(Profil[0])
        Profil[0].pseudo_profil = document.getElementById("txt_pseudo_profil").value
        Profil[0].mdp_profil = document.getElementById("txt_mdp_profil").value
        Profil[0].updatedAt = new Date().toISOString();
        await this.modelProfil.updateProfil(Profil[0])
    }

    async updateSensiProfil() {
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        const ecritureSensi = document.getElementById("sensibilite").value
        if (userSensi !== undefined){
            const data = {
                "id_profil": id_profil,
                "ecriture_sensibilite": ecritureSensi,
            }
            await this.modelSensiProfil.updateSensiProfil(data)
        }else{
            await this.modelSensiProfil.CreaSensiProfil(data)
        }
    }

    async updateLecture(cpt){
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        let listLecture = ""
        console.log(document.getElementById(`lecture_sensi${cpt}`).value + ",")
        if (userSensi !== undefined){
            listLecture = userSensi.lecture_sensibilite
            listLecture += document.getElementById(`lecture_sensi${cpt}`).value + ","
            const data = {
                "id_profil": id_profil,
                "lecture_sensibilite": listLecture,
            }
            await this.modelSensiProfil.updateSensiProfil(data)
        }else{
            listLecture = document.getElementById(`lecture_sensi${cpt}`).value + ","
            const data = {
                "id_profil": id_profil,
                "lecture_sensibilite": listLecture
            }
            await this.modelSensiProfil.CreaSensiProfil(data)
        }
        await this.loadSensiLecture()
    }

    async addBLWord(){
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        const wordToAdd = document.getElementById("txt_add_BLWord").value
        let listBLWords = ""
        if (userSensi !== undefined){
            listBLWords = userSensi.mots_sensibilite
            listBLWords += wordToAdd + ","
            const data = {
                "id_profil": id_profil,
                "mots_sensibilite": listBLWords
            }
            await this.modelSensiProfil.updateSensiProfil(data)
        }
        else{
            listBLWords += wordToAdd + ","
            const data = {
                "id_profil": id_profil,
                "mots_sensibilite": listBLWords
            }
            await this.modelSensiProfil.CreaSensiProfil(data)
        }
        await this.loadBlackList()
    }

    async loadSensiEcriture(){
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        const allSensi = await this.modelSensi.getAllSensi()
        for(let uneSensi of allSensi){
            if(userSensi !== undefined && userSensi.ecriture_sensibilite === uneSensi.id_sensibilite){
                document.getElementById("sensibilite").innerHTML +=
                    `
                        <option selected value=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</option>
                    `;
            } else {
                document.getElementById("sensibilite").innerHTML +=
                    `
                        <option value=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</option>
                    `;
            }
        }
        document.getElementById("deleteProfil").innerHTML= `<label>Supprimer votre profil :</label> <button id="OptionS" class="bt-danger">Supprimer</button>`
    }


    async removeLecture(index) {
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        let arrayLecture = userSensi.lecture_sensibilite.split(",")
        arrayLecture.splice(index, 1);
        const listLecture = arrayLecture.join(", ");
        const data = {
            "id_profil": id_profil,
            "lecture_sensibilite": listLecture
        }
        await this.modelSensiProfil.updateSensiProfil(data)
        await this.loadSensiLecture()
    }

    async loadSensiLecture(){
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        const allSensi = await this.modelSensi.getAllSensi()
        let arrayLecture = []
        if (userSensi !== undefined){
            let listLectureSensi = userSensi.lecture_sensibilite
            console.log(listLectureSensi)
            arrayLecture = listLectureSensi.split(",")
            arrayLecture.pop()
            console.log(arrayLecture)
        }
        document.getElementById("checkSensiLecture").innerHTML = ""
        let cpt=0
        for(let uneSensi of allSensi){
            if (userSensi !== undefined && arrayLecture.length > 0){
                for(let uneSensiProfil of arrayLecture){
                    if(uneSensiProfil === uneSensi.id_sensibilite){
                        console.log("coucou")
                        document.getElementById("checkSensiLecture").innerHTML +=
                            `
                                <input onclick="parametreController.removeLecture(${cpt})" checked class="form-check-input" type="checkbox" id="lecture_sensi${cpt}" name=${uneSensi.contenu_sensibilite} value=${uneSensi.id_sensibilite}>
                                <label class="form-check-label" for=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</label><br>
                            `;
                    }
                }
            }else{
                document.getElementById("checkSensiLecture").innerHTML +=
                    `
                <input onclick="parametreController.updateLecture(${cpt})" class="form-check-input" type="checkbox" id="lecture_sensi${cpt}" name=${uneSensi.contenu_sensibilite} value=${uneSensi.id_sensibilite}>
                <label class="form-check-label" for=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</label><br>
                `;
                }
            cpt ++
        }
        document.getElementById("deleteProfil").innerHTML= `<label>Supprimer votre profil :</label> <button id="OptionS" class="bt-danger">Supprimer</button>`
    }



    async removeBLWord(index) {
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        let arrayBLWords = userSensi.mots_sensibilite.split(",")
        arrayBLWords.splice(index, 1);
        const listBLWords = arrayBLWords.join(", ");
        const data = {
            "id_profil": id_profil,
            "mots_sensibilite": listBLWords
        }
        await this.modelSensiProfil.updateSensiProfil(data)
        await this.loadBlackList()
    }

    async loadBlackList() {
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        if (userSensi !== undefined){
            if(userSensi.mots_sensibilite !== null){
                const arrayBLWords = userSensi.mots_sensibilite.split(",")
                arrayBLWords.pop()
                let cpt = 0
                document.getElementById("showBanWords").innerHTML = ""
                for (let unBLWords of arrayBLWords){
                    document.getElementById("showBanWords").innerHTML +=
                        `
                            <div class="button_BLW" onclick="parametreController.removeBLWord(${cpt})">${unBLWords} ❌</div>
                        `
                    cpt ++
                }
            }
        }else{
            document.getElementById("showBanWords").innerHTML = `<div>Vous n'avez pas encore renseigné de mots à bannir.</div>`
        }
    }

    getInfoProfil = async () => {
        const Profil = await this.modelProfil.getProfilByIdProfil(sessionStorage.getItem("tokenProfil"))

        //Vérification si l'utilisateur à deja modifié les information de son profil,

        // Conversion de la date pour un affichage compact
        const createdAt = new Date(Profil[0].updatedAt);
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


        document.getElementById("infoProfil").innerHTML =
            `<label>Derniere modification du profil il y a : <b>${dateDiff}</b></label>
            <h4>Information du profil</h4>
                <div class="flex">
                    <label>Pseudo du profil :</label>
                    <input id="txt_pseudo_profil" type="text" class="form-control" value="${Profil[0].pseudo_profil}" placeholder="${Profil[0].pseudo_profil}">
                </div>
                <div class="flex">
                    <label>Ajout ou Mofication du mot de passe :</label>
                    <input id="txt_mdp_profil" class="form-control" type="password" placeholder="mot de passe"/>
                    <button id="BTPost" onclick="parametreController.updateProfil('${Profil[0].id_profil}')">Enregistrer</button>
                </div>
            `
    }

}

export default () => window.parametreController = new parametreController()