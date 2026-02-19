/**
 * Enemy - Feindliche Aliens
 * Entspricht der Enemy-Klasse aus dem Python-Original
 */
import type { Bullet } from './Bullet'

export class Enemy {
  x: number
  y: number
  private changeX: number
  private changeY: number
  private image: HTMLImageElement
  private maxX: number

  constructor(
    x: number,
    y: number,
    speedX: number,
    dropY: number,
    image: HTMLImageElement,
    maxX: number
  ) {
    this.x = x
    this.y = y
    this.changeX = speedX
    this.changeY = dropY
    this.image = image
    this.maxX = maxX
  }

  /**
   * Kollisionsprüfung mit Bullets (Euclidean Distance wie im Python-Original)
   * Gibt die Anzahl der Treffer zurück
   */
  checkCollision(bullets: Bullet[]): number {
    let hits = 0
    for (const bullet of bullets) {
      const distance = Math.hypot(this.x - bullet.x, this.y - bullet.y)
      if (distance < 35) {
        bullet.isFired = false
        hits++
        // Respawn an zufälliger Position (wie im Original)
        this.x = Math.random() * this.maxX
        this.y = 30 + Math.random() * 100
      }
    }
    return hits
  }

  /**
   * Prüft ob der Enemy die untere Grenze erreicht hat (Game Over)
   */
  hasReachedBottom(limit: number): boolean {
    return this.y > limit
  }

  update(): void {
    this.x += this.changeX

    // Richtungswechsel an den Rändern + nach unten rücken
    if (this.x >= this.maxX) {
      this.y += this.changeY
      this.changeX = -Math.abs(this.changeX)
    } else if (this.x <= 0) {
      this.y += this.changeY
      this.changeX = Math.abs(this.changeX)
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y)
  }

  /**
   * Unsichtbar machen (Game Over - alle Enemies entfernen)
   */
  hide(): void {
    this.y = 1000
  }
}
