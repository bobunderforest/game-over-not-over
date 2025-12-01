import { Scene } from 'phaser'
import { Player } from '../gameObjects/Player'
import { GAME_OVER_ARRAYS } from '../gameObjects/GameOver'

const GAME_W = 860
const GAME_H = 500

const platformHeight = 6
const platformLength = 12
const blockSize = 16
const halfBlockSize = blockSize / 2
const yStart = GAME_H - blockSize * platformHeight + halfBlockSize
const pitEndStart = GAME_W - platformLength * blockSize + halfBlockSize

export class Game extends Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup
  gameOver: Phaser.Physics.Arcade.StaticGroup
  player: Player
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  isCleared: boolean = false
  isJumped: boolean = false

  constructor() {
    super('Game')
  }

  create() {
    this.add.image(0, 0, 'sky').setScale(2.5)
    this.platforms = this.physics.add.staticGroup()
    this.physics.world.setBounds(0, 0, GAME_W, GAME_H + 100)

    // Platforms
    for (let iy = 0; iy < platformHeight; iy++) {
      const y = yStart + iy * blockSize
      for (let i = 0; i < platformLength; i++) {
        this.platforms.create(halfBlockSize + blockSize * i, y, 'block')
      }
      for (let i = 0; i < platformLength; i++) {
        this.platforms.create(pitEndStart + blockSize * i, y, 'block')
      }
    }

    // Game Over
    this.gameOver = this.physics.add.staticGroup()
    const offsetX =
      halfBlockSize + GAME_W / 2 - (GAME_OVER_ARRAYS[1].length * blockSize) / 2
    const offsetY = -GAME_OVER_ARRAYS.length * blockSize

    GAME_OVER_ARRAYS.forEach((line, iy) => {
      line.forEach((symbol, ix) => {
        if (!symbol) return
        const x = ix * blockSize + offsetX
        const y = iy * blockSize + offsetY
        this.gameOver.create(x, y, 'bricks')
      })
    })

    // Player
    this.player = new Player(this, 32, yStart - 32)
    ;(this.player.body as Phaser.Physics.Arcade.Body).setGravityY(800)

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.player, this.gameOver)
    this.cursors = this.input.keyboard!?.createCursorKeys()
  }

  update(): void {
    const cursors = this.cursors
    const player = this.player

    // End game
    if (player.x > GAME_W - 100) {
      if (!this.isCleared) {
        player.setVelocityX(0)
        player.anims.play('turn')
        this.sound.play('clear')
        this.isCleared = true
      }
      if (player.body!.touching.down) {
        player.setVelocityY(-330)
        this.gameOver.incY(4)
      }
      return
    }

    // Player back from the pit
    if (player.body!.y > GAME_H) {
      player.setVelocity(0)
      player.body!.x = 32
      player.body!.y = yStart - 64

      this.gameOver.incY(64)
      this.gameOver.refresh()
      this.sound.play('bdsh')
    }

    // Player controls
    if (cursors.left.isDown) {
      player.setVelocityX(-160)
      player.anims.play('left', true)
    } else if (cursors.right.isDown) {
      player.setVelocityX(160)
      player.anims.play('right', true)
      console.log(player.body!.velocity)
    } else {
      player.setVelocityX(0)
      player.anims.play('turn')
    }

    if (this.isJumped && player.body!.velocity.y <= 0) {
      this.isJumped = false
    }

    // Jump
    if (
      cursors.space.isDown &&
      player.body!.touching.down &&
      player.body!.velocity.y === 0
    ) {
      player.setVelocityY(-330)
      this.sound.play('jump')
      this.isJumped = true
    }
  }
}
