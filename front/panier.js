function getBasket(){
    let array = JSON.parse(localStorage.getItem("panier"));
    if(array){
        return array;
    }
    else{
        return 0;
    }
}

function displayProducts(product){
    const template = document.querySelector("template");
    const clone = document.importNode(template.content, true);
    let total = product.price * product.quantity;
    
    clone.querySelector(".card img").setAttribute("src", product.img)
    clone.querySelector(".card h3").textContent = product.name;
    clone.querySelector(".card p").textContent = product.description;
    clone.querySelector(".price h4").textContent = total;
    clone.querySelector(".card input").setAttribute("placeholder", product.quantity);

    document.querySelector(".grid-container").appendChild(clone);
}

function main(){
    let array = getBasket();
    for(i of array){
        displayProducts(i);
    }
}

main();