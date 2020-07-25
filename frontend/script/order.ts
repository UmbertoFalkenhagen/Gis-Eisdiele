namespace shop {

    let sundaeCheckBox: HTMLInputElement | null;
    let ball1Select: HTMLSelectElement | null;
    let ball2Select: HTMLSelectElement | null;
    let ball3Select: HTMLSelectElement | null;
    let coneSelected: boolean = true;
    setUpVars();
    let canvas = document.getElementById('productCanvas') as
        HTMLCanvasElement;
    let context = canvas.getContext("2d")!;
    let centerX: number = canvas.width / 2;
    let centerY: number = canvas.height / 2;
    let iceBalls: Array<IceBall>;
    drawPreview();

    function setUpVars(): void {
        sundaeCheckBox = <HTMLInputElement>document.getElementById("sundae");
        sundaeCheckBox!.addEventListener("change", () => setConeMode(!sundaeCheckBox!.checked));
        ball1Select = document.getElementById("ball1") as HTMLSelectElement;
        ball2Select = document.getElementById("ball2") as HTMLSelectElement;
        ball3Select = document.getElementById("ball3") as HTMLSelectElement;
        ball1Select.addEventListener("change", () => drawPreview());
        ball2Select.addEventListener("change", () => drawPreview());
        ball3Select.addEventListener("change", () => drawPreview());

    }

    function drawPreview() {
        setBalls();
        if (coneSelected) {
            drawCone(iceBalls);
        } else {
            drawSundae(iceBalls);
        }

    }

    function drawCone(iceBalls: IceBall[]): void {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(centerX, canvas.height - 20);
        context.lineTo(canvas.width - 40, 120);
        context.lineTo(40, 120);
        context.fillStyle = '#FE8C4D';
        context.fill();
        drawIceBalls(iceBalls);
    }

    function drawSundae(iceBalls: IceBall[]): void {
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

    function drawIceBalls(iceBalls: IceBall[]): void {
        if (iceBalls.length == 1) {
            iceBalls[0].size = 60;
        }
        for (let i: number = 0; i < iceBalls.length; i++) {
            if (iceBalls.length == 2) {
                iceBalls[i].position = i + 1;
            } else {
                iceBalls[i].position = i;
            }
        }

        for (let i: number = 0; i < iceBalls.length; i++) {
            let posX: number = centerX;
            let posY: number = centerY - 70;
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
        if (ball1Select!.value.length > 0) {
            addBall(ball1Select!.value);
        }
        if (ball2Select!.value.length > 0) {
            addBall(ball2Select!.value);
        }
        if (ball3Select!.value.length > 0) {
            addBall(ball3Select!.value);
        }
    }

    function setConeMode(_active: boolean): void {
        coneSelected = _active;
        drawPreview();
    }

    function getColorOfBall(_ballname: string): string {
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

    function addBall(_name: string): void {
        iceBalls.push(new IceBall(_name, getColorOfBall(_name), 40));
    }

}
