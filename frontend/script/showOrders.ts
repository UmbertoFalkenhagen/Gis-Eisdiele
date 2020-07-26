import {CompleteOrder} from "./CompleteOrder";
let serverURL = "https://umbertofalkenhagengis.herokuapp.com";

loadAllOrders();

let table: HTMLTableElement = <HTMLTableElement>document.getElementById("table")!;
let orderDiv: HTMLDivElement = <HTMLDivElement>document.createElement("orderDiv")!;

let tableHead: HTMLTableRowElement = document.createElement("tr");
tableHead.innerHTML = " <tr>\n" +
    "                <th>Bestellung</th>\n" +
    "                <th>Name</th>\n" +
    "                <th>Telefonnummer</th>\n" +
    "                <th>Adresse</th>\n" +
    "                <th></th>\n" +
    "                <th></th>\n" +
    "            </tr>"
orderDiv.appendChild(tableHead);

let allOrders: CompleteOrder[] = [];

async function loadAllOrders(): Promise<void> {
    let response: Response = await fetch(serverURL + "/read");
    allOrders = await response.json();
    for (let i = 0; i < allOrders.length; i++) {
        allOrders[i]._personalData;
        orderDiv.appendChild(createOrderEntry(allOrders[i]))
    }


    function createOrderEntry(_completeOrder: CompleteOrder): HTMLElement {
        let orderRow: HTMLTableRowElement = document.createElement("tr");
        orderRow.setAttribute("_id", _completeOrder._id);

        let topping: string = "";
        if (_completeOrder._icecream._topping != "NOTHING") {
            topping = " with " + _completeOrder._icecream._topping;
        }

        let iceCream: HTMLTableCellElement = document.createElement("td");
        iceCream.innerHTML = _completeOrder._icecream._iceballs + " in " + _completeOrder._icecream._container + topping;

        let name: HTMLTableCellElement = document.createElement("td");
        name.innerHTML = _completeOrder._personalData._firstName + " " + _completeOrder._personalData._lastName;

        let phone: HTMLTableCellElement = document.createElement("td");
        phone.innerHTML = _completeOrder._personalData._phone;

        let address: HTMLTableCellElement = document.createElement("td");
        address.innerHTML = _completeOrder._personalData._address;

        let editCell: HTMLTableCellElement = document.createElement("td");
        let editButton: HTMLButtonElement = document.createElement("button");
        editButton.setAttribute("id", _completeOrder._id);
        editButton.addEventListener("click", () => {
            sessionStorage.setItem("editorder", JSON.stringify(_completeOrder));
        });
        editButton.innerText = "Bearbeiten";
        editCell.appendChild(editButton);

        let deleteCell: HTMLTableCellElement = document.createElement("td");
        let deleteButton: HTMLButtonElement = document.createElement("button");
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

async function deleteOrder(_id: string) {
    console.log("Altered ORDER!")
    let formData: FormData = new FormData();
    formData.append("id", _id);
    // tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    await fetch("http://localhost:8100" + "/delete?" + query);
    window.location.href = "showOrders.html?message=2";
}
