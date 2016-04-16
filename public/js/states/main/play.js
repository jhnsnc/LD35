var playState = function(game) {};

(function() {

  playState.prototype = {
    create: function() {
      console.log("Starting Level Play");

      var i, j, r, x, h;
      var bgGroundHorizon, txtCurrentLevel;
      var bitmapData, grd;

      //misc init
      this.gameEnding = false;
      this.victoryOrDeath = false;
      this.chargeLevel = 0;
      this.enemies = [];6

      txtCurrentLevel = createGameText({
        x: 40,
        y: 60,
        text: 'Level: ' + this.game.level,
        fontSize: 30,
        strokeThickness: 8
      }, this);
      txtCurrentLevel.fontWeight = 300;
      txtCurrentLevel.anchor.setTo(0.0, 0.5);

      txtCurrentLevel = createGameText({
        x: 40,
        y: 100,
        text: '(' + this.game.difficulty + ')',
        fontSize: 24,
        strokeThickness: 8
      }, this);
      txtCurrentLevel.fontWeight = 300;
      txtCurrentLevel.anchor.setTo(0.0, 0.5);

      //fade in cover graphic (white)
      this.introCover = this.game.add.graphics(0, 0);
      this.introCover.beginFill(0xffffff, 1.0);
      this.introCover.drawRect(0, 0, 1080, 600);
      this.introCover.endFill();
      this.introCover.alpha = 1.0;

      //fullscreen toggle
      createFullscreenToggle(this);

      //decode audio -- continue setup after decoded
      // this.setupAudio();
    },
    update: function(evt) {
      var self = this;
    }
  };

  playState.prototype.startBattle = function() {
    console.log("ALL READY -- START BATTLE!");

    var time;

    this.game.add.tween(this.introCover)
      .to({
        alpha: 0.0
      }, 2500, Phaser.Easing.Sinusoidal.InOut, true)
      .onComplete.add(function() {
        this.introCover.parent.removeChild(this.introCover);
      }, this);

    //interactivity
    this.setupKeyboardInput();

    //music
    // this.startAllMusic();

    //timers

    //victory condition timer
    time = LEVEL_DURATION_BASE + (LEVEL_DURATION_GROWTH * this.getEffectiveLevel());
    this.levelCompleteTimer = this.game.time.events.add(time, this.setupVictoryOrDeath, this);
  };

  playState.prototype.beginGameOverSequence = function() {
    // if (!this.gameEnding) {
    //   console.log("the player died - DEFEAT");

    //   var self = this;
    //   var gfxCover;

    //   //flag for input handlers
    //   this.gameEnding = true;

    //   //cancel enemy spawns
    //   this.cancelAllSpawnTimers();
    //   if (this.levelCompleteTimer) {
    //     this.game.time.events.remove(this.levelCompleteTimer);
    //   }

    //   //fade music
    //   this.fadeAllMusic(3500);

    //   //fade in cover graphic (purple)
    //   gfxCover = this.game.add.graphics(0, 0);
    //   gfxCover.beginFill(0x560279, 1.0);
    //   gfxCover.drawRect(0, 0, 1080, 600);
    //   gfxCover.endFill();
    //   gfxCover.alpha = 0.0;
    //   this.game.add.tween(gfxCover)
    //     .to({alpha: 1.0}, 3000, Phaser.Easing.Sinusoidal.Out, true, 1000);

    //   //fade in cover graphic (black)
    //   gfxCover = this.game.add.graphics(0, 0);
    //   gfxCover.beginFill(0x000000, 1.0);
    //   gfxCover.drawRect(0, 0, 1080, 600);
    //   gfxCover.endFill();
    //   gfxCover.alpha = 0.0;
    //   this.game.add.tween(gfxCover)
    //     .to({alpha: 1.0}, 1500, Phaser.Easing.Sinusoidal.Out, true, 2500)
    //     .onComplete.add(function() {
    //       self.game.state.start("Defeat");
    //     }, this);
    // }
  };

  playState.prototype.completeLevel = function() {
    // if (!this.gameEnding) {
    //   console.log("the player survived - VICTORY");

    //   var self = this;
    //   var gfxCover;

    //   //flag for input handlers
    //   this.gameEnding = true;

    //   //cancel enemy spawns
    //   this.cancelAllSpawnTimers();
    //   if (this.levelCompleteTimer) {
    //     this.game.time.events.remove(this.levelCompleteTimer);
    //   }

    //   //fade music
    //   this.fadeAllMusic(3500);

    //   //fade in cover graphic (purple)
    //   gfxCover = this.game.add.graphics(0, 0);
    //   gfxCover.beginFill(0xffffff, 1.0);
    //   gfxCover.drawRect(0, 0, 1080, 600);
    //   gfxCover.endFill();
    //   gfxCover.alpha = 0.0;
    //   this.game.add.tween(gfxCover)
    //     .to({alpha: 1.0}, 3000, Phaser.Easing.Sinusoidal.Out, true, 1000);

    //   //fade in cover graphic (black)
    //   gfxCover = this.game.add.graphics(0, 0);
    //   gfxCover.beginFill(0x000000, 1.0);
    //   gfxCover.drawRect(0, 0, 1080, 600);
    //   gfxCover.endFill();
    //   gfxCover.alpha = 0.0;
    //   this.game.add.tween(gfxCover)
    //     .to({alpha: 1.0}, 1500, Phaser.Easing.Sinusoidal.Out, true, 2500)
    //     .onComplete.add(function() {
    //       self.game.state.start("Victory");
    //     }, this);
    // }
  };

  playState.prototype.getEffectiveLevel = function() {
    switch(this.game.difficulty) {
      case "normal":
        return this.game.level;
        break;
    }
  };

})();
