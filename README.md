# DiceDropper 🎲

An interactive web application for rolling multiple dice with realistic physics-based animations. Perfect for tabletop RPG enthusiasts!

## Features

- **Multiple Dice Types**: Support for D4, D6, D8, D10, D12, and D20
- **Physics Simulation**: Realistic dice drop mechanics with gravity, bouncing, and collision detection
- **Interactive UI**: Click to add dice, roll them all at once, and see results instantly
- **Visual Feedback**: Each die type has a unique color and shape
- **Result Tracking**: View individual die results and total sum
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Node.js (optional, for local development server)

### Installation

1. Clone or download this repository
2. Navigate to the project directory

### Running the Application

#### Option 1: Using a Local Server (Recommended)

```bash
npm run dev
```

This will start a local server at `http://localhost:3000` and open it in your default browser.

#### Option 2: Using Python

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Then open `http://localhost:3000` in your browser.

#### Option 3: Direct File Access

Simply open `index.html` in your web browser. Note that some browsers may have restrictions with ES6 modules when opening files directly.

## How to Use

1. **Select Dice**: Click on the dice buttons (D4, D6, D8, etc.) to add them to your roll
2. **Roll**: Click the "🎲 Roll Dice" button to drop and roll all selected dice
3. **View Results**: Watch the dice fall and settle, then see individual results and the total sum
4. **Clear**: Click "Clear All" to reset and start over

## Project Structure

```
dicedropper/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Application styles
├── js/
│   ├── main.js            # Application entry point
│   ├── dice-manager.js    # Dice creation and management
│   ├── physics-engine.js  # Physics simulation
│   └── renderer.js        # Canvas rendering
├── package.json           # Project configuration
└── README.md             # This file
```

## Technologies Used

- **HTML5 Canvas**: For rendering dice and animations
- **Vanilla JavaScript**: ES6 modules for clean, modular code
- **CSS3**: Modern styling with gradients and animations
- **Physics Simulation**: Custom physics engine for realistic dice behavior

## Customization

### Adjusting Physics

Edit [js/physics-engine.js](js/physics-engine.js) to modify:
- `gravity`: Controls how fast dice fall
- `friction`: Affects how quickly dice slow down
- `bounceDamping`: Controls bounce height
- `stableThreshold`: Determines when dice are considered "settled"

### Changing Dice Colors

Edit [js/dice-manager.js](js/dice-manager.js) in the `getColorForDie()` method to customize dice colors.

### Modifying Dice Shapes

Edit [js/renderer.js](js/renderer.js) to change how each die type is rendered on the canvas.

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Supported with touch controls

## Future Enhancements

- Sound effects for dice rolling
- Custom dice skins and themes
- Dice roll history
- Modifier buttons (+/- to results)
- Save/load dice configurations
- Multiplayer support

## License

MIT License - Feel free to use and modify for your own projects!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Made with ❤️ for tabletop gaming enthusiasts
