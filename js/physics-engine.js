export default class PhysicsEngine {
    constructor() {
        this.friction = 0.985; // Less friction = dice travel farther
        this.bounceDamping = 0.8; // Higher bounce for more action
        this.rotationDamping = 0.96;
        this.stableThreshold = 0.1;
        this.stableTime = 0;
        this.requiredStableTime = 60; // frames
        this.bounds = { width: 800, height: 600 };
        this.dice = [];
    }
    
    setBounds(width, height) {
        this.bounds.width = width;
        this.bounds.height = height;
    }
    
    setDice(dice) {
        this.dice = dice;
        this.stableTime = 0;
    }
    
    getDice() {
        return this.dice;
    }
    
    update() {
        let allSettled = true;
        
        this.dice.forEach(die => {
            // Apply friction (dice sliding on paper)
            die.vx *= this.friction;
            die.vy *= this.friction;
            
            // Update position
            die.x += die.vx;
            die.y += die.vy;
            
            // Update rotation
            die.rotation += die.rotationSpeed;
            die.rotationSpeed *= this.rotationDamping;
            
            // Keep dice on the paper (within bounds)
            // Top edge
            if (die.y - die.size / 2 < 0) {
                die.y = die.size / 2;
                die.vy *= -this.bounceDamping;
            }
            
            // Bottom edge
            if (die.y + die.size / 2 > this.bounds.height) {
                die.y = this.bounds.height - die.size / 2;
                die.vy *= -this.bounceDamping;
            }
            
            // Left edge
            if (die.x - die.size / 2 < 0) {
                die.x = die.size / 2;
                die.vx *= -this.bounceDamping;
            }
            
            // Right edge
            if (die.x + die.size / 2 > this.bounds.width) {
                die.x = this.bounds.width - die.size / 2;
                die.vx *= -this.bounceDamping;
            }
            
            // Check if die is moving
            const speed = Math.sqrt(die.vx * die.vx + die.vy * die.vy);
            if (speed > this.stableThreshold || Math.abs(die.rotationSpeed) > 0.01) {
                allSettled = false;
                die.isSettled = false;
            } else {
                die.isSettled = true;
            }
        });
        
        // Check dice-to-dice collisions
        for (let i = 0; i < this.dice.length; i++) {
            for (let j = i + 1; j < this.dice.length; j++) {
                this.handleCollision(this.dice[i], this.dice[j]);
            }
        }
        
        // Update stable time
        if (allSettled) {
            this.stableTime++;
        } else {
            this.stableTime = 0;
        }
    }
    
    handleCollision(die1, die2) {
        const dx = die2.x - die1.x;
        const dy = die2.y - die1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (die1.size + die2.size) / 2;
        
        if (distance < minDistance && distance > 0) {
            // Normalize collision vector
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Separate dice
            const overlap = minDistance - distance;
            die1.x -= nx * overlap / 2;
            die1.y -= ny * overlap / 2;
            die2.x += nx * overlap / 2;
            die2.y += ny * overlap / 2;
            
            // Calculate relative velocity
            const dvx = die2.vx - die1.vx;
            const dvy = die2.vy - die1.vy;
            const dvn = dvx * nx + dvy * ny;
            
            // Only resolve if dice are moving towards each other
            if (dvn < 0) {
                // Apply impulse
                const impulse = dvn * 0.8; // 0.8 is restitution
                die1.vx += nx * impulse;
                die1.vy += ny * impulse;
                die2.vx -= nx * impulse;
                die2.vy -= ny * impulse;
            }
        }
    }
    
    isStable() {
        return this.stableTime >= this.requiredStableTime;
    }
    
    clear() {
        this.dice = [];
        this.stableTime = 0;
    }
}
