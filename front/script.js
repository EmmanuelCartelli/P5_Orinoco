async function getProducts(){
    return fetch(`http://localhost:3000/api/cameras`)
    .then(function(apiResponse){
        return apiResponse.json()
    })
    .catch(function(error){
        console.log(error)
    })
}

function displayProducts(articles){
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".link").setAttribute("href", "article.html?id=" + articles._id);
    clone.querySelector(".link img").setAttribute("src", articles.imageUrl);
    clone.querySelector(".link h3").textContent = articles.name;
    clone.querySelector(".link p").textContent = articles.description;
    clone.querySelector(".link span").textContent = articles.price / 100 + "€";

    document.querySelector("main").appendChild(clone);
}

async function main(){
    products = await getProducts();
    for(article of products){
        displayProducts(article);
    }
}

main();