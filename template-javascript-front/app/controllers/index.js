import BaseController from "./basecontroller.js";
import MyModel from "../model/usersmodel.js";
import accueil from "./accueil.js";

class IndexController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
        this.checkIsConnected()
    }
    checkIsConnected(){
        if(sessionStorage.getItem("tokenProfil")){
            navigate("accueil")
        }
    }

    getUsers = async () => {
        const user = await this.model.getUsers()
        console.log(user);
    }

    is_connected = () => {

    }
}

export default () => window.indexController = new IndexController()
