let serverURL = "http://localhost:8100";
let btn = document.getElementById("submitButton");
let form = <HTMLFormElement>document.getElementById("form");
btn!.addEventListener("click", () => sendDataToServer());

async function sendDataToServer() {
    let formData: FormData = new FormData(form);
    // tslint:disable-next-line: no-any
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    await fetch(serverURL + "/insert?" + query);
    window.location.href = "index.html?message=1";
}
