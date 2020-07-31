let body = document.body;
let url = window.location.toString();

let getUsername = (url) => {
    let getUrl = url.split('=');
    let name = getUrl[1];
    if(isNaN(name)){
        name = 'badunka';
    }
    return name;
}
let  Username = getUsername(url);

fetch( "https://api.github.com/users/" + Username)
    .then(res => res.json())
    .then(json => {
        console.log(json.avatar_url);
        console.log(json.name);
        console.log(json.bio);
        console.log(json.html_url);

        let photo = new Image();
        photo.src = json.avatar_url;
        body.append(photo);

        let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(name);

        let bio = document.createElement('p');
        bio.classList.add('link');
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(bio);
        name.addEventListener("click", () => window.location = json.html_url);
    })
    .catch(err => alert('Информация о пользователе недоступна'));
