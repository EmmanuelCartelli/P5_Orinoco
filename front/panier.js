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

function checkRegex(regex, input){
    if(regex.test(input)){
        return true;
    }
    else{
        return false;
    }
}


function listenForm(){
    let submitBtn = document.querySelector(".send");
    const letterFormat = /^[a-zA-ZéêèàëÉÈÊË\-]+$/;
    const adressFormat = /^[a-zA-ZéêèàëÉÈÊË0-9\s,.'-]{3,}$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let mail = document.querySelector(".email");
    let adress = document.querySelector(".adress");
    let city = document.querySelector(".city");
    let nameInput = document.querySelector(".firstname");
    let lastname = document.querySelector(".lastname");
    console.log(nameInput);
    submitBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(checkRegex(letterFormat, nameInput.value) 
        && checkRegex(letterFormat, lastname.value) 
        && checkRegex(adressFormat, adress.value) 
        && checkRegex(adressFormat, city.value) 
        && checkRegex(mailFormat, mail.value)){
            //post method
            console.log("ok");
            let product = [];
            let storage = JSON.parse(localStorage.getItem("panier"));
            console.log(storage);   
            for(i of storage){
                product.push(i.id);
            }    
            console.log(product);
            let order = {
                contact: {
                    firstName: nameInput.value,
                    lastName: lastname.value,
                    address: adress.value,
                    city: city.value,
                    email: mail.value,
                },
                products : product,
            }
            console.log(order);
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
            }
            fetch("http://localhost:3000/api/cameras/order", options)
            .then(response => response.json())
            .then(data => {
                localStorage.clear();
                localStorage.setItem("orderID", data.orderId);
                window.location.href = "confirmation.html";
            })
            .catch(error => console.error(error));
        }
        else{
            e.preventDefault();
            alert("Veuillez remplir correctement tous les champs");
        }
    });
}

function main(){
    let array = getBasket();
    for(i of array){
        displayProducts(i);
    }
    listenForm();
}

main();