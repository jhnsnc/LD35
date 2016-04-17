var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      //Load the Google WebFont Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      //shape elements
      game.load.image("shape_triangle", "assets/shapes/shape-triangle.png");
      game.load.image("shape_outline_triangle", "assets/shapes/shape-triangle-outline.png");

      game.load.image("shape_square", "assets/shapes/shape-square.png");
      game.load.image("shape_outline_square", "assets/shapes/shape-square-outline.png");

      game.load.image("shape_circle", "assets/shapes/shape-circle.png");
      game.load.image("shape_outline_circle", "assets/shapes/shape-circle-outline.png");

      game.load.image("shape_star", "assets/shapes/shape-star.png");
      game.load.image("shape_outline_star", "assets/shapes/shape-star-outline.png");

      //ui elements
      game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");

      //audio
      game.load.audio("track1_3", "assets/audio/track1-3.mp3");

      //////////////////////////////
      // show loading indicator
      //////////////////////////////
      var txtTitle;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 300,
        text: 'loading...',
        fontSize: 64,
        strokeThickness: 0
      }, this);
      txtTitle.fill = '#fff';
      txtTitle.fontWeight = 400;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true, 0 /* immediate */, -1 /* infinite */, true /* yoyo */);
    },
    create: function() {
      console.log("Preloading game assets");

      this.game.time.events.add(Phaser.Timer.SECOND, this.launchTitle, this);
    },
    launchTitle: function() {
      this.game.state.start("Title");
    }
  };
})();
