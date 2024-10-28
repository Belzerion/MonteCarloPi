

function clearCanvas()
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    document.getElementById("pi").value = "";
    document.getElementById("points").value = "";
    drawAxesAndCircle();
}

function drawAxesAndCircle()
{
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    
    ctx.beginPath();
    ctx.moveTo(0,300);
    ctx.lineTo(600,300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(300,0);
    ctx.lineTo(300,600);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300, 300, 300, 0, 2 * Math.PI);
    ctx.stroke();
}

function checkIn(point)
{
    if (Math.sqrt(Math.pow(point.x-300, 2) + Math.pow(point.y-300, 2)) <= 300 )
    {
        return true;
    }
    return false;
}


function simulation()
{
    const pointsNumber = document.getElementById("points").value;
    const canvas = document.getElementById("canvas");
    const piEst = document.getElementById("pi");

    const ctx = canvas.getContext("2d");

    pointsIn = 0;
    pointsOut = 0;

    // Liste des points à afficher (exemple de points aléatoires)
    const points = Array.from({ length: pointsNumber }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
    }));

    // Paramètres d'animation
    const duration = 5000; // Durée totale d'affichage en millisecondes
    interval = duration / points.length; // Intervalle d'affichage entre chaque point
    if (interval >= 100) interval = 50;
    let currentIndex = 0;

    // Fonction pour dessiner un point sur le canevas
    function drawPoint(point) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI); // point de rayon 5
        ctx.fillStyle = "red"; // couleur du point
        ctx.fill();
    }

    // Intervalle pour afficher chaque point progressivement
    const displayInterval = setInterval(() => {
        if (currentIndex < points.length) {
            drawPoint(points[currentIndex]);
            checkIn(points[currentIndex]) ? pointsIn++ : pointsOut++;
            piEst.value=4*pointsIn/(pointsIn + pointsOut);
            currentIndex++;
        } else {
            clearInterval(displayInterval); // Stop l'intervalle quand tous les points sont affichés
        }
    }, interval);

    document.getElementById("stop").addEventListener("click", () =>
    {
        clearInterval(displayInterval);
    });
}

drawAxesAndCircle();




