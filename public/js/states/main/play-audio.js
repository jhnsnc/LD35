playState.prototype.setupAudio = function() {
  this.tracks = [
    new Phaser.Sound(this.game, 'track1_3'),
  ];

  //  Being mp3 files these take time to decode, so we can't play them instantly
  //  Using setDecodedCallback we can be notified when they're ALL ready for use.
  //  The audio files could decode in ANY order, we can never be sure which it'll be.

  this.game.sound.setDecodedCallback(this.tracks, this.startLevel, this);
  // this.startLevel();
};

playState.prototype.startAllMusic = function() {
  var i;
  for (i = 0; i < this.tracks.length; i += 1) {
    this.tracks[i].play(undefined, 0, MIN_VOLUME, true);
  }

  this.tracks[0].fadeTo(MUSIC_FADE_TIME, VOLUME);
};

playState.prototype.fadeAllMusic = function(fadeOutTime) {
  var i;
  for (i = 0; i < this.tracks.length; i += 1) {
    if (this.tracks[i].fadeTween) {
      this.tracks[i].fadeTween.stop();
    }
    this.tracks[i].fadeTo(fadeOutTime, 0.0);
  }
};
