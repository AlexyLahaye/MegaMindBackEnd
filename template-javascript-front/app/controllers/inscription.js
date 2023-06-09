import BaseController from "./basecontroller.js";
import MyModel from "../model/usersmodel.js";

class inscController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
    }

    creaUser = async () => {
        const label_user = document.getElementById("label_user").value
        const mdp_user = document.getElementById("mdp_user").value
        let text_error = document.getElementById("text_error")
        if(label_user !== '' && mdp_user !== ''){
            try {
                text_error.className = "text-success"
                text_error.innerHTML = "Le création de votre compte est un succes !"
                document.getElementById("btn_inscr").className = "btn btn-success"
                return await this.model.creaUser(label_user, mdp_user)

            }catch (e){
                if (e == 412){
                    text_error.innerHTML = "Le nom d'utilisateur est deja pris."
                }
            }
        }
        else{
            text_error.innerHTML = "Les champs : login/mdp ne sont pas correctement remplis."
        }
    }
}

export default () => window.inscController = new inscController()
