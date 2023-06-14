export default class BaseController {
    constructor() {
        this.setBackButtonView('index')
        this.isconnected()
    }
    toast(elemId) {
        const toast = new bootstrap.Toast(document.getElementById(elemId))
        toast.show()
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }
    async getDeconnection() {
        try {
            sessionStorage.removeItem("token");
            navigate('authentification')
        } catch {}
    }

    async composePost(tabPosts, checkString){
        let cpt = 0
        if (checkString === "postComTop3"){
            cpt = 3
        }
        for(let unPost of tabPosts[0]){
            const Profil = await this.modelProfil.getProfilByIdProfil(unPost.id_profil)
            let isliKed = "";
            
            // Vérification si l'utilisateur à déja like le post.
            if (unPost.isLiked !== true){
                isliKed = "<div id=bt_like><img onclick='likeContenu()' id=btlike src='res/img/Likelogo1.png'></div>"
            } else {
                isliKed = "<div id=bt_like><img onclick='dislikeContenu()' id=btlike src='res/img/Likelogo21.png'></div>"
            }

            // Conversion de la date pour un affichage compact
            const createdAt = new Date(unPost.createdAt);
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




            document.getElementById(checkString).innerHTML +=
                `<div class=un_post id='un_post-id_post'>
                        <div id=un_post-entete><div id='img_profil-entete'>
                            <img onclick='sessionStorage.setItem("tokenProfilClicked", "${Profil[0].id_profil}");navigate("profil")' class="p_profil" id=p_profil${cpt} width=40px src='res/img/profilLogo.png'>
                        </div>
                        <div id='txt-entete'>${Profil[0].pseudo_profil}
                            <div id=date_post>${dateDiff}</div>
                        </div>
                        <div id='param_post-hidden' value="${unPost.id_post}"></div>
                        <div id=param_post>
                            <img id='param_post-Logo' onclick='' src='res/img/ParametreLogo.png'>
                        </div>
                    </div>
                    <div id=click_post onclick='sessionStorage.setItem("tokenPost", "${unPost.id_post}"); navigate("post")'>
                        <div id=post_contenu>${unPost.contenu_post}</div>
                    </div>
                    <div id=un_post-conclusion>
                        <div id=fond_post>
                            <div id=com onclick=''>
                                <div id=bt_com><img id=btcom src='res/img/MessageLogo2.png'></div>
                                <div id=nb_com>0</div>
                            </div>
                        <div id=like><div id=btlike>
                            ${isliKed}
                            <div id='btlike${unPost.id_post}'></div>
                        </div>
                        <div id=nb_like>${unPost.nbLike}</div>
                    </div>
                    </div>
                    <input type=hidden value=${unPost.id_post}></div></div>`;

            const avatar_profil = Profil[0].avatar_profil
            if (avatar_profil !== ""){
                document.getElementById(`p_profil${cpt}`).src = avatar_profil
            }
            cpt ++
        }
    }
    async isconnected(){
        const btn_nav = document.getElementById("btn_nav")
        let cpt = 0
        if (sessionStorage.getItem("token")) {
            if (!sessionStorage.getItem("tokenProfil")) {
                btn_nav.innerHTML = `<button type='button' onclick='navigate("profils")'><img width=30px src='res/img/ProfilLogo1.png'><div class=MS>Profils</div></button> <br>`
            }
            else {
                btn_nav.innerHTML =
                    `<button type='button' id="test123" onclick='navigate("accueil")'><img width=30px src='./res/img/HomeLogo1.png'><div class=MS>Accueil</div></button> <br>
                    <button type='button' onclick='navigate("explorer")'><img width=30px src='../template-javascript-front/res/img/ExploreLogo1.png'><div class=MS>Explorer</div></button> <br>
                    <button type='button' onclick='navigate("notifications")'><img width=30px src='res/img/BellLogo1.png'><div class=MS>Notifications</div></button><br>
                    <button type='button' onclick='navigate("profil")'><img width=30px src='res/img/ProfilLogo1.png'><div class=MS>Profil</div></button> <br>
                    <button type='button' id=BTPost onclick='AddPostView("ajouterPost")'><div class=MS>Genys</div></button> <br>
                    <button type='button'  class='bt-danger' onclick='sessionStorage.removeItem("tokenProfil");navigate("profils")'><div class=MS>Choix du profil</div></button> <br>
                    <button type='button' id=OptionP onclick='navigate("parametre")'><div class=MS>Parametre</div></button> <br>`
                //<button type='button' onclick='navigate("messagerie")'><img width=30px src='res/img/MessageLogo1.png'><div class=MS>Messages</div></button> <br>
                document.getElementById("searchProfil").innerHTML =
                    `<img id=select_click onclick='getResearchProfil("rechercheProfil"); document.getElementById("searchP").classList.remove("hidden")' src='res/img/SearchLogo.png'/>`
                if (!sessionStorage.getItem("displayedResearch")){

                }
                cpt ++

            }
        }
        else{
            btn_nav.innerHTML =
                `<button type='button' onclick='navigate("authentification")'><div class=MS>Connexion</div></button> <br>`
        }
    }
}
