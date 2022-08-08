const api_key='2daf9336-2f35-4df6-8c06-169d7172cf27';
const api_url_random='https://api.thecatapi.com/v1/images/search?limit=4';
const api_url_favorites='https://api.thecatapi.com/v1/favourites';


async function loadRandomCats(){
    const res = await fetch(api_url_random);
    const data = await res.json();

    const toRender=[];
    const section=document.getElementById("random_cats");
    section.innerHTML="";
    data.forEach(cat => {
        const figure=document.createElement('figure');
        const img=document.createElement('img');
        const btn=document.createElement('button');
        const btnText=document.createTextNode("Add to favorites");

        img.src=cat.url;
        img.className="randomCat";
        btn.appendChild(btnText);
        btn.className="btnAddFavorite";
        btn.onclick=()=>saveFavoriteCats(cat.id);
        figure.append(img,btn);
        toRender.push(figure);
    });
    section.append(...toRender);
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

    const toRender=[];
    const article = document.getElementById("artFavoriteCats");
    article.innerHTML="";
    data.forEach(cat => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode("Delete");

        img.src=cat.image.url;
        img.className="favoriteCat";
        btn.appendChild(btnText);
        btn.className="btnDeleteFavorite";
        btn.onclick=()=>deleteFavoriteCats(cat.id);
        figure.className="figureDelete";
        figure.append(img,btn);
        toRender.push(figure);
    });
    article.append(...toRender);
    console.log(data);
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
    
    if(res.status!==200){
        console.log(res);
    }else{
        console.log("The cat has been saved in ur favorites");
        loadFavoriteCats();
    }
}

async function deleteFavoriteCats(id){
    console.log(id);
    const res = await fetch(`${api_url_favorites}/${id}`,{
        method:"DELETE",
        headers:{
            'x-api-key':api_key
        }
    })
    const data = await res.json();
    console.log(data);
    if(res.status!==200){
        console.log(res);
    }else{
        console.log("The cat has been deleted");
        loadFavoriteCats();
    }
}

    

    

loadRandomCats();

