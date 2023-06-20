function $(selector, f) {
    if (f === undefined)
        return document.querySelector(selector)
    else 
        document.querySelectorAll(selector).forEach(f)
}

function fetchJSON(url, token) {
    const headers = new Headers();
    if (token !== undefined) {
        headers.append("Authorization", `Bearer ${token}`)
    }
    return new Promise((resolve, reject) => fetch(url, {cache: "no-cache", headers: headers})
        .then(res => {
            if (res.status === 200) {
                resolve(res.json())
            } else {
                reject(res.status)
            }
        })
        .catch(err => reject(err)))
}

function include(selector, url, urlcontroller) {
    fetch(url, {cache: "no-cache"})
        .then(res => res.text())
        .then(html => {
            $(`#${selector}`).innerHTML = html
            import(urlcontroller).then((controller) => {
                controller.default()
            })
        })
        .catch(function(err) {
            console.log('Failed to fetch page: ', err)
        });
}

function likeContenu(id_post, id_profil, cpt, nblike) {
    const addedLike = nblike +1
    const addLike = JSON.parse(sessionStorage.getItem("addLike")) || [];
    const Like = {
        "id_post": id_post,
        "id_profil": id_profil,
        "id_etat_like": 2
    }
    addLike.push(Like); sessionStorage.setItem("addLike", JSON.stringify(addLike))
    document.getElementById(`bt_like${cpt}`).innerHTML = `<img onclick='dislikeContenu("${id_post}", "${id_profil}", ${cpt}, ${addedLike})' id=btlike src='res/img/Likelogo21.png'>`
    document.getElementById(`nb_like${cpt}`).innerHTML = addedLike
}

function dislikeContenu(id_post, id_profil, cpt, nblike){
    const removedLike = nblike -1
    const removeLike = JSON.parse(sessionStorage.getItem("removeLike")) || [];
    const Like = {
        "id_post": id_post,
        "id_profil": id_profil,
        "id_etat_like": 2
    }
    removeLike.push(Like); sessionStorage.setItem("removeLike", JSON.stringify(removeLike))
    document.getElementById(`bt_like${cpt}`).innerHTML = `<img onclick='likeContenu("${id_post}", "${id_profil}", ${cpt}, ${removedLike})' id=btlike src='res/img/Likelogo1.png'>`
    document.getElementById(`nb_like${cpt}`).innerHTML = removedLike
}

function navigate(view) {
    sessionStorage.setItem("currentView", view)
    include('MegaMind_contenu',  `views/${view}.html`, `./controllers/${view}.js`)
}
function AddPostView(view) {
    document.getElementById("AddPost").style.display = "block"
    include('AddPost',  `views/${view}.html`, `./controllers/${view}.js`)
}

function getResearchProfil(view){
    sessionStorage.setItem("displayedResearch", "oui")
    include('searchP',  `views/${view}.html`, `./controllers/${view}.js`)
}

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
function reviver(key, value) {
    if (typeof value === "string" && dateFormat.test(value)) {
        return new Date(value);
    }
    return value;
}

function getParameterByName(name) {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
