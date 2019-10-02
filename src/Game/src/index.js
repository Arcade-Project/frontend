import React, { PureComponent } from 'react'

import Pong from './scenes/Pong'
import HeadSoccer from './scenes/HeadSoccer'
import HangMan from './scenes/HangMan'
import ChooseGame from './scenes/ChooseGame'

import Phaser from 'phaser'

export default class Game extends PureComponent {
    componentDidMount() {

        const config = {
            width: 800,
            height: 300,
            parent: "phaser-container",
            physics: {
                default: "arcade",
                arcade: {debug: false}
            },
            scene: [
              ChooseGame,Pong,HeadSoccer,HangMan
            ]
        }
        this.game = new Phaser.Game(config);
    }
    
    create(){

    }

    update(){

    }
    

  render() {
    return (
      <div className="game-background" style={{width: '100%', height: '100%', backgroundColor: 'black',  textAlign: 'center'}}>
      <div className="phaserContainer" id="phaser-container" style={{position: 'absolute', transform: 'translate(-50%, -50%)',top: '50%', left: '50%'}}>
      </div>
			</div>
    )
  }

  componentWillUnmount(){
    this.game.destroy(true,false); //el primero elimina el canvas, el 2do lo descarga en memoria
    }
}
