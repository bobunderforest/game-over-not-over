import { Scene } from 'phaser'

export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff)
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff)
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    this.load.setPath('assets')

    this.load.image('sky', 'sky.png')
    this.load.image('block', 'block.png')
    this.load.image('bricks', 'bricks.png')
    this.load.spritesheet('dude', 'mario.png', {
      frameWidth: 18,
      frameHeight: 32,
      spacing: 1,
    })

    this.load.audio('jump', 'jump.wav')
    this.load.audio('bdsh', 'bdsh.wav')
    this.load.audio('clear', 'clear.wav')
  }

  create() {
    this.scene.start('Game')
  }
}
