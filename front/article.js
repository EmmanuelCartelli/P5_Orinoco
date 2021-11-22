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


function pushTotal(articlePrice){
    let sum = 0;
    let total = JSON.parse(localStorage.getItem("panier"));
    if(localStorage.getItem("total")){
        for(i of total){
            sum += i.price;
        }
        localStorage.setItem("total", sum);
    }
    else{
        sum += articlePrice.price / 100;
        localStorage.setItem("total", sum);
    }
}

function checkArray(array, itemName, itemOption){
    for(x of array){
        if(x.name == itemName && x.option == itemOption){
            x.quantity++;
            return true;
        }
    }
}

function addToCart(article){
    let articleArray = []
    document.querySelector("button").addEventListener("click", function(){
        let cameraOption = document.querySelector("select").value;
        let camera = {
            id : article._id,
            name : article.name,
            img : article.imageUrl,
            option : cameraOption,
            price : article.price / 100,
            quantity: 1
        }
        if(localStorage.getItem("panier")){
            let array = JSON.parse(localStorage.getItem("panier"));
            /*if(checkArray(array, camera.name, camera.option)){
                localStorage.setItem("panier", JSON.stringify(array));
            }
            else{
                array.push(camera);
                localStorage.setItem("panier", JSON.stringify(array));
            }*/
            let z = array.length;

            for(i = 0; i < z; i++){
                if(camera.option === array[i].option && camera.name === array[i].name){
                    array[i].quantity++;
                    localStorage.setItem("panier", JSON.stringify(array));
                    return;
                } 
            }
            array.push(camera);
            localStorage.setItem("panier", JSON.stringify(array));
        }
        else{
            articleArray.push(camera);
            localStorage.setItem("panier", JSON.stringify(articleArray));
        }
        pushTotal(article);
    })
}


async function main(){
    let id = getId();
    let article = await getArticle(id);
    displayArticle(article);
    addToCart(article);
}

main();