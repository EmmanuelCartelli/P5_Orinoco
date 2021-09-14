function getId(){
    return new URL(location.href).searchParams.get("id");
}

async function getArticle(article){
    return fetch(`http://localhost:3000/api/cameras/${article}`)
    .then(function(apiResponse){
        return apiResponse.json()
    })
    .catch(function(error){
        console.log(error)
    })
}

function displayArticle(articles){
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".link").setAttribute("href", "article.html?id=" + articles._id);
    clone.querySelector(".link img").setAttribute("src", articles.imageUrl);
    clone.querySelector(".link h3").textContent = articles.name;
    clone.querySelector(".link p").textContent = articles.description;
    clone.querySelector(".link span").textContent = articles.price / 100 + "€";
    document.querySelector("main").appendChild(clone);

    for(let i of articles.lenses){
        let j = document.createElement("option");
        j.setAttribute("value", i);
        j.textContent = i;
        document.querySelector("select").appendChild(j);
    }

}

async function main(){
    let id = getId();
    let article = await getArticle(id);
    displayArticle(article);
}

main();


 let prout = function postProduct(){
    let maVoiture = {
        make: 'Ford',
        model: 'Mustang',
        year: 1969
      };
      localStorage.setItem('Car', JSON.stringify(maVoiture));
}

const btn = document.querySelector("button");
btn.addEventListener("click", prout);