const canvas = document.getElementById('drawing-board');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('.clr');

const container = document.querySelector('.drawing-board');
canvas.width = container.clientWidth;
canvas.height = container.clientHeight;

let isPainting = false;
let lineWidth = 100;
let startX;
let startY;
let colorSelected = false;
let currentColorText = '';
let coloredPixels = [];

// Set default stroke color
ctx.strokeStyle = '#000000';

// Draw initial message on the canvas
ctx.font = "clamp(2rem, 1.2rem + 4vw, 6rem) 'Finger Paint'"; // 96px to 32px
ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
ctx.textAlign = 'center';
ctx.fillText('CHOOSE A COLOUR', canvas.width / 2, canvas.height / 2 - 30);
ctx.fillText('AND PAINT!', canvas.width / 2, canvas.height / 2 + 80);

const colorText = {
    '#CF0000': 'UI/UX Design: Create interactive prototypes using Figma, facilitating team previews and gathering feedback to refine design concepts.',
    '#ff63c6': 'Web Development: Develop responsive websites using HTML, CSS, JavaScript, or CMS WordPress, ensuring consistent performance, and accessibility across desktops, tablets, and mobile devices.',
    '#ff792b': 'SEO Implementation: Strategically apply search engine optimization (SEO) best practices, including optimizing on-page content, meta tags, and image alt texts.',
    '#ffc53d': 'Cross-functional Communication: Collaborate with internal teams, external partners, and clients to ensure efficient project delivery and alignment with requirements.',
    '#4dc425': 'Quality Assurance & Testing: Conduct rigorous testing of websites pre-launch, identifying and resolving functional, design, and compatibility issues across various browsers and devices.',
    '#1334d6': 'Time Management: Manage multiple website development projects simultaneously, adhering to strict deadlines and client expectations.'
};

colorButtons.forEach(button => {
    button.addEventListener('click', e => {
        const selectedColor = e.target.getAttribute('data-clr');
        ctx.strokeStyle = selectedColor;
        ctx.fillStyle = selectedColor; // Fill color for mobile
        colorSelected = true;
        currentColorText = colorText[selectedColor] || '';
    });
});

const drawColorText = () => {
    if (currentColorText) {
        const maxWidth = canvas.width * 0.8; 
        const isMobile = window.innerWidth <= 768; 
        const lineHeight = isMobile ? 40 : 56;
        const x = canvas.width / 2;

        // Function to wrap text into lines
        const wrapText = (text, maxWidth) => {
            const words = text.split(' ');
            let line = '';
            const lines = [];

            words.forEach((word) => {
                const testLine = line + word + ' ';
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth > maxWidth && line !== '') {
                    lines.push(line);
                    line = word + ' ';
                } else {
                    line = testLine;
                }
            });
            lines.push(line);
            return lines;
        };

        const lines = wrapText(currentColorText, maxWidth);

        const totalTextHeight = lines.length * lineHeight;
        let y = (canvas.height - totalTextHeight) / 2 + 50;

        ctx.font = "clamp(1.375rem, 1.05rem + 1.625vw, 3rem) 'Finger Paint'"; // 48px to 22px
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.textAlign = 'center';

        // Loop through the lines and draw only the parts covered by the painted area
        lines.forEach((line, lineIndex) => {
            const textWidth = ctx.measureText(line).width;
            const textX = x - textWidth / 2;

            // Only draw the line if its area intersects with the painted area
            for (let i = 0; i < coloredPixels.length; i++) {
                const pixel = coloredPixels[i];
                const lineY = y + lineIndex * lineHeight;

                // Check if the pixel is in the vicinity of the line
                if (pixel.y >= lineY && pixel.y <= lineY + lineHeight &&
                    pixel.x >= textX && pixel.x <= textX + textWidth) {
                    ctx.fillText(line, x, y + lineIndex * lineHeight); 
                    break; 
                }
            }
        });
        ctx.restore();
    }
};

const draw = (e) => {
    if (!isPainting || !colorSelected) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    coloredPixels.push({ x, y });

    drawColorText();
};

canvas.addEventListener('mousedown', (e) => {
    if (!colorSelected) return;
    isPainting = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    drawColorText();
});

canvas.addEventListener('mousemove', draw);

// Mobile

const mobileFill = (x, y) => {
    ctx.save();  // Save the state before filling
    ctx.fillStyle = ctx.strokeStyle;  // Use the stroke color for the circle fill
    ctx.beginPath();
    ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2); // Draw a filled circle
    ctx.fill();
    ctx.restore(); 
};

canvas.addEventListener('touchstart', (e) => {
    if (!colorSelected) return; // Prevent painting if no color is selected
    isPainting = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.touches[0].clientX - rect.left;
    startY = e.touches[0].clientY - rect.top;
});

canvas.addEventListener('touchmove', (e) => {
    if (!isPainting || !colorSelected) return;
    e.preventDefault(); // Prevent scrolling when painting
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();

    coloredPixels.push({ x, y });

    // Reveal the text in the colored area
    mobileFill(x, y);
    drawColorText();
});

canvas.addEventListener('touchend', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    drawColorText();
});
