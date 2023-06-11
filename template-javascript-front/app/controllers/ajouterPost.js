import BaseController from "./basecontroller.js";
import MyModel from "../model/postmodel.js";

class AddPostController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
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