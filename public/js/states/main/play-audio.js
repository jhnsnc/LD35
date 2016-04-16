playState.prototype.setupAudio = function() {
  // var trackBase = new Phaser.Sound(this.game, 'track1_base');

  // this.tracksObj = {
  //   base: trackBase,
  // }

  // //  Being mp3 files these take time to decode, so we can't play them instantly
  // //  Using setDecodedCallback we can be notified when they're ALL ready for use.
  // //  The audio files could decode in ANY order, we can never be sure which it'll be.

  // this.game.sound.setDecodedCallback([trackBase, trackPluck, trackPulse], this.startLevel, this);
  this.startLevel();
};

playState.prototype.startAllMusic = function() {
};

// playState.prototype.fadeAllMusic = function(fadeOutTime) {
//   if (this.tracksObj.pulse.fadeTween) {
//     this.tracksObj.pulse.fadeTween.stop();
//   }
//   this.tracksObj.pulse.fadeTo(fadeOutTime, 0.0);
//   if (this.tracksObj.pluck.fadeTween) {
//     this.tracksObj.pluck.fadeTween.stop();
//   }
//   this.tracksObj.pluck.fadeTo(fadeOutTime, 0.0);
//   this.tracksObj.base.fadeTo(fadeOutTime, 0.0);
// };
