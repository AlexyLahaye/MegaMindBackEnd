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
            let cpt = 0
            document.getElementById("search-result").innerHTML = ''
            for(const unProfil of searchedProfil) {

                document.getElementById("search-result").innerHTML += `<div id="select_choice"><img onclick='sessionStorage.setItem("tokenProfilClicked", "${unProfil.id_profil}");navigate("profil")' class="p_profil" id=p_profilS${cpt} width=40px src='res/img/profilLogo.png'>${unProfil.pseudo_profil}</div>`
                const avatar_profil = unProfil.avatar_profil
                if (avatar_profil !== "") {
                    document.getElementById(`p_profilS${cpt}`).src = avatar_profil
                }
                cpt++
            }
        } else {
            document.getElementById("search-result").innerHTML = `Aucun profil trouvé.`
        }
    }
}

export default () => window.researchProfilController = new researchProfilController()