import Phaser from 'phaser';

export default class ChooseGame extends Phaser.Scene {
  constructor() {
    super({ key: 'ChooseGame' });
  }

  preload() {
    this.load.image('Pong', 'assets/Pong/Title.jpg');
    this.load.image('HeadSoccer', 'assets/HeadSoccer/Title.jpg');
    this.load.image('HangMan', 'assets/HangMan/Title.jpg');
  }

  create() {
    var btnPong = this.add.sprite(400, 100, 'Pong');
    btnPong.setInteractive();
    btnPong.on(
      'pointerdown',
      function(event) {
        this.scene.start('Pong');
      },
      this
    );
    var btnHead = this.add.sprite(400, 150, 'HeadSoccer');
    btnHead.setInteractive();
    btnHead.on(
      'pointerdown',
      function(event) {
        this.scene.start('HeadSoccer');
      },
      this
    );
    var btnHang = this.add.sprite(400, 200, 'HangMan');
    btnHang.setInteractive();
    btnHang.on(
      'pointerdown',
      function(event) {
        this.scene.start('HangMan');
      },
      this
    );
  }

  update() {}

  rightController() {
    //Controller Right
    if (this.cursor.down.isDown) {
      this.playerRight.body.setVelocityY(300);
    } else if (this.cursor.up.isDown && this.playerRight.body.y > 200) {
      this.playerRight.body.setAccelerationY(5000);
      this.playerRight.body.setVelocityY(-300);
    } else if (this.cursor.left.isDown) {
      this.playerRight.body.setVelocityX(-300);
    } else if (this.cursor.right.isDown) {
      this.playerRight.body.setVelocityX(300);
    } else {
      this.playerRight.body.setVelocityY(0);
      this.playerRight.body.setVelocityX(0);
    }
  }
}
