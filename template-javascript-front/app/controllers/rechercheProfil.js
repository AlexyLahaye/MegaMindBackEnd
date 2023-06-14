import BaseController from "./basecontroller.js";
import MymodelProfil from "../model/profilsmodel.js";


class researchProfilController extends BaseController {
    constructor() {
        super()
        this.modelProfil = new MymodelProfil()
    }

    async getSearchedProfilByPseudo(){
        const searchTxt = document.getElementById("search").value
        const searchedProfil= await this.modelProfil.getSearchedProfilByPseudo(searchTxt)
        let message = ""
        if (searchedProfil.length > 0 && searchTxt !== ""){
            for(const unProfil of searchedProfil){
                message += `<div id="select_choice">${unProfil.pseudo_profil}</div>`
                document.getElementById("search-result").innerHTML = message
            }
        } else {
            document.getElementById("search-result").innerHTML = `Aucun profil trouvé.`
        }
    }
}

export default () => window.researchProfilController = new researchProfilController()