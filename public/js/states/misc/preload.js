var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      //Load the Google WebFont Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      //shape elements
      game.load.image("shape_triangle", "assets/shapes/shape-triangle.png");
      game.load.image("shape_square", "assets/shapes/shape-square.png");
      game.load.image("shape_circle", "assets/shapes/shape-circle.png");
      game.load.image("shape_star", "assets/shapes/shape-star.png");

      //level elements

      //ui elements
      game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");

      //audio
      // game.load.audio("track1_base", "assets/audio/track1-base.mp3");
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
