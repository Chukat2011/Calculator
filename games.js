const gameCanvas = document.getElementById('gameCanvas');
const gameCtx = gameCanvas.getContext('2d');

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

const player = {
    x: 1.5,
    y: 1.5,
    angle: 0
};

const FOV = Math.PI / 3;
const numRays = gameCanvas.width;
const rayLength = 20;

function moveForward() {
    const newX = player.x + Math.cos(player.angle) * 0.1;
    const newY = player.y + Math.sin(player.angle) * 0.1;
    if (map[Math.floor(newY)][Math.floor(newX)] === 0) {
        player.x = newX;
        player.y = newY;
    }
    render();
}

function moveBackward() {
    const newX = player.x - Math.cos(player.angle) * 0.1;
    const newY = player.y - Math.sin(player.angle) * 0.1;
    if (map[Math.floor(newY)][Math.floor(newX)] === 0) {
        player.x = newX;
        player.y = newY;
    }
    render();
}

function turnLeft() {
    player.angle -= 0.1;
    render();
}

function turnRight() {
    player.angle += 0.1;
    render();
}

function render() {
    gameCtx.fillStyle = 'black';
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let i = 0; i < numRays; i++) {
        const rayAngle = player.angle - FOV / 2 + FOV * i / numRays;
        let distance = 0;
        let hitWall = false;

        while (!hitWall && distance < rayLength) {
            distance += 0.1;
            const testX = player.x + Math.cos(rayAngle) * distance;
            const testY = player.y + Math.sin(rayAngle) * distance;
            if (map[Math.floor(testY)][Math.floor(testX)] > 0) {
                hitWall = true;
            }
        }

        const wallHeight = gameCanvas.height / distance;
        const wallTop = (gameCanvas.height - wallHeight) / 2;
        const wallBottom = wallTop + wallHeight;

        gameCtx.fillStyle = 'white';
        gameCtx.fillRect(i, wallTop, 1, wallHeight);
    }
}

render();