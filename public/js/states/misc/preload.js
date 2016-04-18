var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      // Load the Google WebFont Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

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
      //////////////////////////////
      //////////////////////////////

      // shape elements
      game.load.image("shape_triangle", "assets/shapes/shape-triangle.png");
      game.load.image("shape_outline_triangle", "assets/shapes/shape-triangle-outline.png");

      game.load.image("shape_square", "assets/shapes/shape-square.png");
      game.load.image("shape_outline_square", "assets/shapes/shape-square-outline.png");

      game.load.image("shape_circle", "assets/shapes/shape-circle.png");
      game.load.image("shape_outline_circle", "assets/shapes/shape-circle-outline.png");

      game.load.image("shape_star", "assets/shapes/shape-star.png");
      game.load.image("shape_outline_star", "assets/shapes/shape-star-outline.png");

      // ui elements
      game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");

      // music
      game.load.audio("track1_1", "assets/audio/music/track1-1.mp3");
      game.load.audio("track1_2", "assets/audio/music/track1-2.mp3");
      game.load.audio("track1_3", "assets/audio/music/track1-3.mp3");
      game.load.audio("track1_4", "assets/audio/music/track1-4.mp3");
      game.load.audio("track1_5", "assets/audio/music/track1-5.mp3");
      game.load.audio("track1_6", "assets/audio/music/track1-6.mp3");
      game.load.audio("track1_7", "assets/audio/music/track1-7.mp3");
      game.load.audio("track1_8", "assets/audio/music/track1-8.mp3");
      game.load.audio("track1_9", "assets/audio/music/track1-9.mp3");

      // // sfx
      // game.load.audio("sfx_star_01", "assets/audio/sfx/star-component-01-G5.mp3");
      // game.load.audio("sfx_star_02", "assets/audio/sfx/star-component-02-Ab5.mp3");
      // game.load.audio("sfx_star_03", "assets/audio/sfx/star-component-03-Bb5.mp3");
      // game.load.audio("sfx_star_04", "assets/audio/sfx/star-component-04-C6.mp3");
      // game.load.audio("sfx_star_05", "assets/audio/sfx/star-component-05-D6.mp3");
      // game.load.audio("sfx_star_06", "assets/audio/sfx/star-component-06-Eb6.mp3");
      // game.load.audio("sfx_star_07", "assets/audio/sfx/star-component-07-F6.mp3");
      // game.load.audio("sfx_star_08", "assets/audio/sfx/star-component-08-G6.mp3");
      // game.load.audio("sfx_star_09", "assets/audio/sfx/star-component-09-Ab6.mp3");
      // game.load.audio("sfx_star_10", "assets/audio/sfx/star-component-10-Bb6.mp3");
      // game.load.audio("sfx_star_11", "assets/audio/sfx/star-component-11-C7.mp3");
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
