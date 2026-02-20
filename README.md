# 🎓 Terminal4Kidz2Learn

---

## 🇩🇪 Deutsch

Ein Quiz-Lernspiel im Terminal-Look für Kinder. Wissen aus Mathematik, Geographie und Naturwissenschaft wird spielerisch mit einem Punkte- und XP-System vermittelt.

**Technologie:** Vue 3 · TypeScript · Pinia · Vite · Tauri v2 · MVVM-Architektur

### Web-App starten
```bash
npm install
npm run dev
```

### Desktop-App (Tauri)
```bash
npm install
npx tauri dev        # Entwicklungsmodus
npx tauri build      # Release-Build (.deb / AppImage)
```

### Raspberry Pi 5 (Ubuntu ARM64)
```bash
git clone https://github.com/Mac80Mo/terminal4kidz2learn.git ~/lern-terminal
cd ~/lern-terminal
chmod +x pi-setup.sh && ./pi-setup.sh
```
Das Script installiert alle Abhängigkeiten (Rust, Node.js, WebKitGTK) und baut die Desktop-App direkt auf dem Pi.

### Features
- 3 Themengebiete: Mathematik, Geographie, Naturwissenschaft
- Schwierigkeits-Progression: Leicht → Mittel → Schwer
- Punkte-, XP- und Streak-System mit Level-Aufstieg
- Falsch beantwortete Fragen kommen erneut
- Space-Invaders-Minispiel als Belohnung bei Level-Up
- Desktop-App im maximierten Fenster mit Titelleiste

![Screenshot](.github/assets/screenshot.png)

---

## 🇬🇧 English

A quiz learning game with a terminal look designed for kids. Topics include Math, Geography and Science — taught through a points and XP system.

**Tech Stack:** Vue 3 · TypeScript · Pinia · Vite · Tauri v2 · MVVM Architecture

### Web App
```bash
npm install
npm run dev
```

### Desktop App (Tauri)
```bash
npm install
npx tauri dev        # Development mode
npx tauri build      # Release build (.deb / AppImage)
```

### Raspberry Pi 5 (Ubuntu ARM64)
```bash
git clone https://github.com/Mac80Mo/terminal4kidz2learn.git ~/lern-terminal
cd ~/lern-terminal
chmod +x pi-setup.sh && ./pi-setup.sh
```
The script installs all dependencies (Rust, Node.js, WebKitGTK) and builds the desktop app directly on the Pi.

### Features
- 3 topics: Math, Geography, Science
- Difficulty progression: Easy → Medium → Hard
- Points, XP and streak system with level-ups
- Incorrectly answered questions are repeated
- Space Invaders mini-game as a level-up reward
- Desktop app in maximized window with title bar
