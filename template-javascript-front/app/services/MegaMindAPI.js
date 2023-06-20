// Various classes not data related and not UI related
export default class MegaMindAPI{
    constructor() {
        this.baseUrl = "http://localhost:3000";
    }


    // PARTIE USER
    getOneUser = (label_user) => {
        console.log(label_user)
        return new Promise ((resolve, reject) =>{
            console.log(`${this.baseUrl}/users/${label_user}`)
            fetch(`${this.baseUrl}/users/${label_user}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getUsers = () => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/users`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    authUser =  (label_user, mdp_user) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/auth/login`, {
                method : "POST",
                body : JSON.stringify({label_user, mdp_user}),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    creaUser = (label_user, mdp_user) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/users`, {
                method : "POST",
                body : JSON.stringify({label_user, mdp_user}),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 201) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    // PARTIE PROFIL


    creaProfil = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    updateProfil = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil/update`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    delProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil/${id_profil}`, {
                method : "DELETE",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 204) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    getAllProfilsFromIdUser = (id_user) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil/${id_user}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getSearchedProfilByPseudo = (pseudo_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil/pseudoProfilDYN/${pseudo_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    // PARTIE POST

    creaPost = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/post`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getPostById = (id_post) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/post/id/${id_post}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getAllPostOfFollowedProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/post/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getAllPostFromIdProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/post/own/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }


    // PARTIE PAGE EXPLORER
    getMostFollowedProfil = () => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getMostComPosts = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/post/most/com/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getMostLikedPosts = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/post/most/like/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getProfilByIdProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/profil/idprofil/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    // LES ROUTES COMMENTAIRES

    creaCom = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/commentaire`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getAllComFromIdPost = (id_post) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/commentaire/${id_post}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    // LES ROUTES DES LIKES
    creaLike = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/like`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    deleteLike = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/like/${data.id_contenu_like}/${data.id_profil_like}/${data.id_etat_like}`, {
                method : "DELETE",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    // LES ROUTES FOLLOWS
    creaFollow = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    deleteFollow = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow/${data.id_profil}/${data.id_profil_suivi}`, {
                method : "DELETE",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    getAllOfFollowFromIdProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow/you/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    getAllOfFollowingFromIdProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow/them/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    getNbOfFollowFromIdProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow/count/you/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    getNbOfFollowingFromIdProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow/count/them/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    isFollowed = (id_profil, id_profil_suivi) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/follow/isFollow/${id_profil}/${id_profil_suivi}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    // LES ROUTES NOTIFICATIONS

    creaNotif = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/notification`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    updateNotif = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/notification/update`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    deleteNotif = (id_notification) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/notification/${id_notification}`, {
                method : "DELETE",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
    getAllNotif = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/notification/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getNotifById = (id_notification) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/notification/idNotif/${id_notification}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }


    // LES ROUTES SENSIBILITE
    getAllSensi = () => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/sensibilite/`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    // LES ROUTES SENSIBILITE_PROFIL

    CreaSensiProfil = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/sensibilite_profil`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    updateSensiProfil = (data) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/sensibilite_profil/update`, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    getSensiProfil = (id_profil) => {
        return new Promise ((resolve, reject) =>{
            fetch(`${this.baseUrl}/sensibilite_profil/${id_profil}`, {
                method : "GET",
                headers : {'content-type' : 'application/json'}
            }) .then(res => {
                if (res.status === 200) {
                    resolve(res.json())
                } else {
                    reject(res.status)
                }
            })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}