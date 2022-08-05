const api_key='2daf9336-2f35-4df6-8c06-169d7172cf27';
const api_url_random='https://api.thecatapi.com/v1/images/search?limit=2';
const api_url_favorites='https://api.thecatapi.com/v1/favourites';


async function loadRandomCats(){
    const res = await fetch(api_url_random);
    const data = await res.json();

    const toRender=[];
    const section=document.getElementById("random cats");
    data.forEach(cat => {
        const figure=document.createElement('figure');
        const img=document.createElement('img');
        const btn=document.createElement('button');
        const btnText=document.createTextNode("Delete cat from ur favorites");

        img.src=cat.url;
        img.className="randomCat";
        btn.appendChild(btnText);
        btn.onclick=()=>saveFavoriteCats(cat.id);
        figure.appendChild(img,btn);
        toRender.push(figure);
        section.append(...toRender);
    });
    toRender=[];
    console.log(data);
}

async function loadFavoriteCats(){
    const res = await fetch(api_url_favorites,{
        headers:{
            "x-api-key":api_key
        }
    });
    const data = await res.json();

    console.log(data);

    data.forEach(cat => {
        const section = document.getElementById("favoriteKitties");
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode("Delete cat from ur favorites");

        img.src=cat.image.url;
        img.className="favoriteCat";
        btn.appendChild(btnText);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
    })


}

async function saveFavoriteCats(id){
    const res = await fetch(api_url_favorites,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "x-api-key":api_key
        },
        body:JSON.stringify({
            image_id:id
        })
    })
    const data = await res.json();

    console.log(res);
    console.log(data);
}

    

    

loadRandomCats();

