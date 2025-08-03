# TRON Game

A 3D TRON-style grid-based survival game built with Three.js, featuring AI opponents, power-ups, collapsing sections, and dynamic gameplay mechanics.

## 🎮 Game Overview

Navigate through a futuristic 3D grid while avoiding AI opponents (red spheres) that chase you. Survive as long as possible while collecting power-ups and avoiding collapsing sections of the grid.

## 🚀 Features

### Core Gameplay
- **3D Grid Environment**: Navigate through a 51x51 grid with dynamic lighting
- **AI Opponents**: Red AI spheres that intelligently chase the player
- **Trail System**: Visual trails follow both player and AI movements
- **Particle Effects**: Dynamic particle systems for movement and interactions
- **Collapsing Sections**: Yellow sections that appear and disappear, creating obstacles

### Power-ups & Orbs
- **Yellow Orb**: Speed boost for 10 seconds (collectible by both player and AI)
- **Blue Orb**: Makes AI flee to corners for 10 seconds
- **Orange Orb**: Double damage - doubles collapsing sections for 3 seconds
- **White Orb**: Teleports collector to opposite corner
- **Cyan Orb**: Extra life
- **Magenta Orb**: Shield protection for 20 seconds

### Visual Features
- **Celestial Star Map**: Dynamic starfield backdrop
- **Dynamic Camera System**: Chase camera and free camera modes
- **Grid Expansion**: Vertical grids appear progressively (North, South, West, East, Roof)
- **Lighting Effects**: Spotlight follows player, ambient lighting, and emissive materials
- **Shield Halo**: Visual indicator when shield is active

### Audio
- **Background Music**: Morse code "TRON" pattern that speeds up over time
- **Sound Effects**: Movement sounds and orb collection audio
- **Dynamic Rhythm**: Music tempo increases as game progresses

## 🎯 Controls

### Gameplay Controls
- **Arrow Keys**: Move player
  - In Chase Mode: Forward/backward relative to facing direction, left/right to turn
  - In Free Mode: Direct movement in cardinal directions
- **V**: Toggle between Chase Camera and Free Camera modes
- **Enter**: Start game or restart after game over
- **Escape**: Pause/unpause game

### Camera Modes
1. **Chase Camera**: Follows behind player with relative movement controls
2. **Free Camera**: Independent camera with orbit controls

## 🎮 Game Mechanics

### Scoring System
- **Time-based scoring**: Points accumulate based on survival time
- **High Score tracking**: Local storage of best scores
- **Leaderboard**: Top 10 scores with 3-letter names

### Lives System
- Start with 3 lives
- Lose a life when caught by AI (unless shield is active)
- Extra lives available through cyan orbs
- Game over when all lives are lost

### AI Behavior
- **Chase Mode**: AI moves toward player using alternating X/Z movement
- **Flee Mode**: When blue orb is collected, AI moves to safest corners
- **Speed Scaling**: AI can collect yellow orbs for speed boosts
- **Collision Avoidance**: AI avoids collapsing sections
- **Progressive Spawning**: New AI spawns every 60 seconds

### Dynamic Difficulty
- **Increasing AI**: New opponents spawn over time
- **Faster Music**: Background rhythm accelerates
- **More Obstacles**: Additional collapsing sections added every 36 seconds
- **Grid Expansion**: Vertical boundaries appear at timed intervals

## 🛠️ Technical Details

### Built With
- **Three.js**: 3D graphics and rendering
- **Web Audio API**: Sound generation and music
- **HTML5 Canvas**: Procedural starfield texture generation
- **Local Storage**: High score and leaderboard persistence

### Key Components
- **Scene Setup**: Camera, renderer, lighting configuration
- **Grid System**: Multiple layered grids (floor, walls, ceiling)
- **Player System**: Movement, collision detection, trail rendering
- **AI System**: Pathfinding, behavior states, collision detection
- **Orb System**: Spawning, collection, effect management
- **Collapse System**: Dynamic obstacle generation and animation
- **Particle Systems**: Visual effects for movement and interactions

### Performance Features
- **Efficient Rendering**: Optimized geometry and material usage
- **Dynamic Loading**: Progressive grid appearance
- **Memory Management**: Proper cleanup of geometries and materials
- **Responsive Design**: Automatic resize handling

## 🎨 Visual Design

### Color Scheme
- **Player**: Cyan (#00FFFF) with emissive glow
- **AI Opponents**: Red (#FF0000) with emissive glow
- **Grid**: Cyan lines with transparency
- **Power-ups**: Various bright colors with emissive effects
- **Background**: Starfield with cylindrical projection

### Effects
- **Emissive Materials**: Glowing spheres and orbs
- **Transparency**: Grid lines and particle effects
- **Dynamic Opacity**: Fading trails and collapsing sections
- **Screen Flash**: Visual feedback for orb collection

## 🚦 Getting Started

### Prerequisites
- Modern web browser with WebGL support
- Web Audio API support

### Installation
1. Clone or download the game files
2. Ensure all assets are in the same directory
3. Open `index.html` in a web browser
4. Click "START" to begin playing

### File Structure
```
game/
├── index.html          # Main HTML file
├── script.js           # Game logic (provided code)
├── style.css           # Styling
└── README.md           # This file
```

## 🎵 Audio System

The game features a unique audio system that plays morse code for "TRON":
- **T**: Dash (long tone)
- **R**: Dot-Dash-Dot (short-long-short)
- **O**: Dash-Dash-Dash (long-long-long)  
- **N**: Dash-Dot (long-short)

The tempo increases over time, creating escalating tension as the game progresses.

## 🏆 Scoring and Progression

### Scoring
- Points = Base Score + Survival Time (in seconds)
- Time starts counting from first movement
- Final score calculated at game over

### Progression Timeline
- **10s**: First orbs begin spawning
- **60s**: North wall grid appears, first AI spawn
- **120s**: South wall grid appears
- **180s**: West wall grid appears  
- **240s**: East wall grid appears
- **300s**: Ceiling grid appears
- **Every 36s**: Additional collapsing sections
- **Every 60s**: New AI opponent spawns

## 🐛 Known Issues and Limitations

- Game requires WebGL and Web Audio API support
- Performance may vary on older devices
- No mobile touch controls (keyboard only)
- Local storage required for high scores

## 🤝 Contributing

This is a single-file game implementation. To modify:
1. Edit the main script file
2. Test thoroughly across different browsers
3. Ensure audio and visual effects work correctly
4. Maintain performance optimization

## 📝 License

This game implementation is provided as-is for educational and entertainment purposes.

---

**Enjoy the game and try to beat your high score!** 🎮✨

## 📬 Contact

| Platform | Link |
|---------|------|
| 🌐 Website | [vizart.netlify.app](https://vizart.netlify.app) |
| 💼 LinkedIn | [linkedin.com/in/myfza](https://linkedin.com/in/myfza) |
| 🐙 GitHub | [github.com/Myfza](https://github.com/Myfza) |
| 📧 Email | [vizart.id@gmail.com](mailto:vizart.id@gmail.com) |

---

Made by **Muhammad Yusuf Aditiya**  
Open-source for educational and personal development.
