import BaseController from "./basecontroller.js";
import MyModelProfil from "../model/profilsmodel.js";
import MyModelFollow from "../model/followmodel.js";

class abonnesController extends BaseController {
    constructor() {
        super()
        this.modelProfil = new MyModelProfil()
        this.modelFollow = new MyModelFollow()
        this.splitedToken = parseJwt(sessionStorage.getItem('token'));
        // Fonction qui charge à démarage de la page
        this.showAllAbonnes(sessionStorage.getItem("tokenProfilInspected"))
    }

    showAllAbonnes = async (id_profil) =>{
        const allAbonnes = await this.modelFollow.getAllOfFollowingFromIdProfil(id_profil)
        console.log(allAbonnes)
        const Profil = await this.modelProfil.getProfilByIdProfil(id_profil)
        document.getElementById("entete_text").innerHTML= `Abonnés de ${Profil[0].pseudo_profil}`

        if (allAbonnes.length > 0){
            let cpt = 0
            for(let unAbonne of allAbonnes) {
                const unProfilAbo = await this.modelProfil.getProfilByIdProfil(unAbonne.id_profil)
                document.getElementById("contenus").innerHTML +=
                    `
                    <div id="un_abo" onclick='sessionStorage.setItem("tokenProfilClicked", "${unProfilAbo[0].id_profil}");navigate("profil")'>
                        <div id='img_profil-entete_abo'>
                            <img class="p_profil" id=p_profil${cpt} width=40px src='res/img/profilLogo.png'>
                        </div>
                        <div id="text-A">${unProfilAbo[0].pseudo_profil}</div>
                    </div>
                    `;
                const avatar_profil = unProfilAbo[0].avatar_profil
                if (avatar_profil !== "") {
                    document.getElementById(`p_profil${cpt}`).src = avatar_profil
                }
                cpt++
            }
        }else {
            document.getElementById("contenus").innerHTML= "YA R MON SANG"
        }
    }
}

export default () => window.abonnesController = new abonnesController()