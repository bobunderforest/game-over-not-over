import { Boot } from './scenes/Boot'
import { Game as MainGame } from './scenes/Game'
import { AUTO, Game } from 'phaser'
import { Preloader } from './scenes/Preloader'

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 860,
  height: 500,
  pixelArt: true,
  parent: 'game-container',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
  },
  backgroundColor: '#58bbdc',
  scene: [Boot, Preloader, MainGame],
}

const StartGame = (parent: string) => {
  return new Game({ ...config, parent })
}

export default StartGame
