"use strict";
var shop;
(function (shop) {
    let sundaeCheckBox;
    let ball1Select;
    let ball2Select;
    let ball3Select;
    let coneSelected = true;
    setUpVars();
    let canvas = document.getElementById('productCanvas');
    let context = canvas.getContext("2d");
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;
    let iceBalls;
    drawPreview();
    function setUpVars() {
        sundaeCheckBox = document.getElementById("sundae");
        sundaeCheckBox.addEventListener("change", () => setConeMode(!sundaeCheckBox.checked));
        ball1Select = document.getElementById("ball1");
        ball2Select = document.getElementById("ball2");
        ball3Select = document.getElementById("ball3");
        ball1Select.addEventListener("change", () => drawPreview());
        ball2Select.addEventListener("change", () => drawPreview());
        ball3Select.addEventListener("change", () => drawPreview());
    }
    function drawPreview() {
        setBalls();
        if (coneSelected) {
            drawCone(iceBalls);
        }
        else {
            drawSundae(iceBalls);
        }
    }
    function drawCone(iceBalls) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(centerX, canvas.height - 20);
        context.lineTo(canvas.width - 40, 120);
        context.lineTo(40, 120);
        context.fillStyle = '#FE8C4D';
        context.fill();
        drawIceBalls(iceBalls);
    }
    function drawSundae(iceBalls) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawIceBalls(iceBalls);
        context.beginPath();
        context.arc(centerX, centerY - 10, 70, 0, Math.PI, false);
        context.rect(centerX - 5, centerY + 50, 10, 50);
        context.rect(centerX - 20, centerY + 90, 40, 10);
        context.closePath();
        context.fillStyle = '#615553';
        context.fill();
    }
    function drawIceBalls(iceBalls) {
        if (iceBalls.length == 1) {
            iceBalls[0].size = 60;
        }
        for (let i = 0; i < iceBalls.length; i++) {
            if (iceBalls.length == 2) {
                iceBalls[i].position = i + 1;
            }
            else {
                iceBalls[i].position = i;
            }
        }
        for (let i = 0; i < iceBalls.length; i++) {
            let posX = centerX;
            let posY = centerY - 70;
            switch (iceBalls[i].position) {
                case 0:
                    posY = posY + 20;
                    // adjust position of single ball in sundae
                    if (iceBalls.length == 1 && !coneSelected) {
                        posY = posY + 40;
                    }
                    break;
                case 1:
                    posX = posX - 20;
                    posY = posY + 50;
                    break;
                case 2:
                    posX = posX + 20;
                    posY = posY + 50;
                    break;
            }
            context.beginPath();
            context.arc(posX, posY, iceBalls[i].size, 0, 2 * Math.PI, false);
            context.fillStyle = iceBalls[i].color;
            context.fill();
        }
    }
    function setBalls() {
        iceBalls = [];
        if (ball1Select.value.length > 0) {
            addBall(ball1Select.value);
        }
        if (ball2Select.value.length > 0) {
            addBall(ball2Select.value);
        }
        if (ball3Select.value.length > 0) {
            addBall(ball3Select.value);
        }
    }
    function setConeMode(_active) {
        coneSelected = _active;
        console.log("Cone set to: " + _active);
        drawPreview();
    }
    function getColorOfBall(_ballname) {
        switch (_ballname) {
            case "chocolate":
                return "#6D4C41";
            case "mango":
                return "#FFC107";
            case "raspberry":
                return "#FF7777";
            case "vanillie":
                return "#fff";
        }
        return "#fff";
    }
    function addBall(_name) {
        iceBalls.push(new shop.IceBall(_name, getColorOfBall(_name), 40));
    }
})(shop || (shop = {}));
//# sourceMappingURL=order.js.map