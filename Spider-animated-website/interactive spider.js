// Created by [Your Name]
let w, h;
const ctx = canvas.getContext("2d");
const { sin, cos, PI, hypot, min, max } = Math;
function spawn() {
    const pts = many(333, () => {
        return {
            x: rnd(innerWidth),
            y: rnd(innerHeight),
            len: 0,
            r: 0
        };
    });
    const pts2 = many(9, (i) => {
        return {
            x: cos((i / 9) * PI * 2),
            y: sin((i / 9) * PI * 2)
        };
    });
    let seed = rnd(100);
    let tx = rnd(innerWidth);
    let ty = rnd(innerHeight);
    let x = rnd(innerWidth);
    let y = rnd(innerHeight);
    let kx = rnd(0.8, 0.8);
    let ky = rnd(0.8, 0.8);
    let walkRadius = pt(rnd(50, 50), rnd(50, 50));
    let r = innerWidth / rnd(100, 150);
    function paintPt(pt) {
        // Set the stroke color for the lines
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillStyle = 'rgba(0, 255, 0, 0.7)';
        pts2.forEach((pt2) => {
            if (!pt.len) return;
            // Draw the lines with the specified color
            drawLine(
                lerp(x + pt2.x * r, pt.x, pt.len * pt.len),
                lerp(y + pt2.y * r, pt.y, pt.len * pt.len),
                x + pt2.x * r,
                y + pt2.y * r
            );
        });

        // Draw the circle with the specified color
        drawCircle(pt.x, pt.y, pt.r);
    }
    return {
        follow(x, y) {
            tx = x;
            ty = y;
        },
        tick(t) {
            const selfMoveX = cos(t * kx + seed) * walkRadius.x;
            const selfMoveY = sin(t * ky + seed) * walkRadius.y;
            let fx = tx + selfMoveX;
            let fy = ty + selfMoveY;
            x += min(innerWidth / 100, (fx - x) / 10);
            y += min(innerWidth / 100, (fy - y) / 10);
            let i = 0;

    pts.forEach((pt) => {
        const dx = pt.x - x,
            dy = pt.y - y;
        const len = hypot(dx, dy);
        let r = min(2, innerWidth / len / 5);
        pt.t = 0;
        const increasing = len < innerWidth / 10 
            && (i++) < 8;
        let dir = increasing ? 0.1 : -0.1;
        if (increasing) {
            r *= 1.5;
        }
        pt.r = r;
        pt.len = max(0, min(pt.len + dir, 1));
        paintPt(pt)
    });               
        } 
    }
}

const spiders = many(2, spawn)
addEventListener("pointermove", (e) => {
    spiders.forEach(spider => {
        spider.follow(e.clientX, e.clientY)
    })
});
requestAnimationFrame(function anim(t) {
    if (w !== innerWidth) w = canvas.width = innerWidth;
    if (h !== innerHeight) h = canvas.height = innerHeight;
    ctx.fillStyle = "#000";
    drawCircle(0, 0, w * 10);
    ctx.fillStyle = ctx.strokeStyle = "#fff";
    t/=1000
    spiders.forEach(spider => spider.tick(t))
    requestAnimationFrame(anim);
});

function recalc(X, Y) {
    tx = X;
    ty = Y;
}
function rnd(x = 1, dx = 0) {
    return Math.random() * x + dx;
}
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function drawCircle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * PI);
    ctx.fill(); 
}
function many(n, f) {
    return [...Array(n)].map((_, i) => f(i));
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function noise(x, y, t = 101) {
    let w0 = sin(0.3 * x + 1.4 * t + 2.0 + 
                 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
    let w1 = sin(0.2 * y + 1.5 * t + 2.8 + 
                 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
    return w0 + w1;
}
function pt(x,y){
    return {x,y}
}
function showTextCentered() {
    // Create the container for the centered text
    const container = document.createElement('div');
    // Fixed position for centering
    container.style.position = 'fixed';
    // Center vertically 
    container.style.top = '50%'; 
    // Center horizontally
    container.style.left = '50%'; 
    // Adjust to truly center
    container.style.transform = 'translate(-50%, -50%)'; 
    container.style.color = 'blanchedalmond';
    container.style.fontFamily = 'Arial, sans-serif';
    // Center the text inside the container
    container.style.textAlign = 'center'; 
    // Ensure it's above other elements
    container.style.zIndex = '999'; 
    // Use flexbox for alignment
    container.style.display = 'flex'; 
    // Stack the text vertically
    container.style.flexDirection = 'column'; 
    // Center items horizontally within the flex container
    container.style.alignItems = 'center'; 
    // Center items vertically inside flexbox
    container.style.justifyContent = 'center'; 
    // Make sure the container takes full width
    container.style.width = '100%';
    // Make sure the container takes full height of the viewport 
    container.style.height = '100vh'; 

    // Text Line 1
    const line1 = document.createElement('div');
    line1.style.fontSize = '50px';
    line1.style.fontWeight = 'bold';
    line1.innerText = "WELCOME TO MY WEBPAGE!";
    line1.style.transition = 'color 0.3s'; 
    line1.addEventListener('mouseenter', () => {
        line1.style.color = 'green'; 
    });
    line1.addEventListener('mouseleave', () => {
        line1.style.color = 'blanchedalmond'; 
    });
    container.appendChild(line1);

    // Text Line 2
    const line2 = document.createElement('div');
    line2.style.fontSize = '60px';
    line2.style.fontWeight = 'bold';
    line2.style.marginTop = '10px';
    line2.innerText = "I'm Surya!";
    line2.style.transition = 'color 0.3s'; 
    line2.addEventListener('mouseenter', () => {
        line2.style.color = 'green'; 
    });
    line2.addEventListener('mouseleave', () => {
        line2.style.color = 'blanchedalmond'; 
    });
    container.appendChild(line2);


    const line4 = document.createElement('div');
    line4.style.fontSize = '40px';
    line4.style.fontWeight = 'bold';
    line4.style.marginTop = '10px';
    line4.innerText = "";
    line4.style.transition = 'color 0.3s'; 
    line4.addEventListener('mouseenter', () => {
        line4.style.color = 'green'; 
    });
    line4.addEventListener('mouseleave', () => {
        line4.style.color = 'blanchedalmond'; 
    });
    container.appendChild(line4);

    // Add the container to the body
    document.body.appendChild(container);

        // Add scroll down icon
        const scrollIcon = document.createElement('i');
        scrollIcon.className = 'fas fa-chevron-down'; 
        scrollIcon.style.fontSize = '50px'; 
        scrollIcon.style.marginTop = '10px'; 
        scrollIcon.style.animation = 'bounce 1.5s infinite'; 
        line4.appendChild(scrollIcon); 
        container.appendChild(line4);


        const line5 = document.createElement('a'); 
        line5.href = 'https://suryaportfolio-com.netlify.app/'; 

        // line5.target 
        line5.style.fontSize = '40px';
        line5.style.fontWeight = 'bold';
        line5.style.marginTop = '10px';
        line5.style.color = 'blanchedalmond'; 
        line5.style.textDecoration = 'none'; 
        line5.style.transition = 'color 0.3s'; 
        line5.innerText = 'Click Here!';

        line5.addEventListener('mouseenter', () => {
            line5.style.color = 'red'; 
        });
        line5.addEventListener('mouseleave', () => {
            line5.style.color = 'blanchedalmond'; 
        });
        container.appendChild(line5);

    
        // Add the container to the body
        document.body.appendChild(container);
    
        // Add the FontAwesome CDN link
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'; // FontAwesome CDN
        document.head.appendChild(link);
}

// Call the function to display centered text
showTextCentered();





