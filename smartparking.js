const gridContainer = document.getElementById('parking-grid');
const numColumns = 5;
const spotsPerColumn = 36; // 2 filas x 18 lugares = 36 lugares por columna (180 total)

function initParking() {
    gridContainer.innerHTML = '';
    let spotNumber = 1;

    // 1. Creamos las 5 columnas
    for (let col = 0; col < numColumns; col++) {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column-block';

        // 2. Dentro de cada columna, creamos los 36 lugares (2 filas de 18)
        for (let i = 0; i < spotsPerColumn; i++) {
            const spot = document.createElement('div');
            spot.className = 'spot';
            spot.textContent = spotNumber;
            spotNumber++;

            // Estado inicial aleatorio
            if (Math.random() < 0.5) {
                spot.classList.add('occupied');
            } else {
                spot.classList.add('available');
            }

            // Clic manual para cambiar estado
            spot.addEventListener('click', function() {
                toggleSpot(spot);
                updateDashboard();
            });

            columnDiv.appendChild(spot);
        }

        gridContainer.appendChild(columnDiv);
    }

    updateDashboard();
}

// Función sencilla para alternar entre verde y rojo
function toggleSpot(spot) {
    if (spot.classList.contains('available')) {
        spot.classList.remove('available');
        spot.classList.add('occupied');
    } else {
        spot.classList.remove('occupied');
        spot.classList.add('available');
    }
}

// Actualizar los 4 datos del Dashboard (Total, Available, Occupied y %)
function updateDashboard() {
    const total = document.querySelectorAll('.spot').length;
    const available = document.querySelectorAll('.spot.available').length;
    const occupied = document.querySelectorAll('.spot.occupied').length;
    const percentage = Math.round((occupied / total) * 100);

    document.getElementById('total').textContent = total;
    document.getElementById('available').textContent = available;
    document.getElementById('occupied').textContent = occupied;
    document.getElementById('percentage').textContent = percentage + '%';
}

// Simulación automática cada 3 segundos (requisito de la práctica)
setInterval(function() {
    const allSpots = document.querySelectorAll('.spot');
    const randomIndex = Math.floor(Math.random() * allSpots.length);
    toggleSpot(allSpots[randomIndex]);
    updateDashboard();
}, 3000);

// Arrancar la página
initParking();