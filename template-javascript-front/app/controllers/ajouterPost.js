import BaseController from "./basecontroller.js";
import MyModel from "../model/postmodel.js";
import MyModelSensi from "../model/sensibilitemodel.js";
import MyModelSensiProfil from "../model/sensibilite_profilmodel.js";

class AddPostController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.modelSensiProfil = new MyModelSensiProfil()
        this.modelSensi = new MyModelSensi()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        this.loadAddPost()
    }


    async loadAddPost(){
        const id_profil = sessionStorage.getItem("tokenProfil")
        const userSensi = await this.modelSensiProfil.getSensiProfil(id_profil)
        console.log(userSensi)
        const allSensi = await this.modelSensi.getAllSensi()
        console.log(allSensi)
        for(let uneSensi of allSensi){
            if(userSensi !== undefined && userSensi.ecriture_sensibilite === uneSensi.id_sensibilite){
                document.getElementById("sensibilite").innerHTML +=
                    `
                        <option selected value=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</option>
                    `
            } else {
                document.getElementById("sensibilite").innerHTML +=
                    `
                        <option  value=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</option>
                    `
            }
        }
    }

    async creaPost() {
        const id_profil = sessionStorage.getItem("tokenProfil")
        const contenu_post = document.getElementById("contenu_post").value
        const sensibilite_post = document.getElementById("sensibilite").value

        let text_error = document.getElementById("text_error")
        if(contenu_post !== ''){
            try {
                const data = {
                    "id_profil": id_profil,
                    "contenu_post": contenu_post,
                    "sensibilite_post": sensibilite_post,
                }
                text_error.innerHTML = "Le création de votre post est un succes !"
                await this.model.creaPost(data)
                location.reload()
            }catch (e){
                if (e === 412){
                    text_error.innerHTML = "Il y a eu une erreur avec le server"
                }
                console.log(e)
            }
        }
        else{
            text_error.innerHTML = "Les champs ne sont pas correctement remplis."
        }
    }

}

export default () => window.AddPostController = new AddPostController()