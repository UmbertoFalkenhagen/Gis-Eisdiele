"use strict";
//let serverURL = "http://localhost:8100";
let serverURL = "https://umbertofalkenhagengis.herokuapp.com";
let btn = document.getElementById("submitButton");
let form = document.getElementById("form");
btn.addEventListener("click", () => sendDataToServer());
async function sendDataToServer() {
    let formData = new FormData(form);
    // tslint:disable-next-line: no-any
    let query = new URLSearchParams(formData);
    await fetch(serverURL + "/insert?" + query);
    window.location.href = "index.html?message=1";
}
//# sourceMappingURL=submit.js.map