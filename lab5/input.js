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

const returnToOriginalPosition = (square) => {
    const original = originalPositions.find(pos => pos.element === square);
    if (original) {
        square.style.left = original.position.x + 'px';
        square.style.top = original.position.y + 'px';
    }
};

squares.forEach(square => {
    square.addEventListener('dblclick', () => {
        pinnedSquare = square;
        square.style.backgroundColor = 'green'; 
    });

    square.addEventListener('mousedown', (event) => {
        if (!pinnedSquare) {
            pinnedSquare = square;
        }
    });
});

document.addEventListener('mousemove', (event) => { 
        pinnedSquare.style.left = event.pageX - (pinnedSquare.offsetWidth / 2) + 'px'; // Центрируем элемент по X
        pinnedSquare.style.top = event.pageY - (pinnedSquare.offsetHeight / 2) + 'px'; // Центрируем элемент по Y
    
});

document.addEventListener('mouseup', () => {
        pinnedSquare.style.backgroundColor = 'red'; 
        pinnedSquare = null;
    
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
            returnToOriginalPosition(pinnedSquare);
            pinnedSquare.style.backgroundColor = 'red'; 
            pinnedSquare = null; 
       
    }
});
