var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      //Load the Google WebFont Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      //player elements

      //level elements

      //ui elements
      game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");

      //audio
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
