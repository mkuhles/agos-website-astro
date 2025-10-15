export default function arrangeCircleElements(globalAngle, globalRadius, globalOpacity) {
    const elements = document.querySelectorAll('.circle-element');
    const container = document.getElementById('circle-container');
    if (!container) return; // Ensure the container exists

    let radius = container.offsetHeight / 2; // Radius of the circle
    const centerX = container.offsetWidth / 2; // Center X position
    const centerY = container.offsetHeight / 2; // Center Y position
    const angleStep = (2 * Math.PI) / elements.length;

    if (globalRadius < radius) {
        radius = globalRadius; // Use the provided radius if available
    }

    elements.forEach((element, index) => {
        const angle = index * angleStep + globalAngle; // Calculate the angle for each element
        const x = centerX + radius * Math.cos(angle) - element.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - element.offsetHeight / 2;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.opacity = globalOpacity;
    });
}