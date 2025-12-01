export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'dude')
    this.setScale(1.4)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // this.setBounceY(0.2)
    this.setCollideWorldBounds(true, 1, 0)

    this.initAnimations()
  }

  initAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 7 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
