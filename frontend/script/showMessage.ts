let messageDiv: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("messageText");

let queryString = window.location.search;

let urlParams = new URLSearchParams(queryString);

let messageNumber = urlParams.get('message')

let message = "";

switch (messageNumber) {
    case "1":
        message = "Ihre Bestellung wurde registriert.";
        break;
    case "2":
        message = "Die Bestellung wurde gelöscht!"
        break;
    case "3":
        message = "Die Bestellung wurde bearbeitet."
        break;

}


messageDiv.innerText = message;