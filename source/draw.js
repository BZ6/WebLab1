canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
draw();

function draw() {
    context.clearRect(0, 0, 1000, 1000);

    context.fillStyle = "rgba(91,95,201,0.58)";
    context.beginPath();
    context.moveTo(150, 70);

    //сектор круга
    context.arc(150, 70, 50, -4.7, 4 * Math.PI / 2, true);

    //прмоугольник
    context.fillRect(150, 45, 50, 25);

    //треугольник
    context.moveTo(150,70);
    context.lineTo(100,70);
    context.lineTo(150,95);
    context.fill();
    context.fillStyle = "black";
    context.beginPath();

    //линяя x
    context.moveTo(150,70);
    context.lineTo(220,70);

    //стрелка
    context.lineTo(215,75);
    context.moveTo(220,70);
    context.lineTo(215,65);

    context.fillText('X',220,65);
    context.moveTo(150,70);
    context.lineTo(80,70);

    //значения X
    context.moveTo(175,75);
    context.lineTo(175,65);
    context.fillText("R / 2" ,170,63);
    context.moveTo(200,75);
    context.lineTo(200,65);
    context.fillText("R",197,63);

    context.moveTo(125,75);
    context.lineTo(125,65);
    context.fillText("-R / 2" ,114,63);
    context.moveTo(100,75);
    context.lineTo(100,65);
    context.fillText("-R",96,63);

    //леняя Y
    context.moveTo(150,70);
    context.lineTo(150,140);
    context.moveTo(150,70);
    context.lineTo(150,5);
    //стрелка
    context.lineTo(155,10);
    context.moveTo(150,5);
    context.lineTo(145,10);
    context.fillText('Y',155,15);

    //значения X
    context.moveTo(145,95);
    context.lineTo(155,95);
    context.fillText("-R / 2" ,160,100);
    context.moveTo(145,120);
    context.lineTo(155,120);
    context.fillText("-R" ,160,123);

    context.moveTo(145,45);
    context.lineTo(155,45);
    context.fillText("R / 2",160,48);
    context.moveTo(145,20);
    context.lineTo(155,20);
    context.fillText("R",160,25);

    context.closePath();
    context.stroke();
}