/**
 * Game - Haupt-Spielklasse (Game Loop)
 * Entspricht der Game-Klasse aus dem Python-Original
 * Nutzt HTML5 Canvas statt Pygame
 */
import { Spaceship } from './Spaceship'
import { Enemy } from './Enemy'
import type { GameConfig, GameCallbacks } from './types'
import { DEFAULT_CONFIG } from './types'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private config: GameConfig
  private callbacks: GameCallbacks

  private spaceship!: Spaceship
  private enemies: Enemy[] = []
  private score = 0
  private running = false
  private gameOver = false
  private animationId: number | null = null

  // Images
  private backgroundImg!: HTMLImageElement
  private spaceshipImg!: HTMLImageElement
  private bulletImg!: HTMLImageElement
  private enemyImg!: HTMLImageElement

  // Keyboard State
  private keysPressed = new Set<string>()

  // Timer
  private startTime = 0
  private remainingSeconds = 0
  private timeUp = false

  constructor(
    canvas: HTMLCanvasElement,
    callbacks: GameCallbacks,
    config: Partial<GameConfig> = {}
  ) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.callbacks = callbacks

    // Canvas-Größe setzen
    this.canvas.width = this.config.width
    this.canvas.height = this.config.height

    // Event Listener
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.gameLoop = this.gameLoop.bind(this)
  }

  /**
   * Bilder laden und Spiel initialisieren
   */
  async init(): Promise<void> {
    const [bgImg, shipImg, bulletImg, enemyImg] = await Promise.all([
      this.loadImage('/sprites/spr_space_himmel.png'),
      this.loadImage('/sprites/spr_spaceship.png'),
      this.loadImage('/sprites/spr_patrone.png'),
      this.loadImage('/sprites/spr_space_enemy.png'),
    ])

    this.backgroundImg = bgImg
    this.spaceshipImg = shipImg
    this.bulletImg = bulletImg
    this.enemyImg = enemyImg

    this.setupGame()
  }

  private setupGame(): void {
    const maxX = this.config.width - 64 // Sprite-Breite berücksichtigen

    // Spaceship erstellen (Mitte unten, wie im Original)
    this.spaceship = new Spaceship(
      370,
      this.config.height - 85,
      this.spaceshipImg,
      this.bulletImg,
      this.config.bulletSpeed,
      maxX
    )

    // Enemies erstellen (zufällige Positionen wie im Original)
    this.enemies = []
    for (let i = 0; i < this.config.enemyCount; i++) {
      this.enemies.push(
        new Enemy(
          Math.random() * maxX,
          30 + Math.random() * 100,
          this.config.enemySpeedX,
          this.config.enemyDropY,
          this.enemyImg,
          maxX
        )
      )
    }

    this.score = 0
    this.gameOver = false
    this.timeUp = false
    this.startTime = 0
    this.remainingSeconds = this.config.timeLimit
    this.callbacks.onScoreChange(this.score)
  }

  /**
   * Spiel starten
   */
  start(): void {
    if (this.running) return

    this.running = true
    this.startTime = performance.now()
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
    this.gameLoop()
  }

  /**
   * Spiel stoppen & aufräumen
   */
  stop(): void {
    this.running = false
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    this.keysPressed.clear()
  }

  /**
   * Spiel komplett zurücksetzen und neu starten
   */
  restart(): void {
    this.stop()
    this.setupGame()
    this.start()
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // Verhindern dass die Seite scrollt bei Pfeiltasten/Leertaste
    if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
      e.preventDefault()
    }

    if (this.keysPressed.has(e.key)) return // Repeat verhindern
    this.keysPressed.add(e.key)

    switch (e.key) {
      case 'ArrowLeft':
        this.spaceship.move(-this.config.shipSpeed)
        break
      case 'ArrowRight':
        this.spaceship.move(this.config.shipSpeed)
        break
      case ' ':
        this.spaceship.fireBullet()
        break
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    this.keysPressed.delete(e.key)

    switch (e.key) {
      case 'ArrowLeft':
        this.spaceship.move(this.config.shipSpeed) // Gegenbewegung stoppen
        break
      case 'ArrowRight':
        this.spaceship.move(-this.config.shipSpeed) // Gegenbewegung stoppen
        break
    }
  }

  private gameLoop(): void {
    if (!this.running) return

    // Hintergrund zeichnen
    this.drawBackground()

    if (!this.gameOver && !this.timeUp) {
      // Timer aktualisieren
      if (this.config.timeLimit > 0) {
        const elapsed = (performance.now() - this.startTime) / 1000
        this.remainingSeconds = Math.max(0, this.config.timeLimit - elapsed)

        if (this.remainingSeconds <= 0) {
          this.timeUp = true
          // Alle Enemies verstecken
          for (const enemy of this.enemies) {
            enemy.hide()
          }
          this.spaceship.draw(this.ctx)
          this.drawScore()
          this.drawTimer()
          this.drawTimeUp()

          if (this.callbacks.onTimeUp) {
            this.callbacks.onTimeUp(this.score)
          } else {
            this.callbacks.onGameOver(this.score)
          }

          // Spiel nach kurzer Pause stoppen
          setTimeout(() => {
            this.stop()
          }, 3000)

          return
        }
      }

      // Spaceship aktualisieren & zeichnen
      this.spaceship.update()
      this.spaceship.draw(this.ctx)

      // Enemies aktualisieren
      let isGameOver = false
      for (const enemy of this.enemies) {
        enemy.update()

        // Kollision prüfen
        const hits = enemy.checkCollision(this.spaceship.bullets)
        if (hits > 0) {
          this.score += hits
          this.callbacks.onScoreChange(this.score)
        }

        // Game Over prüfen (Enemy hat untere Grenze erreicht)
        if (enemy.hasReachedBottom(460)) {
          isGameOver = true
        }

        enemy.draw(this.ctx)
      }

      // Score anzeigen
      this.drawScore()

      // Timer anzeigen wenn Zeitlimit aktiv
      if (this.config.timeLimit > 0) {
        this.drawTimer()
      }

      if (isGameOver) {
        this.gameOver = true
        // Alle Enemies verstecken (wie im Original)
        for (const enemy of this.enemies) {
          enemy.hide()
        }
        this.drawGameOver()
        this.callbacks.onGameOver(this.score)

        // Spiel nach kurzer Pause stoppen
        setTimeout(() => {
          this.stop()
        }, 3000)

        return
      }
    } else if (this.timeUp) {
      // Zeit-Abgelaufen Screen weiter anzeigen
      this.spaceship.draw(this.ctx)
      this.drawScore()
      this.drawTimer()
      this.drawTimeUp()
    } else {
      // Game Over Screen weiter anzeigen
      this.spaceship.draw(this.ctx)
      this.drawScore()
      this.drawGameOver()
    }

    this.animationId = requestAnimationFrame(this.gameLoop)
  }

  private drawBackground(): void {
    // Hintergrundbild kacheln falls nötig (wie im Original)
    const pattern = this.ctx.createPattern(this.backgroundImg, 'repeat')
    if (pattern) {
      this.ctx.fillStyle = pattern
      this.ctx.fillRect(0, 0, this.config.width, this.config.height)
    } else {
      this.ctx.drawImage(this.backgroundImg, 0, 0, this.config.width, this.config.height)
    }
  }

  private drawScore(): void {
    this.ctx.font = '20px "Courier New", monospace'
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(`Punkte: ${this.score}`, 8, 24)
  }

  private drawTimer(): void {
    const minutes = Math.floor(this.remainingSeconds / 60)
    const seconds = Math.ceil(this.remainingSeconds % 60)
    const timeStr = `⏱ ${minutes}:${String(seconds).padStart(2, '0')}`

    this.ctx.font = '20px "Courier New", monospace'
    // Farbe wechselt zu rot wenn weniger als 10 Sekunden
    this.ctx.fillStyle = this.remainingSeconds <= 10 ? '#ff4444' : '#ffff00'
    this.ctx.textAlign = 'right'
    this.ctx.fillText(timeStr, this.config.width - 8, 24)
    this.ctx.textAlign = 'start' // Reset
  }

  private drawTimeUp(): void {
    this.ctx.font = '52px "Courier New", monospace'
    this.ctx.fillStyle = '#ffff00'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('⏰ ZEIT ABGELAUFEN!', this.config.width / 2, this.config.height / 2 - 20)

    this.ctx.font = '24px "Courier New", monospace'
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(
      `Dein Score: ${this.score} Punkte`,
      this.config.width / 2,
      this.config.height / 2 + 30
    )

    this.ctx.font = '18px "Courier New", monospace'
    this.ctx.fillStyle = '#00ff00'
    this.ctx.fillText(
      'Weiter lernen = mehr Spielzeit! 🚀',
      this.config.width / 2,
      this.config.height / 2 + 70
    )

    this.ctx.textAlign = 'start' // Reset
  }

  private drawGameOver(): void {
    this.ctx.font = '64px "Courier New", monospace'
    this.ctx.fillStyle = '#ff0000'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('GAME OVER', this.config.width / 2, this.config.height / 2)
    
    this.ctx.font = '20px "Courier New", monospace'
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillText(
      `Endpunktzahl: ${this.score}`,
      this.config.width / 2,
      this.config.height / 2 + 50
    )

    this.ctx.textAlign = 'start' // Reset
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error(`Bild konnte nicht geladen werden: ${src}`))
      img.src = src
    })
  }
}
