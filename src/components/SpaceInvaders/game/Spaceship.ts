/**
 * Spaceship - Spieler-Raumschiff
 * Entspricht der Spaceship-Klasse aus dem Python-Original
 */
import { Bullet } from './Bullet'

export class Spaceship {
  x: number
  y: number
  changeX: number
  bullets: Bullet[]
  private image: HTMLImageElement
  private bulletImage: HTMLImageElement
  private bulletSpeed: number
  private maxX: number

  constructor(
    x: number,
    y: number,
    image: HTMLImageElement,
    bulletImage: HTMLImageElement,
    bulletSpeed: number,
    maxX: number
  ) {
    this.x = x
    this.y = y
    this.changeX = 0
    this.bullets = []
    this.image = image
    this.bulletImage = bulletImage
    this.bulletSpeed = bulletSpeed
    this.maxX = maxX
  }

  fireBullet(): void {
    const bullet = new Bullet(this.x, this.y, this.bulletSpeed, this.bulletImage)
    bullet.fire()
    this.bullets.push(bullet)
  }

  move(speed: number): void {
    this.changeX += speed
  }

  update(): void {
    this.x += this.changeX

    // Grenzen einhalten
    if (this.x < 0) {
      this.x = 0
    } else if (this.x > this.maxX) {
      this.x = this.maxX
    }

    // Bullets aktualisieren
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i]!
      if (bullet.isFired) {
        bullet.update()
      } else {
        this.bullets.splice(i, 1)
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y)
    for (const bullet of this.bullets) {
      if (bullet.isFired) {
        bullet.draw(ctx)
      }
    }
  }
}
