#!/bin/bash
# ============================================================
# 🎓 Lern-Terminal - Raspberry Pi 5 Setup & Build Script
# ============================================================
# Dieses Script installiert alle Voraussetzungen, klont das
# Projekt und baut die Desktop-App auf dem Raspberry Pi 5.
#
# Ausführen mit:  chmod +x pi-setup.sh && ./pi-setup.sh
# ============================================================

set -e  # Bei Fehler sofort abbrechen

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   🎓 Lern-Terminal - Raspberry Pi Setup              ║"
echo "║   Für Ubuntu Desktop ARM64 auf Raspberry Pi 5        ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# --- Schritt 1: System-Pakete aktualisieren & installieren ---
echo "📦 [1/6] System-Pakete installieren..."
sudo apt update
sudo apt install -y \
    build-essential \
    curl \
    wget \
    git \
    libwebkit2gtk-4.1-dev \
    libgtk-3-dev \
    librsvg2-dev \
    libssl-dev \
    libayatana-appindicator3-dev \
    pkg-config \
    file

echo "✅ System-Pakete installiert!"

# --- Schritt 2: Node.js installieren (falls nicht vorhanden) ---
echo ""
echo "📦 [2/6] Node.js prüfen/installieren..."
if command -v node &> /dev/null; then
    echo "✅ Node.js bereits installiert: $(node --version)"
else
    echo "Node.js wird installiert (v22 LTS)..."
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
    sudo apt install -y nodejs
    echo "✅ Node.js installiert: $(node --version)"
fi

# --- Schritt 3: Rust installieren (falls nicht vorhanden) ---
echo ""
echo "🦀 [3/6] Rust prüfen/installieren..."
if command -v rustc &> /dev/null; then
    echo "✅ Rust bereits installiert: $(rustc --version)"
else
    echo "Rust wird installiert (dies dauert ca. 1-2 Minuten)..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    echo "✅ Rust installiert!"
fi

# Rust in den PATH laden
. "$HOME/.cargo/env"
echo "   Rust: $(rustc --version)"
echo "   Cargo: $(cargo --version)"

# --- Schritt 4: Projekt klonen ---
echo ""
echo "📂 [4/6] Projekt klonen..."
PROJECT_DIR="$HOME/lern-terminal"

if [ -d "$PROJECT_DIR" ]; then
    echo "Verzeichnis existiert bereits, aktualisiere..."
    cd "$PROJECT_DIR"
    git pull origin main
else
    git clone https://github.com/Mac80Mo/terminal4kidz2learn.git "$PROJECT_DIR"
    cd "$PROJECT_DIR"
fi

echo "✅ Projekt bereit in: $PROJECT_DIR"

# --- Schritt 5: npm Abhängigkeiten installieren ---
echo ""
echo "📦 [5/6] npm Abhängigkeiten installieren..."
npm install
echo "✅ npm Abhängigkeiten installiert!"

# --- Schritt 6: Tauri Desktop-App bauen ---
echo ""
echo "🔨 [6/6] Desktop-App bauen (dies dauert ca. 10-20 Minuten auf dem Pi)..."
echo "         Bitte Geduld haben - Rust kompiliert viele Pakete!"
echo ""
npx tauri build

echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║   ✅ BUILD ERFOLGREICH!                               ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# --- Ergebnis anzeigen ---
DEB_FILE=$(find src-tauri/target/release/bundle/deb -name "*.deb" 2>/dev/null | head -1)
APPIMAGE_FILE=$(find src-tauri/target/release/bundle/appimage -name "*.AppImage" 2>/dev/null | head -1)

if [ -n "$DEB_FILE" ]; then
    echo "📦 DEB-Paket: $DEB_FILE"
    echo "   Installieren mit: sudo dpkg -i $DEB_FILE"
    echo ""
fi

if [ -n "$APPIMAGE_FILE" ]; then
    echo "📦 AppImage: $APPIMAGE_FILE"
    echo "   Ausführen mit: chmod +x $APPIMAGE_FILE && $APPIMAGE_FILE"
    echo ""
fi

echo "🎮 Nach der Installation kannst du das Lern-Terminal"
echo "   über das Anwendungsmenü oder per Befehl starten:"
echo "   $ lern-terminal"
echo ""
echo "🎓 Viel Spaß beim Lernen!"
