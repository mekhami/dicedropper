export default class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }
    
    setCanvasSize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
    }
    
    clear() {
        // Fill with white background instead of clearing to transparent
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    
    drawDice(dice) {
        dice.forEach(die => {
            this.drawDie(die);
        });
    }
    
    drawDie(die) {
        this.ctx.save();
        this.ctx.translate(die.x, die.y);
        this.ctx.rotate(die.rotation);
        
        // Draw die shape based on number of sides
        if (die.sides === 4) {
            this.drawTriangle(die);
        } else if (die.sides === 6) {
            this.drawSquare(die);
        } else if (die.sides === 8) {
            this.drawOctagon(die);
        } else if (die.sides === 10) {
            this.drawKite(die);
        } else if (die.sides === 12) {
            this.drawDodecagon(die);
        } else if (die.sides === 20) {
            this.drawIcosahedron(die);
        }
        
        this.ctx.restore();
    }
    
    drawTriangle(die) {
        const size = die.size;
        
        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2 + 2);
        this.ctx.lineTo(-size / 2 + 2, size / 2 + 2);
        this.ctx.lineTo(size / 2 + 2, size / 2 + 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw die
        this.ctx.fillStyle = die.color;
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(-size / 2, size / 2);
        this.ctx.lineTo(size / 2, size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        this.drawNumber(die);
    }
    
    drawSquare(die) {
        const size = die.size;
        
        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(-size / 2 + 2, -size / 2 + 2, size, size);
        
        // Draw die
        this.ctx.fillStyle = die.color;
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        this.ctx.fillRect(-size / 2, -size / 2, size, size);
        this.ctx.strokeRect(-size / 2, -size / 2, size, size);
        
        this.drawNumber(die);
    }
    
    drawOctagon(die) {
        const size = die.size;
        const sides = 8;
        
        this.drawPolygon(die, sides, size);
        this.drawNumber(die);
    }
    
    drawKite(die) {
        const size = die.size;
        
        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        this.ctx.moveTo(0 + 2, -size / 2 + 2);
        this.ctx.lineTo(size / 3 + 2, 0 + 2);
        this.ctx.lineTo(0 + 2, size / 2 + 2);
        this.ctx.lineTo(-size / 3 + 2, 0 + 2);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw die
        this.ctx.fillStyle = die.color;
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(size / 3, 0);
        this.ctx.lineTo(0, size / 2);
        this.ctx.lineTo(-size / 3, 0);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        this.drawNumber(die);
    }
    
    drawDodecagon(die) {
        const size = die.size;
        const sides = 12;
        
        this.drawPolygon(die, sides, size);
        this.drawNumber(die);
    }
    
    drawIcosahedron(die) {
        const size = die.size;
        const sides = 20;
        
        this.drawPolygon(die, sides, size);
        this.drawNumber(die);
    }
    
    drawPolygon(die, sides, size) {
        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * (size / 2) + 2;
            const y = Math.sin(angle) * (size / 2) + 2;
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw die
        this.ctx.fillStyle = die.color;
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * (size / 2);
            const y = Math.sin(angle) * (size / 2);
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
    }
    
    drawNumber(die) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        this.ctx.font = `bold ${die.size * 0.6}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Draw text outline
        this.ctx.strokeText(die.result, 0, 0);
        // Draw text fill
        this.ctx.fillText(die.result, 0, 0);
    }
}
