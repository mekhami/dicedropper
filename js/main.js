import DiceManager from './dice-manager.js';
import PhysicsEngine from './physics-engine.js';
import Renderer from './renderer.js';

class DiceDropperApp {
    constructor() {
        this.canvas = document.getElementById('diceCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.diceManager = new DiceManager();
        this.physicsEngine = new PhysicsEngine();
        this.renderer = new Renderer(this.ctx);
        
        this.selectedDice = {
            d4: 0,
            d6: 0,
            d8: 0,
            d10: 0,
            d12: 0,
            d20: 0
        };
        
        this.isRolling = false;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.updateDiceCounts();
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.physicsEngine.setBounds(this.canvas.width, this.canvas.height);
        this.renderer.setCanvasSize(this.canvas.width, this.canvas.height);
    }
    
    setupEventListeners() {
        // Dice selection buttons
        document.querySelectorAll('.dice-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sides = parseInt(btn.dataset.sides);
                this.addDie(sides);
            });
            
            // Right-click to reduce dice count
            btn.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                const sides = parseInt(btn.dataset.sides);
                this.removeDie(sides);
            });
        });
        
        // Roll button
        document.getElementById('roll-btn').addEventListener('click', () => {
            this.rollDice();
        });
        
        // Clear button
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearAll();
        });
        
        // Save as JPEG button
        document.getElementById('save-jpeg-btn').addEventListener('click', () => {
            this.saveAsJPEG();
        });
        
        // Save as PDF button
        document.getElementById('save-pdf-btn').addEventListener('click', () => {
            this.saveAsPDF();
        });
    }
    
    addDie(sides) {
        const diceType = `d${sides}`;
        this.selectedDice[diceType]++;
        this.updateDiceCounts();
    }
    
    removeDie(sides) {
        const diceType = `d${sides}`;
        if (this.selectedDice[diceType] > 0) {
            this.selectedDice[diceType]--;
            this.updateDiceCounts();
        }
    }
    
    updateDiceCounts() {
        Object.keys(this.selectedDice).forEach(diceType => {
            const sides = diceType.substring(1);
            const countElement = document.getElementById(`count-${diceType}`);
            if (countElement) {
                countElement.textContent = this.selectedDice[diceType];
            }
        });
        
        const totalDice = Object.values(this.selectedDice).reduce((sum, count) => sum + count, 0);
        document.getElementById('roll-btn').disabled = totalDice === 0;
    }
    
    rollDice() {
        if (this.isRolling) return;
        
        this.isRolling = true;
        this.diceManager.clear();
        
        // Create dice instances
        const allDice = [];
        Object.entries(this.selectedDice).forEach(([diceType, count]) => {
            const sides = parseInt(diceType.substring(1));
            for (let i = 0; i < count; i++) {
                const die = this.diceManager.createDie(sides, this.canvas.width, this.canvas.height);
                allDice.push(die);
            }
        });
        
        // Start physics simulation
        this.physicsEngine.setDice(allDice);
        this.animate();
    }
    
    animate() {
        this.physicsEngine.update();
        this.renderer.clear();
        this.renderer.drawDice(this.physicsEngine.getDice());
        
        if (this.physicsEngine.isStable()) {
            this.isRolling = false;
        } else {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    saveAsJPEG() {
        // Ensure there are dice on the canvas
        const dice = this.physicsEngine.getDice();
        if (dice.length === 0) {
            alert('Please roll some dice first!');
            return;
        }
        
        // Create download link
        this.canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            link.download = `dice-roll-${timestamp}.jpg`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
    }
    
    saveAsPDF() {
        // Ensure there are dice on the canvas
        const dice = this.physicsEngine.getDice();
        if (dice.length === 0) {
            alert('Please roll some dice first!');
            return;
        }
        
        // Convert canvas to image data
        const imgData = this.canvas.toDataURL('image/jpeg', 0.95);
        
        // Create PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: this.canvas.width > this.canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [this.canvas.width, this.canvas.height]
        });
        
        pdf.addImage(imgData, 'JPEG', 0, 0, this.canvas.width, this.canvas.height);
        
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        pdf.save(`dice-roll-${timestamp}.pdf`);
    }
    
    clearAll() {
        Object.keys(this.selectedDice).forEach(key => {
            this.selectedDice[key] = 0;
        });
        this.updateDiceCounts();
        this.diceManager.clear();
        this.physicsEngine.clear();
        this.renderer.clear();
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isRolling = false;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DiceDropperApp();
});
