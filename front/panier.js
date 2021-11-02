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
    clone.querySelector(".card input").setAttribute("value", product.quantity);
    document.querySelector(".grid-container").appendChild(clone);
}

let input = document.querySelector("input").value;
let dataFormat = document.querySelector(input).getAttribute("data-type");

function checkFormValidity(input, dataFormat){
    const letterFormat = /^[a-zA-Z\-]+$/;
    const adressFormat = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.match(letterFormat) && dataFormat == "text"){
        return true;
    }
    else if(input.match(adressFormat) && dataFormat == "adress"){
        return true;

    }
    else if(input.match(mailFormat)&& dataFormat == "email"){
        return true;

    }
    else{
        return false;
    }
}

function main(){
    let array = getBasket();
    for(i of array){
        displayProducts(i);
    }
}

main();