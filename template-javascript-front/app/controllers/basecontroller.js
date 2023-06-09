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
            navigateT('authentification')
        } catch {}
    }

    async isconnected(){
        console.log("coucou")
        const btn_nav = document.getElementById("btn_nav")
        if (sessionStorage.getItem("token")) {
            if (!sessionStorage.getItem("tokenProfil")) {
                btn_nav.innerHTML = `<button type='button' onclick='navigate("profils")'><img width=30px src='../../res/img/ProfilLogo1.png'><div class=MS>Profils</div></button> <br>`
            }
            else {
                btn_nav.innerHTML =
                    `<button type='button' onclick='navigate("accueil")'><img width=30px src='../../res/img/HomeLogo1.png'><div class=MS>Accueil</div></button> <br>
                    <button type='button' onclick='navigate("explorer")'><img width=30px src='../../res/img/ExploreLogo1.png'><div class=MS>Explorer</div></button> <br>
                    <button type='button' onclick='navigate("notifications")'><img width=30px src='../../res/img/BellLogo1.png'><div class=MS>Notifications</div></button><br>
                    <button type='button' onclick='navigate("messagerie")'><img width=30px src='../../res/img/MessageLogo1.png'><div class=MS>Messages</div></button> <br>
                    <button type='button' onclick='navigate("profil")'><img width=30px src='../../res/img/ProfilLogo1.png'><div class=MS>Profil</div></button> <br>
                    <button type='button' id=BTPost data-bs-toggle="modal" data-bs-target="#staticBackdrop"><div class=MS>Genys</div></button> <br>`
            }
        }
        else{
            btn_nav.innerHTML =
                `<button type='button' onclick='navigate("authentification")'><div class=MS>Connexion</div></button> <br>`
        }
    }
}
