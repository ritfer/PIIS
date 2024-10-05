const squares = document.querySelectorAll('.target');
const originalPositions = [];

squares.forEach(square => {
    const rect = square.getBoundingClientRect();
    originalPositions.push({ 
        element: square, 
        position: { x: rect.left, y: rect.top } 
    });
});

let pinnedSquare = null; 
let offsetX, offsetY; 
let initialPosition = { x: 0, y: 0 };

const returnToOriginalPosition = (square) => {
    const original = originalPositions.find(pos => pos.element === square);
    if (original) {
        square.style.left = original.position.x + 'px';
        square.style.top = original.position.y + 'px';
    }
};

document.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    if (pinnedSquare) {
        pinnedSquare.style.left = touch.clientX - (pinnedSquare.offsetWidth / 2) + 'px'; 
        pinnedSquare.style.top = touch.clientY - (pinnedSquare.offsetHeight / 2) + 'px'; 
    } else {
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.classList.contains('target')) {
            pinnedSquare = target;
            pinnedSquare.style.backgroundColor = 'green';
            offsetX = touch.clientX - pinnedSquare.getBoundingClientRect().left; 
            offsetY = touch.clientY - pinnedSquare.getBoundingClientRect().top; 
        }
    }
});

document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (pinnedSquare) {
        pinnedSquare.style.left = touch.clientX - (pinnedSquare.offsetWidth / 2) + 'px';
        pinnedSquare.style.top = touch.clientY - (pinnedSquare.offsetHeight / 2) + 'px'; 
    }
});

document.addEventListener('touchend', () => {
    if (pinnedSquare) {
        pinnedSquare.style.backgroundColor = 'red';
    }
});

document.addEventListener('touchstart', (event) => {
    if (event.touches.length > 1 && pinnedSquare) {
        returnToOriginalPosition(pinnedSquare);
        pinnedSquare = null; 
    }
});

squares.forEach(square => {
    square.addEventListener('wheel', (event) => {
        event.preventDefault(); 
        const newSize = Math.max(minSize, square.clientWidth + event.deltaY);
        square.style.width = newSize + 'px';
        square.style.height = newSize + 'px';
    });
});
