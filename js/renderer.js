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
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2 + 3);
        this.ctx.lineTo(-size / 2 + 3, size / 2 + 3);
        this.ctx.lineTo(size / 2 + 3, size / 2 + 3);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw die with 3D gradient
        const gradient = this.ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
        gradient.addColorStop(0, this.lightenColor(die.color, 40));
        gradient.addColorStop(0.5, die.color);
        gradient.addColorStop(1, this.darkenColor(die.color, 30));
        
        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = this.darkenColor(die.color, 50);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(-size / 2, size / 2);
        this.ctx.lineTo(size / 2, size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // Add highlight edge
        this.ctx.strokeStyle = this.lightenColor(die.color, 60);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(-size / 2 * 0.3, 0);
        this.ctx.stroke();
        
        this.drawNumber(die);
    }
    
    drawSquare(die) {
        const size = die.size;
        
        // Draw shadow
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.fillRect(-size / 2 + 3, -size / 2 + 3, size, size);
        
        // Draw 3D cube effect with gradient
        const gradient = this.ctx.createRadialGradient(-size / 4, -size / 4, 0, 0, 0, size);
        gradient.addColorStop(0, this.lightenColor(die.color, 50));
        gradient.addColorStop(0.6, die.color);
        gradient.addColorStop(1, this.darkenColor(die.color, 40));
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-size / 2, -size / 2, size, size);
        
        // Draw 3D edge highlights (top and left)
        this.ctx.fillStyle = this.lightenColor(die.color, 60);
        this.ctx.fillRect(-size / 2, -size / 2, size, size * 0.15);
        this.ctx.fillRect(-size / 2, -size / 2, size * 0.15, size);
        
        // Draw 3D shadows (bottom and right)
        this.ctx.fillStyle = this.darkenColor(die.color, 50);
        this.ctx.fillRect(-size / 2, size / 2 - size * 0.15, size, size * 0.15);
        this.ctx.fillRect(size / 2 - size * 0.15, -size / 2, size * 0.15, size);
        
        // Border
        this.ctx.strokeStyle = this.darkenColor(die.color, 60);
        this.ctx.lineWidth = 2;
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
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.moveTo(0 + 3, -size / 2 + 3);
        this.ctx.lineTo(size / 3 + 3, 0 + 3);
        this.ctx.lineTo(0 + 3, size / 2 + 3);
        this.ctx.lineTo(-size / 3 + 3, 0 + 3);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw die with 3D gradient
        const gradient = this.ctx.createLinearGradient(-size / 3, -size / 2, size / 3, size / 2);
        gradient.addColorStop(0, this.lightenColor(die.color, 50));
        gradient.addColorStop(0.5, die.color);
        gradient.addColorStop(1, this.darkenColor(die.color, 40));
        
        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = this.darkenColor(die.color, 60);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(size / 3, 0);
        this.ctx.lineTo(0, size / 2);
        this.ctx.lineTo(-size / 3, 0);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // Add highlight edge
        this.ctx.strokeStyle = this.lightenColor(die.color, 70);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(-size / 3 * 0.5, -size / 4);
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
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * (size / 2) + 3;
            const y = Math.sin(angle) * (size / 2) + 3;
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
        
        // Draw die with radial gradient for 3D effect
        const gradient = this.ctx.createRadialGradient(-size / 4, -size / 4, 0, 0, 0, size);
        gradient.addColorStop(0, this.lightenColor(die.color, 50));
        gradient.addColorStop(0.5, die.color);
        gradient.addColorStop(1, this.darkenColor(die.color, 40));
        
        this.ctx.fillStyle = gradient;
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
        
        // Add highlight edges on the "lit" side
        this.ctx.strokeStyle = this.lightenColor(die.color, 70);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let i = 0; i < sides / 3; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const x = Math.cos(angle) * (size / 2);
            const y = Math.sin(angle) * (size / 2);
            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
        
        // Border
        this.ctx.strokeStyle = this.darkenColor(die.color, 60);
        this.ctx.lineWidth = 2;
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
        this.ctx.stroke();
    }
    
    drawNumber(die) {
        // Draw text shadow for depth
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        this.ctx.font = `bold ${die.size * 0.6}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(die.result, 1, 1);
        
        // Draw text outline
        this.ctx.strokeStyle = '#2c3e50';
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(die.result, 0, 0);
        
        // Draw text fill
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(die.result, 0, 0);
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
    
    darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max(0, (num >> 16) - amt);
        const G = Math.max(0, (num >> 8 & 0x00FF) - amt);
        const B = Math.max(0, (num & 0x0000FF) - amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
}
