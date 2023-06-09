import BaseController from "./basecontroller.js";
import MyModel from "../model/usersmodel.js";

class authController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
    }

    authUser = async () => {
        const label_user = document.getElementById("label_user").value
        const mdp_user = document.getElementById("mdp_user").value
        try {
            const user = await this.model.authUser(label_user, mdp_user)

            sessionStorage.setItem('token' , user.token);

            navigate('profils')
        }
        catch (e) {
            if (e === 401){
                console.log("ERREUR 401 ! ")
            }
        }
    }
}

export default () => window.authController = new authController()
