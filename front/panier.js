function getBasket(){
    let array = JSON.parse(localStorage.getItem("panier"));
    if(array){
        return array;
    }
    else{
        return 0;
    }
}
getBasket();