import {CompleteOrder} from "./CompleteOrder";
let serverURL = "https://umbertofalkenhagengis.herokuapp.com";
let order: CompleteOrder;
if (sessionStorage.getItem("editorder")) {
    form = <HTMLFormElement>document.getElementById("form");
    order = JSON.parse(<string>sessionStorage.getItem("editorder"));
    console.log(order._id);

    let ball1: HTMLSelectElement = <HTMLSelectElement>document.getElementById("ball1");
    ball1.value = order._icecream._iceballs[0].toLowerCase();
    let ball2: HTMLSelectElement = <HTMLSelectElement>document.getElementById("ball2");
    ball2.value = order._icecream._iceballs[1].toLowerCase();
    let ball3: HTMLSelectElement = <HTMLSelectElement>document.getElementById("ball3");
    ball3.value = order._icecream._iceballs[2].toLowerCase();
    let topping: HTMLSelectElement = <HTMLSelectElement>document.getElementById("topping");
    topping.value = order._icecream._topping.toLowerCase();
    console.log("Topping: " + order._icecream._topping.toLowerCase());

    let container: HTMLSelectElement = <HTMLSelectElement>document.getElementById("icecontainer");
    container.value = order._icecream._container.toLowerCase();

    let firstName: HTMLInputElement = <HTMLInputElement>document.getElementsByName("firstName")[0];
    firstName.value = order._personalData._firstName;

    let lastName: HTMLInputElement = <HTMLInputElement>document.getElementsByName("lastName")[0];
    lastName.value = order._personalData._lastName;

    let phone: HTMLInputElement = <HTMLInputElement>document.getElementsByName("phone")[0];
    phone.value = order._personalData._phone;

    let address: HTMLInputElement = <HTMLInputElement>document.getElementsByName("address")[0];
    address.value = order._personalData._address;

    let alterButton = document.getElementById("alterButton");
    alterButton!.addEventListener("click", () => updateOrder());


} else {
    window.location.href = "showOrders.html";
}

async function updateOrder() {
    let formData: FormData = new FormData(form);
    formData.append("id", order._id);
    // tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    await fetch(serverURL + "/update?" + query);
    sessionStorage.clear();
    window.location.href = "showOrders.html?message=3";
}





