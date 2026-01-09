class Die {
    constructor(sides, x, y) {
        this.sides = sides;
        this.x = x;
        this.y = y;
        // Much more aggressive scatter velocity in all directions
        const angle = Math.random() * Math.PI * 2;
        const speed = 8 + Math.random() * 12; // Significantly increased speed
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.6; // More rotation
        this.size = this.getSizeForDie(sides);
        this.color = this.getColorForDie(sides);
        this.result = 0;
        this.isSettled = false;
    }
    
    getSizeForDie(sides) {
        const baseSizes = {
            4: 30,
            6: 35,
            8: 32,
            10: 32,
            12: 33,
            20: 38
        };
        return baseSizes[sides] || 35;
    }
    
    getColorForDie(sides) {
        const colors = {
            4: '#ff6b6b',    // Red
            6: '#4ecdc4',    // Teal
            8: '#45b7d1',    // Blue
            10: '#f9ca24',   // Yellow
            12: '#a29bfe',   // Purple
            20: '#fd79a8'    // Pink
        };
        return colors[sides] || '#95a5a6';
    }
    
    roll() {
        this.result = Math.floor(Math.random() * this.sides) + 1;
        return this.result;
    }
}

export default class DiceManager {
    constructor() {
        this.dice = [];
    }
    
    createDie(sides, canvasWidth, canvasHeight) {
        // Start dice from center of canvas with scatter velocity
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        
        // Larger initial offset from center for more spread
        const offsetX = (Math.random() - 0.5) * 200;
        const offsetY = (Math.random() - 0.5) * 200;
        
        const die = new Die(sides, centerX + offsetX, centerY + offsetY);
        die.roll();
        this.dice.push(die);
        return die;
    }
    
    getDice() {
        return this.dice;
    }
    
    clear() {
        this.dice = [];
    }
}
