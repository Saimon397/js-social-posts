/*Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1 - Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
Milestone 3- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//Creo variabile per richiamare il container
const ContainerDOM = document.getElementById('container');

//Con un ciclo for genero i post da stampare nell'html 
for (let i = 0; i < posts.length; i++) {

    ContainerDOM.innerHTML += `<div class="post">
                                <div class="post__header">
                                    <div class="post-meta">                    
                                        <div class="post-meta__icon">
                                            <img class="profile-pic" src="${posts[i].author.image}" alt="">                    
                                        </div>
                                        <div class="post-meta__data">
                                            <div class="post-meta__author">${posts[i].author['name']}</div>
                                            <div class="post-meta__time">${posts[i].created}</div>
                                        </div>                    
                                    </div>
                                </div>
                                <div class="post__teit">${posts[i].content}</div>
                                <div class="post__image">
                                    <img src="${posts[i]['media']}" alt="">
                                </div>
                                <div class="post__footer">
                                    <div class="likes js-likes">
                                        <div class="likes__cta">
                                            <a class="like-button  js-like-button" href="#" data-postid="${posts[i].id}">
                                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                                <span class="like-button__label">Mi Piace</span>
                                            </a>
                                        </div>
                                        <div class="likes__counter">
                                            Piace a <b id="like-counter-${i}" class="js-likes-counter">${posts[i].likes}</b> persone
                                        </div>
                                    </div> 
                                </div>            
                            </div>`
}

//Variabile che richiama il bottone like + un array
const BtnLike = document.getElementsByClassName('like-button');
//Variabile per incremento dei like
let likePlus;
//Array vuoto dove verrano inseriti gli id dei post a cui è stato messo il like
const IDLikeArray = []

//Con un ciclo for scorro l'array dei bottoni like e ad ognugno add un evento al click
for (let c = 0; c < BtnLike.length; c++) {
    //Variabile a cui assegno il contenuto dell'attributo data-postid di BtnLike
    let IDLike = BtnLike[c].getAttribute('data-postid');
    BtnLike[c].addEventListener('click', function (event) {
        //Per disabilitare il funzionamento del tag <a> 
        event.preventDefault();
        //Imposto colore al like 
        BtnLike[c].style.color = 'rgb(0, 223, 107)';
        //Incremento e stampo i like nell'html
        likePlus = posts[c].likes;
        likePlus += 1;
        document.getElementById(`like-counter-${c}`).innerHTML = likePlus;
        //pusho id del post solo se non è nell'array
        if (!IDLikeArray.includes(IDLike)) {
            IDLikeArray.push(IDLike);
            //for debug /del/
            console.log(IDLikeArray);
        }
    });
};