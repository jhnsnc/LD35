var titleState = function(game) {};

(function() {
  titleState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing title screen");

      var txtTitle, opacity;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 150,
        text: 'GOOD GAEM',
        fontSize: 120,
        strokeThickness: 0
      }, this);
      txtTitle.fill = '#fff';
      txtTitle.fontWeight = 700;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //start game button
      btnStartGame = createGameText({
        x: 540,
        y: 450,
        text: 'Play!',
        fontSize: 50,
        strokeThickness: 8,
        fill: '#ef0098'
      }, this);
      btnStartGame.anchor.setTo(0.5, 0.5);
      this.displayElements.add(btnStartGame);
      btnStartGame.inputEnabled = true;
      btnStartGame.input.useHandCursor = true;
      btnStartGame.events.onInputDown.add(this.startGame, this);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true);

      //fullscreen toggle
      createFullscreenToggle(this);
    },
    startGame: function(sprite, pointer) {
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 0.0
        }, 500, Phaser.Easing.Sinusoidal.Out, true)
        .onComplete.add(function() {
          this.game.state.start("Intro");
        }, this);
    }
  };
})();
