var introState = function(game) {};

(function() {
  introState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing intro screen");

      //set initial level
      var urlParams;
      var getUrlParams = function() {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);
        var urlParams = {};
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
         return urlParams;
      };
      urlParams = getUrlParams();

      if (urlParams.level && !isNaN(urlParams.level)) {
        this.game.level = parseInt(urlParams.level, 10);
      } else {
        this.game.level = 1;
      }

      var txtTitle, txtParagraph, btnStartGame;
      var text;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //level display
      this.txtCurrentLevel = createGameText({
        x: 40,
        y: 60,
        text: 'Level: ' + this.game.level,
        fontSize: 30,
        strokeThickness: 8
      }, this);
      this.txtCurrentLevel.fontWeight = 300;
      this.txtCurrentLevel.anchor.setTo(0.0, 0.5);
      this.txtCurrentLevel.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 70,
        text: 'How to play',
        fontSize: 60,
        strokeThickness: 8
      }, this);
      txtTitle.fontWeight = 700;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //paragraph intro text
      text = "Words and stuff";
      txtParagraph = createGameText({
        x: 140,
        y: 140,
        text: text,
        fontSize: 30,
        strokeThickness: 5
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = "These things are fun";
      txtParagraph = createGameText({
        x: 140,
        y: 250,
        text: text,
        fontSize: 30,
        strokeThickness: 5
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = "And fun is good";
      txtParagraph = createGameText({
        x: 140,
        y: 315,
        text: text,
        fontSize: 30,
        strokeThickness: 5
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = "Select difficulty:";
      txtParagraph = createGameText({
        x: 140,
        y: 420,
        text: text,
        fontSize: 30,
        strokeThickness: 5,
        fill: '#ef0098'
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = "code by Chris Johnson (@jhnsnc) \nfor Ludum Dare 35";
      txtParagraph = createGameText({
        x: 140,
        y: 500,
        text: text,
        fontSize: 20,
        strokeThickness: 5
      }, this);
      txtParagraph.fontWeight = 300;
      this.displayElements.add(txtParagraph);

      //start game button
      btnStartGame = createGameText({
        x: 500,
        y: 415,
        text: 'Start Gaem',
        fontSize: 40,
        strokeThickness: 0,
        fill: '#ef0098'
      }, this);
      this.displayElements.add(btnStartGame);
      btnStartGame.inputEnabled = true;
      btnStartGame.input.useHandCursor = true;
      btnStartGame.events.onInputDown.add(this.startNormalGame, this);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true);

      //fullscreen toggle
      createFullscreenToggle(this);

      this.listenForPageKeys();
    },
    beginNextBattle: function() {
      console.log("starting level " + this.game.level + " on " + this.game.difficulty + " difficulty");

      this.game.add.tween(this.displayElements)
        .to({
          alpha: 0.0
        }, 500, Phaser.Easing.Sinusoidal.Out, true)
        .onComplete.add(function() {
          this.game.state.start("Play");
        }, this);
    },
    listenForPageKeys: function() {
      pageUp = this.game.input.keyboard.addKey(33);
      pageUp.onUp.add(this.incrementLevel, this);

      pageDown = this.game.input.keyboard.addKey(34);
      pageDown.onUp.add(this.decrementLevel, this);
    },
    incrementLevel: function() {
      this.game.level += 1;
      this.updateLevelDisplay();
    },
    decrementLevel: function() {
      this.game.level -= 1;
      if (this.game.level < 1) {
        this.game.level = 1;
      }
      this.updateLevelDisplay();
    },
    updateLevelDisplay: function() {
      this.txtCurrentLevel.alpha = 1.0;
      this.txtCurrentLevel.text = "Level: "+this.game.level;
    },
    startNormalGame: function() {
      this.game.difficulty = "normal";
      this.beginNextBattle();
    }
  };
})();
