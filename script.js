// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
pointLight.position.set(25, 50, 25);
scene.add(pointLight);
const spotlight = new THREE.SpotLight(0x00ffff, 1, 100, Math.PI / 6, 0.5);
spotlight.position.set(25, 20, 25);
scene.add(spotlight);
// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = true;
controls.enabled = true;
controls.enableRotate = false;
// Grid setup
const gridSize = 51;
const visibleGridSize = 50;
const gridSpacing = 1;
const gridGeometry = new THREE.BufferGeometry();
const gridMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });
const vertices = [];
for (let i = 0; i <= visibleGridSize; i++) {
    vertices.push(i * gridSpacing, 0, 0);
    vertices.push(i * gridSpacing, 0, visibleGridSize * gridSpacing);
    vertices.push(0, 0, i * gridSpacing);
    vertices.push(visibleGridSize * gridSpacing, 0, i * gridSpacing);
}
gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
scene.add(grid);
// Vertical Grid setup (initially hidden)
const verticalGridGeometry = new THREE.BufferGeometry();
const verticalGridVertices = [];
for (let i = 0; i <= visibleGridSize; i++) {
    verticalGridVertices.push(i * gridSpacing, 0, 0);
    verticalGridVertices.push(i * gridSpacing, visibleGridSize * gridSpacing, 0);
}
for (let i = 0; i <= visibleGridSize; i++) {
    verticalGridVertices.push(0, i * gridSpacing, 0);
    verticalGridVertices.push(visibleGridSize * gridSpacing, i * gridSpacing, 0);
}
verticalGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verticalGridVertices, 3));
const verticalGrid = new THREE.LineSegments(verticalGridGeometry, gridMaterial.clone());
verticalGrid.position.set(0, 0, 0);
verticalGrid.visible = false;
scene.add(verticalGrid);
// South Vertical Grid (at z=visibleGridSize)
const southGridGeometry = new THREE.BufferGeometry();
const southGridVertices = [];
for (let i = 0; i <= visibleGridSize; i++) {
    southGridVertices.push(i * gridSpacing, 0, visibleGridSize * gridSpacing);
    southGridVertices.push(i * gridSpacing, visibleGridSize * gridSpacing, visibleGridSize * gridSpacing);
}
for (let i = 0; i <= visibleGridSize; i++) {
    southGridVertices.push(0, i * gridSpacing, visibleGridSize * gridSpacing);
    southGridVertices.push(visibleGridSize * gridSpacing, i * gridSpacing, visibleGridSize * gridSpacing);
}
southGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(southGridVertices, 3));
const southGrid = new THREE.LineSegments(southGridGeometry, gridMaterial.clone());
southGrid.position.set(0, 0, 0);
southGrid.visible = false;
scene.add(southGrid);
// West Vertical Grid (at x=0)
const westGridGeometry = new THREE.BufferGeometry();
const westGridVertices = [];
for (let i = 0; i <= visibleGridSize; i++) {
    westGridVertices.push(0, 0, i * gridSpacing);
    westGridVertices.push(0, visibleGridSize * gridSpacing, i * gridSpacing);
}
for (let i = 0; i <= visibleGridSize; i++) {
    westGridVertices.push(0, i * gridSpacing, 0);
    westGridVertices.push(0, i * gridSpacing, visibleGridSize * gridSpacing);
}
westGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(westGridVertices, 3));
const westGrid = new THREE.LineSegments(westGridGeometry, gridMaterial.clone());
westGrid.position.set(0, 0, 0);
westGrid.visible = false;
scene.add(westGrid);
// East Vertical Grid (at x=visibleGridSize)
const eastGridGeometry = new THREE.BufferGeometry();
const eastGridVertices = [];
for (let i = 0; i <= visibleGridSize; i++) {
    eastGridVertices.push(visibleGridSize * gridSpacing, 0, i * gridSpacing);
    eastGridVertices.push(visibleGridSize * gridSpacing, visibleGridSize * gridSpacing, i * gridSpacing);
}
for (let i = 0; i <= visibleGridSize; i++) {
    eastGridVertices.push(visibleGridSize * gridSpacing, i * gridSpacing, 0);
    eastGridVertices.push(visibleGridSize * gridSpacing, i * gridSpacing, visibleGridSize * gridSpacing);
}
eastGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(eastGridVertices, 3));
const eastGrid = new THREE.LineSegments(eastGridGeometry, gridMaterial.clone());
eastGrid.position.set(0, 0, 0);
eastGrid.visible = false;
scene.add(eastGrid);
// Roof Grid (at y=visibleGridSize)
const roofGridGeometry = new THREE.BufferGeometry();
const roofGridVertices = [];
for (let i = 0; i <= visibleGridSize; i++) {
    roofGridVertices.push(0, visibleGridSize * gridSpacing, i * gridSpacing);
    roofGridVertices.push(visibleGridSize * gridSpacing, visibleGridSize * gridSpacing, i * gridSpacing);
}
for (let i = 0; i <= visibleGridSize; i++) {
    roofGridVertices.push(i * gridSpacing, visibleGridSize * gridSpacing, 0);
    roofGridVertices.push(i * gridSpacing, visibleGridSize * gridSpacing, visibleGridSize * gridSpacing);
}
roofGridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(roofGridVertices, 3));
const roofGrid = new THREE.LineSegments(roofGridGeometry, gridMaterial.clone());
roofGrid.position.set(0, 0, 0);
roofGrid.visible = false;
scene.add(roofGrid);
// Variables to track grid addition
const grids = [
    { name: "north", grid: verticalGrid, added: false, spawnTime: 60 },
    { name: "south", grid: southGrid, added: false, spawnTime: 120 },
    { name: "west", grid: westGrid, added: false, spawnTime: 180 },
    { name: "east", grid: eastGrid, added: false, spawnTime: 240 },
    { name: "roof", grid: roofGrid, added: false, spawnTime: 300 }
];
let lastGridAddTime = Infinity;
// Celestial Star Map
const starMapRadius = visibleGridSize;
const starMapHeight = 50;
const starMapGeometry = new THREE.CylinderGeometry(starMapRadius, starMapRadius, starMapHeight, 32, 1, true);
const starMapMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.8
});
const starMap = new THREE.Mesh(starMapGeometry, starMapMaterial);
starMap.position.set(visibleGridSize / 2, starMapHeight / 2, visibleGridSize / 2);
scene.add(starMap);
// Generate Starfield Texture
function createStarfieldTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 500; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
}
starMapMaterial.map = createStarfieldTexture();
starMapMaterial.needsUpdate = true;
// Player setup (Blue AI)
const playerGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const playerMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 1.5,
    roughness: 0.5
});
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);
// AI setup (Red AI)
const aiGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const aiMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 1.5,
    roughness: 0.5
});
const aiPlayers = [];
let aiCount = 1;
let lastAISpawnTime = 0;
function spawnAI() {
    const ai = new THREE.Mesh(aiGeometry, aiMaterial);
    let x = 0;
    let z = 0;
    if (!loadScreenMode && aiCount > 1) {
        x = Math.floor(Math.random() * gridSize);
        z = Math.floor(Math.random() * gridSize);
    }
    ai.position.set(x, 0.2, z);
    scene.add(ai);
    aiPlayers.push({
        mesh: ai,
        x: x,
        z: z,
        xAccum: 0,
        zAccum: 0,
        trailPoints: [],
        speed: loadScreenMode ? aiBaseSpeed * 1.0 : aiBaseSpeed,
        stepToggle: true
    });
    aiCount++;
}
// Orbs
const yellowOrbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const yellowOrbMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 2,
    roughness: 0.5
});
let yellowOrb = null;
let yellowOrbSpawnTime = Infinity;
let speedBoostEndTime = 0;
const blueOrbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const blueOrbMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    emissive: 0x0000ff,
    emissiveIntensity: 2,
    roughness: 0.5
});
let blueOrb = null;
let blueOrbSpawnTime = Infinity;
let fleeEndTime = 0;
const orangeOrbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const orangeOrbMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 2,
    roughness: 0.5
});
let orangeOrb = null;
let orangeOrbSpawnTime = Infinity;
let doubleDamageEndTime = 0;
const whiteOrbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const whiteOrbMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 2,
    roughness: 0.5
});
let whiteOrb = null;
let whiteOrbSpawnTime = Infinity;
const oneUpOrbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const oneUpOrbMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    emissive: 0x00ffff,
    emissiveIntensity: 2,
    roughness: 0.5
});
let oneUpOrb = null;
const shieldOrbGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const shieldOrbMaterial = new THREE.MeshStandardMaterial({
    color: 0xff00ff,
    emissive: 0xff00ff,
    emissiveIntensity: 2,
    roughness: 0.5
});
let shieldOrb = null;
let shieldEndTime = 0;
let orbCollectedBy = null;
// Shield Halo
const shieldHaloGeometry = new THREE.RingGeometry(0.6, 0.8, 32);
const shieldHaloMaterial = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide
});
const shieldHalo = new THREE.Mesh(shieldHaloGeometry, shieldHaloMaterial);
shieldHalo.rotation.x = -Math.PI / 2;
shieldHalo.position.y = 0.8;
shieldHalo.visible = false;
scene.add(shieldHalo);
// Trails
const playerTrailMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 });
const aiTrailMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 });
const playerTrailPoints = [];
const maxTrailLength = 10;
// Particles
const particleGeometry = new THREE.BufferGeometry();
const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.1, transparent: true, opacity: 0.8 });
const particles = [];
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);
const aiParticleMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1, transparent: true, opacity: 0.8 });
const aiParticles = [];
const aiParticleSystem = new THREE.Points(particleGeometry.clone(), aiParticleMaterial);
scene.add(aiParticleSystem);
const orbParticleGeometry = new THREE.BufferGeometry();
const orbParticleMaterial = new THREE.PointsMaterial({ color: 0xffff00, size: 0.2, transparent: true, opacity: 1 });
const orbParticles = [];
const orbParticleSystem = new THREE.Points(orbParticleGeometry, orbParticleMaterial);
scene.add(orbParticleSystem);
// Collapsing sections
const collapseMaterial = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 1,
    transparent: true,
    opacity: 0
});
const INITIAL_COLLAPSE_SIZES = [
    { width: 1, height: 1 }, { width: 1, height: 1 }, { width: 1, height: 2 }, { width: 1, height: 2 },
    { width: 2, height: 2 }, { width: 2, height: 2 }, { width: 4, height: 4 }, { width: 4, height: 4 }
];
let collapseSizes = [...INITIAL_COLLAPSE_SIZES];
let collapseSections = [];
let collapseStartTime = 0;
let lastCollapseAddTime = 0;
const collapseSectionCap = 10;
// Game state
let playerX = gridSize - 1;
let playerZ = gridSize - 1;
let playerBaseSpeed = 1;
let playerSpeed = playerBaseSpeed;
let aiBaseSpeed = 0.2376;
let lives = 3;
let gameOver = false;
let gameStarted = false;
let loadScreenMode = true;
let playerAIActive = false;
let playerMoved = false;
let shiftPressed = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let lastTime = 0;
let gameStartTime = 0;
let firstMoveTime = 0;
let paused = false;
let lastSpeedUpdate = 0;
let orbTimersStarted = false;
let oneUpOrbSpawnTime = Infinity;
let shieldOrbSpawnTime = Infinity;
let playerStepToggle = true;
let chaseStepToggle = true;
let isOrbiting = false;
let playerXAccum = 0;
let playerZAccum = 0;
let cameraMode = 'chase';
let directionX = 0;
let directionZ = -1;
let lastCameraMode = null;
// Updated variables for Blue AI logic
let lastPlayerMoveTime = 0;
let playerTargetX = gridSize / 2;
let playerTargetZ = gridSize / 2;
const moveInterval = 33;
let initialMoveDone = false;
let blueStepToggle = true;
const keysPressed = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false };
// Camera control functions
function setChaseView() {
    const offsetDistance = 15;
    const offsetY = 10;
    const targetX = playerX - (directionX * offsetDistance);
    const targetY = offsetY;
    const targetZ = playerZ - (directionZ * offsetDistance);
    camera.position.set(targetX, targetY, targetZ);
    camera.lookAt(playerX, 0.2, playerZ);
    camera.zoom = 1.2;
    camera.updateProjectionMatrix();
    controls.target.set(playerX, 0.2, playerZ);
}
function updateCamera(time) {
    if (loadScreenMode) {
        controls.update();
    } else if (gameStarted && !gameOver && !paused) {
        if (cameraMode === 'chase') {
            const offsetDistance = 15;
            const offsetY = 10;
            const targetX = playerX - (directionX * offsetDistance);
            const targetY = offsetY;
            const targetZ = playerZ - (directionZ * offsetDistance);
            camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
            camera.lookAt(playerX, 0.2, playerZ);
            controls.target.set(playerX, 0.2, playerZ);
            controls.enabled = false;
        } else if (cameraMode === 'free') {
            controls.target.set(playerX, 0.2, playerZ);
            controls.enabled = true;
            controls.update();
        }
        spotlight.position.set(playerX, 20, playerZ);
        spotlight.target.position.set(playerX, 0, playerZ);
        spotlight.target.updateMatrixWorld();
    }
}
function startOrbiting() {
    isOrbiting = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = true;
    controls.panSpeed = 0.1;
    controls.target.set((visibleGridSize - 1) / 2, 0, (visibleGridSize - 1) / 2);
    camera.position.set(40, 40, 40);
    camera.zoom = 1.5;
    camera.updateProjectionMatrix();
}
function stopOrbiting() {
    isOrbiting = false;
    controls.autoRotate = false;
    controls.enablePan = false;
    controls.enableRotate = true;
}
// Initial setup
player.position.set(playerX, 0.2, playerZ);
spotlight.target = player;
spawnAI();
startOrbiting();
playerAIActive = true;
renderer.render(scene, camera);
// UI elements
const startScreen = document.getElementById('startScreen');
const hud = document.getElementById('hud');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const highScoreDisplay = document.getElementById('highScore');
const speedBoostIndicator = document.getElementById('speedBoostIndicator').querySelector('span');
const fleeIndicator = document.getElementById('fleeIndicator').querySelector('span');
const doubleDamageIndicator = document.getElementById('doubleDamageIndicator').querySelector('span');
const pauseScreen = document.getElementById('pauseScreen');
const powerUps = document.getElementById('powerUps');
const pauseButton = document.getElementById('pauseButton');
let gameOverScreen = null;
highScoreDisplay.textContent = `HIGH SCORE: ${Math.floor(highScore)}`;
livesDisplay.textContent = `LIVES: ${lives}`;
// Event listeners
document.getElementById('startButton').addEventListener('click', () => {
    stopOrbiting();
    startGame();
});
document.getElementById('pauseButton').addEventListener('click', togglePause);
document.getElementById('resumePauseButton').addEventListener('click', togglePause);
document.getElementById('restartPauseButton').addEventListener('click', resetGame);
document.getElementById('exitPauseButton').addEventListener('click', () => {
    togglePause();
    resetGame();
});
document.getElementById('highScoresButton').addEventListener('click', showLeaderboard);
document.getElementById('closeLeaderboardButton').addEventListener('click', hideLeaderboard);
document.getElementById('instructionsButton').addEventListener('click', showInstructions);
document.getElementById('closeInstructionsButton').addEventListener('click', hideInstructions);
// Instructions functions
function showInstructions() {
    const instructionsScreen = document.getElementById('instructionsScreen');
    instructionsScreen.classList.remove('hidden');
    setTimeout(() => instructionsScreen.classList.add('visible'), 10);
}
function hideInstructions() {
    const instructionsScreen = document.getElementById('instructionsScreen');
    instructionsScreen.classList.remove('visible');
    setTimeout(() => instructionsScreen.classList.add('hidden'), 500);
}
// Leaderboard management
function loadLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    return leaderboard;
}
function saveLeaderboard(leaderboard) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
}
function updateLeaderboard(newScore) {
    let leaderboard = loadLeaderboard();
    const qualifies = leaderboard.length < 10 || newScore > Math.min(...leaderboard.map(entry => entry.score));
    if (qualifies) {
        let name = prompt("New High Score! Enter 3 letters:", "AAA");
        if (name) {
            name = name.toUpperCase().slice(0, 3).padEnd(3, ' ');
            leaderboard.push({ name, score: Math.floor(newScore) });
            leaderboard.sort((a, b) => b.score - a.score);
            saveLeaderboard(leaderboard);
        }
    }
}
function displayLeaderboard() {
    const leaderboard = loadLeaderboard();
    const list = document.getElementById('leaderboardList');
    list.innerHTML = '';
    leaderboard.slice(0, 10).forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        list.appendChild(li);
    });
}
function showLeaderboard() {
    const leaderboardScreen = document.getElementById('leaderboardScreen');
    displayLeaderboard();
    leaderboardScreen.classList.remove('hidden');
    setTimeout(() => leaderboardScreen.classList.add('visible'), 10);
}
function hideLeaderboard() {
    const leaderboardScreen = document.getElementById('leaderboardScreen');
    leaderboardScreen.classList.remove('visible');
    setTimeout(() => leaderboardScreen.classList.add('hidden'), 500);
}
// Audio setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let backgroundAudioScheduled = false;
let baseUnit = 0.2;
let lastRhythmUpdate = 0;
function scheduleMorseCodeTRON(startTime) {
    const morseTRON = [
        { duration: 3 * baseUnit, gap: baseUnit }, { duration: baseUnit, gap: baseUnit },
        { duration: 3 * baseUnit, gap: baseUnit }, { duration: baseUnit, gap: baseUnit },
        { duration: 3 * baseUnit, gap: baseUnit }, { duration: 3 * baseUnit, gap: baseUnit },
        { duration: 3 * baseUnit, gap: baseUnit }, { duration: 3 * baseUnit, gap: baseUnit },
        { duration: baseUnit, gap: baseUnit }
    ];
    let currentTime = startTime;
    morseTRON.forEach((pulse, index) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, currentTime);
        gainNode.gain.setValueAtTime(0.05, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + pulse.duration);
        osc.start(currentTime);
        osc.stop(currentTime + pulse.duration);
        currentTime += pulse.duration + pulse.gap;
        if (index === 0 || index === 3 || index === 6 || index === 8) currentTime += 2 * baseUnit;
        if (index === morseTRON.length - 1) currentTime += 6 * baseUnit;
    });
    const loopDuration = currentTime - startTime;
    setTimeout(() => { if (backgroundAudioScheduled) scheduleMorseCodeTRON(audioCtx.currentTime); }, loopDuration * 1000);
}
function startBackgroundMusic() {
    if (!backgroundAudioScheduled) {
        gameStartTime = performance.now();
        lastRhythmUpdate = gameStartTime;
        lastSpeedUpdate = gameStartTime;
        scheduleMorseCodeTRON(audioCtx.currentTime);
        backgroundAudioScheduled = true;
    }
}
function stopBackgroundMusic() {
    backgroundAudioScheduled = false;
    baseUnit = 0.2;
}
function updateRhythm(currentTime) {
    const elapsed = (currentTime - gameStartTime) / 1000;
    const updatesNeeded = Math.floor((currentTime - lastRhythmUpdate) / 60000);
    if (updatesNeeded > 0) {
        for (let i = 0; i < updatesNeeded; i++) baseUnit *= 0.8;
        lastRhythmUpdate = currentTime;
    }
}
function playMovementSound() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
}
function playOrbSound() {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
}
// Visual feedback
function flashPlayer(color) {
    player.material.emissive.setHex(color);
    player.scale.set(1.2, 1.2, 1.2);
    setTimeout(() => {
        player.material.emissive.setHex(0x00ffff);
        player.scale.set(1, 1, 1);
    }, 200);
}
// Pathfinding helper
function findSafestTarget(redX, redZ) {
    const corners = [
        { x: 0, z: 0 },
        { x: 0, z: gridSize - 1 },
        { x: gridSize - 1, z: 0 },
        { x: gridSize - 1, z: gridSize - 1 }
    ];
    let maxDistance = -1;
    let target = corners[0];
    corners.forEach(corner => {
        const dx = corner.x - playerX;
        const dz = corner.z - playerZ;
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist > maxDistance) {
            maxDistance = dist;
            target = corner;
        }
    });
    return target;
}
function updatePlayerAI() {
    if (!loadScreenMode || !playerAIActive || gameStarted) return;
    const ai = aiPlayers[0];
    if (!ai) return;
    const currentTime = performance.now();
    if (currentTime - lastPlayerMoveTime < moveInterval) return;
    const prevX = playerX;
    const prevZ = playerZ;
    const dx = ai.x - playerX;
    const dz = ai.z - playerZ;
    const distance = Math.sqrt(dx * dx + dz * dz);
    const fleeSpeed = 0.5;
    if (!initialMoveDone) {
        playerTargetX = gridSize / 2;
        playerTargetZ = gridSize / 2;
        initialMoveDone = true;
        const stepsToMove = 4;
        if (playerX > playerTargetX) playerXAccum = -stepsToMove;
        else playerXAccum = stepsToMove;
        if (playerZ > playerTargetZ) playerZAccum = -stepsToMove;
        else playerZAccum = stepsToMove;
    }
    if (distance < 10 || Math.abs(playerX - playerTargetX) < 2 && Math.abs(playerZ - playerTargetZ) < 2) {
        const angle = currentTime * 0.0002 + Math.random() * Math.PI / 4;
        const radius = gridSize * 0.4;
        playerTargetX = gridSize / 2 + Math.cos(angle) * radius;
        playerTargetZ = gridSize / 2 + Math.sin(angle) * radius;
        playerTargetX = Math.max(0, Math.min(gridSize - 1, Math.round(playerTargetX)));
        playerTargetZ = Math.max(0, Math.min(gridSize - 1, Math.round(playerTargetZ)));
    }
    const targetDx = playerTargetX - playerX;
    const targetDz = playerTargetZ - playerZ;
    if (distance < 5) {
        if (blueStepToggle) {
            if (dx > 0) playerXAccum -= fleeSpeed;
            else if (dx < 0) playerXAccum += fleeSpeed;
        } else {
            if (dz > 0) playerZAccum -= fleeSpeed;
            else if (dz < 0) playerZAccum += fleeSpeed;
        }
    } else {
        if (blueStepToggle) {
            if (targetDx > 0) playerXAccum += fleeSpeed;
            else if (targetDx < 0) playerXAccum -= fleeSpeed;
        } else {
            if (targetDz > 0) playerZAccum += fleeSpeed;
            else if (targetDz < 0) playerZAccum -= fleeSpeed;
        }
    }
    blueStepToggle = !blueStepToggle;
    if (Math.abs(playerXAccum) >= 1 && blueStepToggle) {
        const moveX = Math.sign(playerXAccum);
        const newX = playerX + moveX;
        if (newX >= 0 && newX < gridSize) {
            playerX = newX;
            playerXAccum -= moveX;
        }
    } else if (Math.abs(playerZAccum) >= 1 && !blueStepToggle) {
        const moveZ = Math.sign(playerZAccum);
        const newZ = playerZ + moveZ;
        if (newZ >= 0 && newZ < gridSize) {
            playerZ = newZ;
            playerZAccum -= moveZ;
        }
    }
    playerX = Math.round(playerX);
    playerZ = Math.round(playerZ);
    player.position.set(playerX, 0.2, playerZ);
    if (playerX !== prevX || playerZ !== prevZ) {
        playerTrailPoints.push(new THREE.Vector3(prevX, 0.1, prevZ));
        playerTrailPoints.push(new THREE.Vector3(playerX, 0.1, playerZ));
        if (playerTrailPoints.length > maxTrailLength * 2) playerTrailPoints.splice(0, 2);
        updateTrail('playerTrail', playerTrailPoints, playerTrailMaterial);
        addParticle(playerX, playerZ, particles);
    }
    if (playerX <= 0 || playerX >= gridSize - 1 || playerZ <= 0 || playerZ >= gridSize - 1) {
        const centerX = gridSize / 2;
        const centerZ = gridSize / 2;
        if (playerX <= 0) playerX = 1;
        else if (playerX >= gridSize - 1) playerX = gridSize - 2;
        if (playerZ <= 0) playerZ = 1;
        else if (playerZ >= gridSize - 1) playerZ = gridSize - 2;
        player.position.set(playerX, 0.2, playerZ);
        playerXAccum = (centerX - playerX) * 0.5;
        playerZAccum = (centerZ - playerZ) * 0.5;
        playerTrailPoints.push(new THREE.Vector3(prevX, 0.1, prevZ));
        playerTrailPoints.push(new THREE.Vector3(playerX, 0.1, playerZ));
        if (playerTrailPoints.length > maxTrailLength * 2) playerTrailPoints.splice(0, 2);
        updateTrail('playerTrail', playerTrailPoints, playerTrailMaterial);
        addParticle(playerX, playerZ, particles);
    }
    lastPlayerMoveTime = currentTime;
}
function enableOrbitControls() {
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.enableRotate = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.enabled = true;
    controls.minDistance = 5;
    controls.maxDistance = 100;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.0;
    controls.panSpeed = 0.8;
}
function startGame() {
    startScreen.classList.remove('visible');
    setTimeout(() => {
        startScreen.classList.add('hidden');
        hud.classList.add('visible');
        powerUps.classList.add('visible');
        pauseButton.classList.add('visible');
        livesDisplay.textContent = `LIVES: ${lives}`;
    }, 500);
    if (gameOverScreen) {
        gameOverScreen.classList.remove('visible');
        setTimeout(() => gameOverScreen.classList.add('hidden'), 500);
    }
    gameStarted = true;
    loadScreenMode = false;
    playerAIActive = false;
    gameOver = false;
    playerMoved = false;
    shiftPressed = false;
    paused = false;
    score = 0;
    lives = 3;
    gameStartTime = performance.now();
    firstMoveTime = 0;
    lastTime = gameStartTime;
    lastSpeedUpdate = gameStartTime;
    collapseStartTime = lastTime + 5000;
    lastCollapseAddTime = lastTime;
    collapseSizes = [...INITIAL_COLLAPSE_SIZES];
    playerX = gridSize - 1;
    playerZ = gridSize - 1;
    playerBaseSpeed = 1;
    playerSpeed = playerBaseSpeed;
    aiBaseSpeed = 0.2376;
    yellowOrbSpawnTime = Infinity;
    blueOrbSpawnTime = Infinity;
    orangeOrbSpawnTime = Infinity;
    whiteOrbSpawnTime = Infinity;
    oneUpOrbSpawnTime = Infinity;
    shieldOrbSpawnTime = Infinity;
    orbTimersStarted = false;
    cameraMode = 'chase';
    lastCameraMode = null;
    directionX = 0;
    directionZ = -1;
    shieldEndTime = 0;
    shieldHalo.visible = false;
    playerTrailPoints.length = 0;
    let playerTrail = scene.getObjectByName('playerTrail');
    if (playerTrail) {
        scene.remove(playerTrail);
        playerTrail.geometry.dispose();
    }
    aiPlayers.forEach((ai, i) => {
        scene.remove(ai.mesh);
        ai.trailPoints.length = 0;
        let aiTrail = scene.getObjectByName(`aiTrail${i}`);
        if (aiTrail) {
            scene.remove(aiTrail);
            aiTrail.geometry.dispose();
        }
    });
    aiPlayers.length = 0;
    aiCount = 1;
    lastAISpawnTime = gameStartTime;
    spawnAI();
    player.position.set(playerX, 0.2, playerZ);
    spotlight.target = player;
    initCollapseSections();
    // Reset grids with 60-second intervals
    grids.forEach((grid, index) => {
        grid.grid.visible = false;
        grid.added = false;
        grid.spawnTime = 60 * (index + 1); // 60, 120, 180, 240, 300 seconds
    });
    lastGridAddTime = gameStartTime;
    stopOrbiting();
    setChaseView();
    controls.enabled = false;
    startBackgroundMusic();
    renderer.render(scene, camera);
}
function togglePause() {
    if (!gameStarted || gameOver) return;
    paused = !paused;
    if (paused) {
        pauseScreen.classList.remove('hidden');
        setTimeout(() => pauseScreen.classList.add('visible'), 10);
        stopBackgroundMusic();
    } else {
        pauseScreen.classList.remove('visible');
        setTimeout(() => pauseScreen.classList.add('hidden'), 500);
        startBackgroundMusic();
    }
}
function resetGame() {
    if (gameOverScreen) {
        gameOverScreen.classList.remove('visible');
        setTimeout(() => gameOverScreen.classList.add('hidden'), 500);
    }
    gameOver = false;
    gameStarted = false;
    loadScreenMode = true;
    playerAIActive = false;
    playerMoved = false;
    shiftPressed = false;
    paused = false;
    score = 0;
    lives = 3;
    playerX = gridSize - 1;
    playerZ = gridSize - 1;
    playerBaseSpeed = 1;
    playerSpeed = playerBaseSpeed;
    aiBaseSpeed = 0.2376;
    lastTime = 0;
    gameStartTime = 0;
    firstMoveTime = 0;
    lastSpeedUpdate = 0;
    collapseSizes = [...INITIAL_COLLAPSE_SIZES];
    orbTimersStarted = false;
    initialMoveDone = false;
    blueStepToggle = true;
    cameraMode = 'chase';
    lastCameraMode = null;
    directionX = 0;
    directionZ = -1;
    chaseStepToggle = true;
    if (yellowOrb) scene.remove(yellowOrb);
    if (blueOrb) scene.remove(blueOrb);
    if (orangeOrb) scene.remove(orangeOrb);
    if (whiteOrb) scene.remove(whiteOrb);
    if (oneUpOrb) scene.remove(oneUpOrb);
    if (shieldOrb) scene.remove(shieldOrb);
    yellowOrb = null;
    blueOrb = null;
    orangeOrb = null;
    whiteOrb = null;
    oneUpOrb = null;
    shieldOrb = null;
    yellowOrbSpawnTime = Infinity;
    blueOrbSpawnTime = Infinity;
    orangeOrbSpawnTime = Infinity;
    whiteOrbSpawnTime = Infinity;
    oneUpOrbSpawnTime = Infinity;
    shieldOrbSpawnTime = Infinity;
    orbCollectedBy = null;
    speedBoostEndTime = 0;
    fleeEndTime = 0;
    doubleDamageEndTime = 0;
    shieldEndTime = 0;
    shieldHalo.visible = false;
    player.position.set(playerX, 0.2, playerZ);
    playerTrailPoints.length = 0;
    scene.remove(scene.getObjectByName('playerTrail'));
    aiPlayers.forEach((ai, i) => {
        scene.remove(ai.mesh);
        scene.remove(scene.getObjectByName(`aiTrail${i}`));
    });
    aiPlayers.length = 0;
    aiCount = 1;
    lastAISpawnTime = 0;
    spawnAI();
    particles.length = 0;
    aiParticles.length = 0;
    orbParticles.length = 0;
    updateParticles(particleSystem, particles);
    updateParticles(aiParticleSystem, aiParticles);
    updateOrbParticles();
    collapseSections.forEach(section => scene.remove(section.mesh));
    collapseSections = [];
    hud.classList.remove('visible');
    powerUps.classList.remove('visible');
    pauseButton.classList.remove('visible');
    scoreDisplay.textContent = 'SCORE: 0';
    timerDisplay.textContent = 'TIME: 0';
    highScoreDisplay.textContent = `HIGH SCORE: ${Math.floor(highScore)}`;
    speedBoostIndicator.style.width = '0%';
    fleeIndicator.style.width = '0%';
    doubleDamageIndicator.style.width = '0%';
    document.getElementById('shieldIndicator').querySelector('span').style.width = '0%';
    startScreen.classList.remove('hidden');
    setTimeout(() => {
        startScreen.classList.add('visible');
        if (!gameStarted) {
            startOrbiting();
            playerAIActive = true;
            grids.forEach(grid => {
                grid.grid.visible = true;
                grid.added = true;
            });
        }
    }, 10);
    pauseScreen.classList.remove('visible');
    setTimeout(() => pauseScreen.classList.add('hidden'), 500);
    controls.enableRotate = false;
    controls.enabled = true;
    stopBackgroundMusic();
    renderer.render(scene, camera);
}
function initCollapseSections() {
    collapseSections.forEach(section => scene.remove(section.mesh));
    collapseSections = [];
    const activeSizes = performance.now() < doubleDamageEndTime ? collapseSizes.concat(collapseSizes) : collapseSizes;
    const count = Math.min(activeSizes.length, collapseSectionCap);
    for (let i = 0; i < count; i++) {
        const size = activeSizes[i];
        const x = Math.floor(Math.random() * (gridSize - size.width));
        const z = Math.floor(Math.random() * (gridSize - size.height));
        const geometry = new THREE.PlaneGeometry(size.width, size.height);
        const mesh = new THREE.Mesh(geometry, collapseMaterial.clone());
        mesh.position.set(x + size.width / 2 - 0.5, 0.01, z + size.height / 2 - 0.5);
        mesh.rotation.x = -Math.PI / 2;
        mesh.material.opacity = 0;
        scene.add(mesh);
        collapseSections.push({ x, z, width: size.width, height: size.height, mesh, fadeTime: performance.now() });
    }
}
function updateCollapseSections(currentTime) {
    collapseSections.forEach(section => {
        const elapsed = (currentTime - section.fadeTime) / 1000;
        const pulse = Math.sin(currentTime * 0.002) * 0.2 + 0.8;
        if (elapsed < 1) section.mesh.material.opacity = elapsed * pulse;
        else if (currentTime - collapseStartTime >= 4000 && playerMoved) section.mesh.material.opacity = (1 - ((currentTime - collapseStartTime - 4000) / 1000)) * pulse;
        else section.mesh.material.opacity = pulse;
    });
    if (currentTime - collapseStartTime >= 5000 && playerMoved) {
        initCollapseSections();
        collapseStartTime = currentTime;
    }
    if (currentTime - lastCollapseAddTime >= 36000 && playerMoved) {
        collapseSizes.push({ width: 1, height: 1 });
        lastCollapseAddTime = currentTime;
        initCollapseSections();
    }
}
function spawnYellowOrb() {
    if (yellowOrb) scene.remove(yellowOrb);
    yellowOrb = new THREE.Mesh(yellowOrbGeometry, yellowOrbMaterial);
    yellowOrb.position.set(Math.floor(Math.random() * gridSize), 0.2, Math.floor(Math.random() * gridSize));
    scene.add(yellowOrb);
    yellowOrbSpawnTime = performance.now() + (30000 + Math.random() * 10000);
}
function spawnBlueOrb() {
    if (blueOrb) scene.remove(blueOrb);
    blueOrb = new THREE.Mesh(blueOrbGeometry, blueOrbMaterial);
    blueOrb.position.set(Math.floor(Math.random() * gridSize), 0.2, Math.floor(Math.random() * gridSize));
    scene.add(blueOrb);
    blueOrbSpawnTime = performance.now() + (35000 + Math.random() * 10000);
}
function spawnOrangeOrb() {
    if (orangeOrb) scene.remove(orangeOrb);
    orangeOrb = new THREE.Mesh(orangeOrbGeometry, orangeOrbMaterial);
    orangeOrb.position.set(Math.floor(Math.random() * gridSize), 0.2, Math.floor(Math.random() * gridSize));
    scene.add(orangeOrb);
    orangeOrbSpawnTime = performance.now() + (55000 + Math.random() * 10000);
}
function spawnWhiteOrb() {
    if (whiteOrb) scene.remove(whiteOrb);
    whiteOrb = new THREE.Mesh(whiteOrbGeometry, whiteOrbMaterial);
    let safeX, safeZ;
    do {
        safeX = Math.floor(Math.random() * gridSize);
        safeZ = Math.floor(Math.random() * gridSize);
    } while (checkCollision(safeX, safeZ, safeX, safeZ).collided);
    whiteOrb.position.set(safeX, 0.2, safeZ);
    scene.add(whiteOrb);
    whiteOrbSpawnTime = performance.now() + (65000 + Math.random() * 10000);
}
function spawnOneUpOrb() {
    if (oneUpOrb) scene.remove(oneUpOrb);
    oneUpOrb = new THREE.Mesh(oneUpOrbGeometry, oneUpOrbMaterial);
    let safeX, safeZ;
    do {
        safeX = Math.floor(Math.random() * gridSize);
        safeZ = Math.floor(Math.random() * gridSize);
    } while (checkCollision(safeX, safeZ, safeX, safeZ).collided);
    oneUpOrb.position.set(safeX, 0.2, safeZ);
    scene.add(oneUpOrb);
    oneUpOrbSpawnTime = performance.now() + 120000;
}
function spawnShieldOrb() {
    if (shieldOrb) scene.remove(shieldOrb);
    shieldOrb = new THREE.Mesh(shieldOrbGeometry, shieldOrbMaterial);
    let safeX, safeZ;
    do {
        safeX = Math.floor(Math.random() * gridSize);
        safeZ = Math.floor(Math.random() * gridSize);
    } while (checkCollision(safeX, safeZ, safeX, safeZ).collided);
    shieldOrb.position.set(safeX, 0.2, safeZ);
    scene.add(shieldOrb);
    shieldOrbSpawnTime = performance.now() + 60000;
}
function addOrbParticles(x, z, color) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = Math.random() * 0.7;
        const speed = 0.1 + Math.random() * 0.05;
        orbParticles.push({
            x: x + Math.cos(angle) * radius,
            z: z + Math.sin(angle) * radius,
            y: 0.2,
            vx: Math.cos(angle) * speed,
            vz: Math.sin(angle) * speed,
            vy: Math.random() * 0.15,
            life: 1.5,
            color: color
        });
    }
    orbParticleMaterial.color.setHex(color);
    updateOrbParticles();
}
function flashScreen(color) {
    const existingFlash = document.querySelector('.flash-screen');
    if (existingFlash) document.body.removeChild(existingFlash);
    const flash = document.createElement('div');
    flash.className = 'flash-screen';
    flash.style.position = 'absolute';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = `#${color.toString(16).padStart(6, '0')}`;
    flash.style.opacity = '0.5';
    flash.style.transition = 'opacity 0.3s ease-out';
    flash.style.zIndex = '10';
    flash.style.pointerEvents = 'none';
    document.body.appendChild(flash);
    setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
            if (flash.parentNode) document.body.removeChild(flash);
        }, 300);
    }, 50);
}
function updateOrbParticles() {
    const positions = [];
    for (let i = orbParticles.length - 1; i >= 0; i--) {
        const p = orbParticles[i];
        p.x += p.vx;
        p.z += p.vz;
        p.y += p.vy;
        p.vy -= 0.005;
        p.life -= 0.05;
        if (p.life > 0) positions.push(p.x, p.y, p.z);
        else orbParticles.splice(i, 1);
    }
    orbParticleSystem.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    orbParticleSystem.geometry.attributes.position.needsUpdate = true;
}
function checkOrbCollision() {
    if (yellowOrb) {
        const dxPlayer = playerX - yellowOrb.position.x;
        const dzPlayer = playerZ - yellowOrb.position.z;
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dzPlayer * dzPlayer);
        let collected = false;
        if (distancePlayer < 0.8) {
            playerSpeed = playerBaseSpeed * 2;
            orbCollectedBy = 'player';
            speedBoostEndTime = performance.now() + 10000;
            collected = true;
        } else {
            aiPlayers.forEach(ai => {
                const dxAI = ai.x - yellowOrb.position.x;
                const dzAI = ai.z - yellowOrb.position.z;
                const distanceAI = Math.sqrt(dxAI * dxAI + dzAI * dzAI);
                if (distanceAI < 0.8) {
                    ai.speed = aiBaseSpeed * 2;
                    orbCollectedBy = 'ai';
                    speedBoostEndTime = performance.now() + 10000;
                    collected = true;
                }
            });
        }
        if (collected) {
            addOrbParticles(yellowOrb.position.x, yellowOrb.position.z, 0xffff00);
            flashScreen(0xffff00);
            playOrbSound();
            scene.remove(yellowOrb);
            yellowOrb = null;
        }
    }
    if (blueOrb) {
        const dxPlayer = playerX - blueOrb.position.x;
        const dzPlayer = playerZ - blueOrb.position.z;
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dzPlayer * dzPlayer);
        if (distancePlayer < 0.8) {
            fleeEndTime = performance.now() + 10000;
            addOrbParticles(blueOrb.position.x, blueOrb.position.z, 0x0000ff);
            flashScreen(0x0000ff);
            playOrbSound();
            scene.remove(blueOrb);
            blueOrb = null;
        }
    }
    if (orangeOrb) {
        const dxPlayer = playerX - orangeOrb.position.x;
        const dzPlayer = playerZ - orangeOrb.position.z;
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dzPlayer * dzPlayer);
        let collected = distancePlayer < 0.8;
        aiPlayers.forEach(ai => {
            const dxAI = ai.x - orangeOrb.position.x;
            const dzAI = ai.z - orangeOrb.position.z;
            if (Math.sqrt(dxAI * dxAI + dzAI * dzAI) < 0.8) collected = true;
        });
        if (collected) {
            doubleDamageEndTime = performance.now() + 3000;
            initCollapseSections();
            addOrbParticles(orangeOrb.position.x, orangeOrb.position.z, 0xff4500);
            flashScreen(0xff4500);
            playOrbSound();
            scene.remove(orangeOrb);
            orangeOrb = null;
        }
    }
    if (whiteOrb) {
        const dxPlayer = playerX - whiteOrb.position.x;
        const dzPlayer = playerZ - whiteOrb.position.z;
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dzPlayer * dzPlayer);
        if (distancePlayer < 0.8) {
            playerX = (playerX < gridSize / 2) ? gridSize - 1 : 0;
            playerZ = (playerZ < gridSize / 2) ? gridSize - 1 : 0;
            player.position.set(playerX, 0.2, playerZ);
            addOrbParticles(whiteOrb.position.x, whiteOrb.position.z, 0xffffff);
            flashScreen(0xffffff);
            playOrbSound();
            scene.remove(whiteOrb);
            whiteOrb = null;
        } else {
            aiPlayers.forEach(ai => {
                const dxAI = ai.x - whiteOrb.position.x;
                const dzAI = ai.z - whiteOrb.position.z;
                if (Math.sqrt(dxAI * dxAI + dzAI * dzAI) < 0.8) {
                    ai.x = (ai.x < gridSize / 2) ? gridSize - 1 : 0;
                    ai.z = (ai.z < gridSize / 2) ? gridSize - 1 : 0;
                    ai.mesh.position.set(ai.x, 0.2, ai.z);
                    addOrbParticles(whiteOrb.position.x, whiteOrb.position.z, 0xffffff);
                    flashScreen(0xffffff);
                    playOrbSound();
                    scene.remove(whiteOrb);
                    whiteOrb = null;
                }
            });
        }
    }
    if (oneUpOrb) {
        const dxPlayer = playerX - oneUpOrb.position.x;
        const dzPlayer = playerZ - oneUpOrb.position.z;
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dzPlayer * dzPlayer);
        if (distancePlayer < 0.8) {
            lives++;
            livesDisplay.textContent = `LIVES: ${lives}`;
            addOrbParticles(oneUpOrb.position.x, oneUpOrb.position.z, 0x00ffff);
            flashScreen(0x00ffff);
            playOrbSound();
            scene.remove(oneUpOrb);
            oneUpOrb = null;
        }
    }
    if (shieldOrb) {
        const dxPlayer = playerX - shieldOrb.position.x;
        const dzPlayer = playerZ - shieldOrb.position.z;
        const distancePlayer = Math.sqrt(dxPlayer * dxPlayer + dzPlayer * dzPlayer);
        if (distancePlayer < 0.8) {
            shieldEndTime = performance.now() + 20000;
            shieldHalo.visible = true;
            addOrbParticles(shieldOrb.position.x, shieldOrb.position.z, 0xff00ff);
            flashScreen(0xff00ff);
            playOrbSound();
            scene.remove(shieldOrb);
            shieldOrb = null;
        }
    }
}
function checkSpeedBoost(currentTime) {
    if (orbCollectedBy && currentTime > speedBoostEndTime) {
        if (orbCollectedBy === 'player') playerSpeed = playerBaseSpeed;
        else if (orbCollectedBy === 'ai') aiPlayers.forEach(ai => ai.speed = aiBaseSpeed);
        orbCollectedBy = null;
    }
}
function checkCollision(x, z, prevX, prevZ) {
    for (const section of collapseSections) {
        if (x >= section.x && x < section.x + section.width && z >= section.z && z < section.z + section.height) {
            return { collided: true, prevX, prevZ };
        }
    }
    return { collided: false };
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (!gameStarted && !gameOver) {
            stopOrbiting();
            startGame();
        } else if (gameOver) resetGame();
        return;
    }
    if (event.key === 'Escape' && gameStarted && !gameOver) {
        togglePause();
        return;
    }
    if (gameOver || !gameStarted || paused) return;
    if (event.key === 'v' || event.key === 'V') {
        if (cameraMode === 'chase') {
            cameraMode = 'free';
            controls.target.set(playerX, 0.2, playerZ);
            camera.position.set(playerX + 20, 20, playerZ + 20);
            camera.zoom = 1.5;
            camera.updateProjectionMatrix();
            enableOrbitControls();
        } else if (cameraMode === 'free') {
            cameraMode = 'chase';
            setChaseView();
            controls.enabled = false;
        }
        controls.update();
        return;
    }
    if (event.key in keysPressed) keysPressed[event.key] = true;
    const prevX = playerX;
    const prevZ = playerZ;
    let moved = false;
    if (cameraMode === 'chase') {
        let newX = playerX;
        let newZ = playerZ;
        if (keysPressed.ArrowLeft && !keysPressed.ArrowUp && !keysPressed.ArrowDown) {
            const tempX = directionX;
            directionX = directionZ;
            directionZ = -tempX;
            moved = true;
        }
        else if (keysPressed.ArrowRight && !keysPressed.ArrowUp && !keysPressed.ArrowDown) {
            const tempX = directionX;
            directionX = -directionZ;
            directionZ = tempX;
            moved = true;
        }
        else if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
            if (chaseStepToggle) {
                newX = playerX + directionX;
                newZ = playerZ + directionZ;
            } else {
                newX = playerX + (-directionZ);
                newZ = playerZ + directionX;
            }
            chaseStepToggle = !chaseStepToggle;
            moved = true;
        }
        else if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
            if (chaseStepToggle) {
                newX = playerX + directionX;
                newZ = playerZ + directionZ;
            } else {
                newX = playerX + directionZ;
                newZ = playerZ + (-directionX);
            }
            chaseStepToggle = !chaseStepToggle;
            moved = true;
        }
        else if (keysPressed.ArrowDown && keysPressed.ArrowRight) {
            if (chaseStepToggle) {
                newX = playerX - directionX;
                newZ = playerZ - directionZ;
            } else {
                newX = playerX + (-directionZ);
                newZ = playerZ + directionX;
            }
            chaseStepToggle = !chaseStepToggle;
            moved = true;
        }
        else if (keysPressed.ArrowDown && keysPressed.ArrowLeft) {
            if (chaseStepToggle) {
                newX = playerX - directionX;
                newZ = playerZ - directionZ;
            } else {
                newX = playerX + directionZ;
                newZ = playerZ + (-directionX);
            }
            chaseStepToggle = !chaseStepToggle;
            moved = true;
        }
        else if (keysPressed.ArrowUp) {
            newX = playerX + directionX;
            newZ = playerZ + directionZ;
            moved = true;
        }
        else if (keysPressed.ArrowDown) {
            newX = playerX - directionX;
            newZ = playerZ - directionZ;
            moved = true;
        }
        if (moved) {
            const collision = checkCollision(newX, newZ, prevX, prevZ);
            if (!collision.collided) {
                playerX = Math.round(Math.max(0, Math.min(gridSize - 1, newX)));
                playerZ = Math.round(Math.max(0, Math.min(gridSize - 1, newZ)));
            } else {
                playerX = collision.prevX;
                playerZ = collision.prevZ;
                flashPlayer(0xff0000);
            }
        }
    } else {
        if (keysPressed.ArrowUp && keysPressed.ArrowLeft) {
            if (playerStepToggle) playerX -= playerSpeed;
            else playerZ -= playerSpeed;
            moved = true;
            playerStepToggle = !playerStepToggle;
        } else if (keysPressed.ArrowUp && keysPressed.ArrowRight) {
            if (playerStepToggle) playerX += playerSpeed;
            else playerZ -= playerSpeed;
            moved = true;
            playerStepToggle = !playerStepToggle;
        } else if (keysPressed.ArrowDown && keysPressed.ArrowLeft) {
            if (playerStepToggle) playerX -= playerSpeed;
            else playerZ += playerSpeed;
            moved = true;
            playerStepToggle = !playerStepToggle;
        } else if (keysPressed.ArrowDown && keysPressed.ArrowRight) {
            if (playerStepToggle) playerX += playerSpeed;
            else playerZ += playerSpeed;
            moved = true;
            playerStepToggle = !playerStepToggle;
        } else if (keysPressed.ArrowUp) {
            playerZ -= playerSpeed;
            moved = true;
        } else if (keysPressed.ArrowDown) {
            playerZ += playerSpeed;
            moved = true;
        } else if (keysPressed.ArrowLeft) {
            playerX -= playerSpeed;
            moved = true;
        } else if (keysPressed.ArrowRight) {
            playerX += playerSpeed;
            moved = true;
        }
        if (moved) {
            const collision = checkCollision(playerX, playerZ, prevX, prevZ);
            if (!collision.collided) {
                playerX = Math.round(Math.max(0, Math.min(gridSize - 1, playerX)));
                playerZ = Math.round(Math.max(0, Math.min(gridSize - 1, playerZ)));
            } else {
                playerX = collision.prevX;
                playerZ = collision.prevZ;
                flashPlayer(0xff0000);
            }
        }
    }
    if (moved) {
        player.position.set(playerX, 0.2, playerZ);
        playMovementSound();
        playerTrailPoints.push(new THREE.Vector3(prevX, 0.1, prevZ));
        playerTrailPoints.push(new THREE.Vector3(playerX, 0.1, playerZ));
        if (playerTrailPoints.length > maxTrailLength * 2) playerTrailPoints.splice(0, 2);
        updateTrail('playerTrail', playerTrailPoints, playerTrailMaterial);
        addParticle(playerX, playerZ, particles);
        if (!playerMoved) {
            firstMoveTime = performance.now();
            playerMoved = true;
        }
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key in keysPressed) keysPressed[event.key] = false;
});
function updateTrail(name, points, material) {
    let trail = scene.getObjectByName(name);
    if (trail) scene.remove(trail);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    trail = new THREE.LineSegments(geometry, material);
    trail.name = name;
    scene.add(trail);
}
function addParticle(x, z, particleArray) {
    particleArray.push({ x, z, y: 0.1, life: 1 });
    updateParticles(particleSystem, particles);
}
function updateParticles(system, particleArray) {
    const positions = [];
    for (let i = particleArray.length - 1; i >= 0; i--) {
        const p = particleArray[i];
        p.life -= 0.05;
        p.y += 0.05;
        if (p.life > 0) positions.push(p.x, p.y, p.z);
        else particleArray.splice(i, 1);
    }
    system.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    system.geometry.attributes.position.needsUpdate = true;
}
function updateAI(currentTime) {
    aiPlayers.forEach((ai, index) => {
        const prevX = ai.x;
        const prevZ = ai.z;
        const dx = playerX - ai.x;
        const dz = playerZ - ai.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        let directionX = 0;
        let directionZ = 0;
        if (loadScreenMode || (gameStarted && playerMoved)) {
            if (currentTime < fleeEndTime && !loadScreenMode) {
                const target = findSafestTarget(ai.x, ai.z);
                directionX = target.x - ai.x;
                directionZ = target.z - ai.z;
            } else if (distance > 0) {
                directionX = dx;
                directionZ = dz;
            }
            const magnitude = Math.sqrt(directionX * directionX + directionZ * directionZ);
            if (magnitude > 0) {
                directionX /= magnitude;
                directionZ /= magnitude;
            }
            if (ai.stepToggle) ai.xAccum += directionX * ai.speed;
            else ai.zAccum += directionZ * ai.speed;
            ai.stepToggle = !ai.stepToggle;
            if (Math.abs(ai.xAccum) >= 1) {
                const moveX = Math.sign(ai.xAccum);
                const newX = ai.x + moveX;
                const collision = checkCollision(newX, ai.z, ai.x, ai.z);
                if (!collision.collided && newX >= 0 && newX < gridSize) {
                    ai.x = newX;
                    ai.xAccum -= moveX;
                }
            }
            if (Math.abs(ai.zAccum) >= 1) {
                const moveZ = Math.sign(ai.zAccum);
                const newZ = ai.z + moveZ;
                const collision = checkCollision(ai.x, newZ, ai.x, ai.z);
                if (!collision.collided && newZ >= 0 && newZ < gridSize) {
                    ai.z = newZ;
                    ai.zAccum -= moveZ;
                }
            }
            ai.x = Math.round(ai.x);
            ai.z = Math.round(ai.z);
            ai.mesh.position.set(ai.x, 0.2, ai.z);
            if (ai.x !== prevX || ai.z !== prevZ) {
                ai.trailPoints.push(new THREE.Vector3(prevX, 0.1, prevZ));
                ai.trailPoints.push(new THREE.Vector3(ai.x, 0.1, ai.z));
                if (ai.trailPoints.length > maxTrailLength * 2) ai.trailPoints.splice(0, 2);
                updateTrail(`aiTrail${index}`, ai.trailPoints, aiTrailMaterial);
                addParticle(ai.x, ai.z, aiParticles);
            }
            // Collision with player (AI catches player)
            if (distance < 0.8 && !loadScreenMode) {
                if (currentTime < shieldEndTime) {
                    flashPlayer(0xff00ff); // Shield active, no effect
                } else {
                    lives--;
                    livesDisplay.textContent = `LIVES: ${lives}`;
                    flashPlayer(0xff0000); // Red flash for losing a life
                    playerX = gridSize - 1; // Reset to (50,50)
                    playerZ = gridSize - 1;
                    player.position.set(playerX, 0.2, playerZ);
                    if (lives <= 0) endGame();
                    // AI persists, no removal
                }
            }
        }
    });
    if (currentTime - lastAISpawnTime >= 60000 && !loadScreenMode && playerMoved) {
        spawnAI();
        lastAISpawnTime = currentTime;
    }
}
function endGame() {
    gameOver = true;
    gameStarted = false;
    stopBackgroundMusic();
    const finalScore = Math.floor(score + (playerMoved ? (performance.now() - firstMoveTime) / 1000 : 0));
    updateLeaderboard(finalScore);
    if (!gameOverScreen) {
        gameOverScreen = document.createElement('div');
        gameOverScreen.id = 'gameOverScreen';
        gameOverScreen.className = 'hidden';
        gameOverScreen.innerHTML = `
                    <h1>GAME OVER</h1>
                    <p>Score: ${finalScore}</p>
                    <button id="restartButton">RESTART</button>
                    <button id="exitButton">EXIT</button>
                `;
        document.body.appendChild(gameOverScreen);
        document.getElementById('restartButton').addEventListener('click', resetGame);
        document.getElementById('exitButton').addEventListener('click', resetGame);
    } else {
        gameOverScreen.querySelector('p').textContent = `Score: ${finalScore}`;
    }
    gameOverScreen.classList.remove('hidden');
    setTimeout(() => gameOverScreen.classList.add('visible'), 10);
    hud.classList.remove('visible');
    powerUps.classList.remove('visible');
    pauseButton.classList.remove('visible');
    if (finalScore > highScore) {
        highScore = finalScore;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `HIGH SCORE: ${Math.floor(highScore)}`;
    }
}
function updateHUD(currentTime) {
    const elapsed = playerMoved ? (currentTime - firstMoveTime) / 1000 : 0;
    timerDisplay.textContent = `TIME: ${Math.floor(elapsed)}`;
    scoreDisplay.textContent = `SCORE: ${Math.floor(score + elapsed)}`;
    livesDisplay.textContent = `LIVES: ${lives}`;
    const speedBoostRemaining = Math.max(0, (speedBoostEndTime - currentTime) / 10000 * 100);
    speedBoostIndicator.style.width = `${speedBoostRemaining}%`;
    const fleeRemaining = Math.max(0, (fleeEndTime - currentTime) / 10000 * 100);
    fleeIndicator.style.width = `${fleeRemaining}%`;
    const doubleDamageRemaining = Math.max(0, (doubleDamageEndTime - currentTime) / 3000 * 100);
    doubleDamageIndicator.style.width = `${doubleDamageRemaining}%`;
    const shieldRemaining = Math.max(0, (shieldEndTime - currentTime) / 20000 * 100);
    document.getElementById('shieldIndicator').querySelector('span').style.width = `${shieldRemaining}%`;
}
function updateGrids(currentTime) {
    const elapsed = playerMoved ? (currentTime - firstMoveTime) / 1000 : 0;
    grids.forEach(grid => {
        if (!loadScreenMode && !grid.added && elapsed >= grid.spawnTime) {
            grid.grid.visible = true;
            grid.added = true;
            lastGridAddTime = currentTime;
        }
        if (grid.added) {
            const timeSinceAdded = (currentTime - lastGridAddTime) / 1000;
            grid.grid.material.opacity = Math.min(0.5, timeSinceAdded / 10);
        }
    });
}
// Animation loop
function animate(currentTime) {
    requestAnimationFrame(animate);
    if (lastTime === 0 && gameStarted) lastTime = currentTime;
    if (loadScreenMode) {
        updatePlayerAI();
        updateAI(currentTime);
    }
    if (gameStarted && !gameOver && !paused) {
        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        if (!orbTimersStarted && playerMoved) {
            yellowOrbSpawnTime = currentTime + 10000;
            blueOrbSpawnTime = currentTime + 15000;
            orangeOrbSpawnTime = currentTime + 20000;
            whiteOrbSpawnTime = currentTime + 25000;
            oneUpOrbSpawnTime = currentTime + 60000;
            shieldOrbSpawnTime = currentTime + 30000;
            orbTimersStarted = true;
        }
        if (currentTime > yellowOrbSpawnTime) spawnYellowOrb();
        if (currentTime > blueOrbSpawnTime) spawnBlueOrb();
        if (currentTime > orangeOrbSpawnTime) spawnOrangeOrb();
        if (currentTime > whiteOrbSpawnTime) spawnWhiteOrb();
        if (currentTime > oneUpOrbSpawnTime) spawnOneUpOrb();
        if (currentTime > shieldOrbSpawnTime) spawnShieldOrb();
        checkOrbCollision();
        checkSpeedBoost(currentTime);
        updateAI(currentTime);
        updateCollapseSections(currentTime);
        updateGrids(currentTime);
        updateHUD(currentTime);
        updateCamera(currentTime);
        updateParticles(particleSystem, particles);
        updateParticles(aiParticleSystem, aiParticles);
        updateOrbParticles();
        if (currentTime > shieldEndTime) shieldHalo.visible = false;
        shieldHalo.position.set(playerX, 0.8, playerZ);
        updateRhythm(currentTime);
    }
    if (isOrbiting) controls.update();
    renderer.render(scene, camera);
}
animate(performance.now());
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});