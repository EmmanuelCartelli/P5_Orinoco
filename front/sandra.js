const submitBtn = document.querySelector("submitBtn");

function main(){
    let product = returnKanapID();
    displayArticle(product);
    submitBtn.addEventListener("click", function(product){
        let color = document.querySelector("select.color").value;
        let quantity = document.querySelector("input.qty").value;
        let array = [];
        let kanap = {
            id : product._id,
            quantity : quantity,
            color : color,
            img : product.imageUrl,
            price = product.price * (quantity + 1) -1
        }
        if(localStorage.getItem("panier")){
            //
        }
        else{
            array.push(kanap)
            localStorage.setItem("panier", JSON.stringify(array));
        }
    })
}

main();