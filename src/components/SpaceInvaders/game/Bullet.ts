/**
 * Bullet - Geschoss des Spielers
 * Entspricht der Bullet-Klasse aus dem Python-Original
 */
export class Bullet {
  x: number
  y: number
  isFired: boolean
  private speed: number
  private image: HTMLImageElement

  constructor(x: number, y: number, speed: number, image: HTMLImageElement) {
    this.x = x
    this.y = y
    this.speed = speed
    this.isFired = false
    this.image = image
  }

  fire(): void {
    this.isFired = true
  }

  update(): void {
    this.y -= this.speed
    if (this.y <= 0) {
      this.isFired = false
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y)
  }
}
