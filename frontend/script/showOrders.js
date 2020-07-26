"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
loadAllOrders();
let table = document.getElementById("table");
let orderDiv = document.createElement("orderDiv");
let tableHead = document.createElement("tr");
tableHead.innerHTML = " <tr>\n" +
    "                <th>Bestellung</th>\n" +
    "                <th>Name</th>\n" +
    "                <th>Telefonnummer</th>\n" +
    "                <th>Adresse</th>\n" +
    "                <th></th>\n" +
    "                <th></th>\n" +
    "            </tr>";
orderDiv.appendChild(tableHead);
let allOrders = [];
async function loadAllOrders() {
    let response = await fetch(serverURL + "/read");
    allOrders = await response.json();
    for (let i = 0; i < allOrders.length; i++) {
        allOrders[i]._personalData;
        orderDiv.appendChild(createOrderEntry(allOrders[i]));
    }
    function createOrderEntry(_completeOrder) {
        let orderRow = document.createElement("tr");
        orderRow.setAttribute("_id", _completeOrder._id);
        let topping = "";
        if (_completeOrder._icecream._topping != "NOTHING") {
            topping = " with " + _completeOrder._icecream._topping;
        }
        let iceCream = document.createElement("td");
        iceCream.innerHTML = _completeOrder._icecream._iceballs + " in " + _completeOrder._icecream._container + topping;
        let name = document.createElement("td");
        name.innerHTML = _completeOrder._personalData._firstName + " " + _completeOrder._personalData._lastName;
        let phone = document.createElement("td");
        phone.innerHTML = _completeOrder._personalData._phone;
        let address = document.createElement("td");
        address.innerHTML = _completeOrder._personalData._address;
        let editCell = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.setAttribute("id", _completeOrder._id);
        editButton.addEventListener("click", () => {
            sessionStorage.setItem("editorder", JSON.stringify(_completeOrder));
        });
        editButton.innerText = "Bearbeiten";
        editCell.appendChild(editButton);
        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-" + _completeOrder._id);
        deleteButton.addEventListener("click", () => deleteOrder(_completeOrder._id));
        deleteButton.innerHTML = "<a href='#'>Löschen</a>";
        deleteCell.appendChild(deleteButton);
        orderRow.appendChild(iceCream);
        orderRow.appendChild(name);
        orderRow.appendChild(phone);
        orderRow.appendChild(address);
        orderRow.appendChild(editCell);
        orderRow.appendChild(deleteCell);
        return orderRow;
    }
    table.appendChild(orderDiv);
}
async function deleteOrder(_id) {
    console.log("Altered ORDER!");
    let formData = new FormData();
    formData.append("id", _id);
    // tslint:disable-next-line: no-any
    let query = new URLSearchParams(formData);
    await fetch("http://localhost:8100" + "/delete?" + query);
    window.location.href = "showOrders.html?message=2";
}
//# sourceMappingURL=showOrders.js.map