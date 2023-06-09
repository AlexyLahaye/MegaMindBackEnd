import BaseController from "./basecontroller.js";
import MyModel from "../model/sensibilitemodel";

class sensibiliteController extends BaseController {
    constructor() {
        super()
        this.model = new MyModel()
    }

    getAllSensi = async () => {
        const ListSensi = await this.model.getAllSensi()
        let optionsSensi = ``
        for(let uneSensi of ListSensi){
            optionsSensi += `<option value=${uneSensi.id_sensibilite}>${uneSensi.contenu_sensibilite}</option>`
        }
        return optionsSensi
    }

}


export default () => window.sensibiliteController = new sensibiliteController()
