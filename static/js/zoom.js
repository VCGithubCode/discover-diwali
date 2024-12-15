/**
 * Constants for zooming.
 */
const MIN_SCALE = 0.8;
const MAX_SCALE = 2.5;
const BOUNDARY_LIMIT = 0.6;
const SCALE_STEP = 0.2;

/**
 * Variables for the current state of the map.
 */
let currentScale = 1;
let posX = 0;
let posY = 0;
let lastPosX = 0;
let lastPosY = 0;

/**
 * References to the SVG and its container.
 */
const svgElement = document.getElementById('svg2');
const mapWrapper = document.querySelector('.map-wrapper');

// Size and position of the SVG
svgElement.setAttribute('viewBox', '0 0 650 695.70178');

// Hammer JS for touch interactions
const hammer = new Hammer(mapWrapper);
hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

/**
 * Sets the transform attribute of the SVG element.
 */
function setTransform() {
    svgElement.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
}

/**
 * Zooms in the map.
 */
function zoomIn() {
    if (currentScale < MAX_SCALE) {
        currentScale += SCALE_STEP;
        setTransform();
    }
}

/**
 * Zooms out the map.
 */
function zoomOut() {
    if (currentScale > MIN_SCALE) {
        currentScale -= SCALE_STEP;
        setTransform();
    }
}

/**
 * Resets the map to its original position.
 */
function resetPosition() {
    currentScale = 1;
    posX = 0;
    posY = 0;
    lastPosX = 0;
    lastPosY = 0;
    setTransform();
}

/**
 * Handles the panning movement of the map.
 *
 * @param {Object} event - The event object containing the delta movement.
 * @param {number} event.deltaX - The change in the X-axis position.
 * @param {number} event.deltaY - The change in the Y-axis position.
 */
function handlePanMove(event) {
    const container = mapWrapper.getBoundingClientRect();
    const maxX = container.width * BOUNDARY_LIMIT;
    const maxY = container.height * BOUNDARY_LIMIT;
    
    const newX = lastPosX + event.deltaX;
    const newY = lastPosY + event.deltaY;
    
    posX = Math.max(Math.min(newX, maxX), -maxX);
    posY = Math.max(Math.min(newY, maxY), -maxY);
    
    setTransform();
}

/**
 * Handles the wheel event to zoom in or out the map.
 *
 * @param {Object} event - The event object containing the delta movement.
 */
function handleWheel(event) {
    event.preventDefault();
    if (event.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}

// Event listeners
hammer.on('panmove', handlePanMove);
hammer.on('panend', () => {
    lastPosX = posX;
    lastPosY = posY;
});

svgElement.addEventListener('wheel', handleWheel);
