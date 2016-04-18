playState.prototype.setupAudio = function() {
  // this.prevSfxType = '';
  // this.prevSfxTime = -SFX_PATTERN_REFRESH_DELAY ;
  // this.currentPattern = [];
  // this.prevNote = -1;

  this.tracks = [
    new Phaser.Sound(this.game, 'track1_1'),
    new Phaser.Sound(this.game, 'track1_2'),
    new Phaser.Sound(this.game, 'track1_3'),
    new Phaser.Sound(this.game, 'track1_4'),
    new Phaser.Sound(this.game, 'track1_5'),
    new Phaser.Sound(this.game, 'track1_6'),
    new Phaser.Sound(this.game, 'track1_7'),
    new Phaser.Sound(this.game, 'track1_8'),
    new Phaser.Sound(this.game, 'track1_9'),
  ];

  // this.shapeSounds = {
  //   star: [
  //     new Phaser.Sound(this.game, 'sfx_star_01'),
  //     new Phaser.Sound(this.game, 'sfx_star_02'),
  //     new Phaser.Sound(this.game, 'sfx_star_03'),
  //     new Phaser.Sound(this.game, 'sfx_star_04'),
  //     new Phaser.Sound(this.game, 'sfx_star_05'),
  //     new Phaser.Sound(this.game, 'sfx_star_06'),
  //     new Phaser.Sound(this.game, 'sfx_star_07'),
  //     new Phaser.Sound(this.game, 'sfx_star_08'),
  //     new Phaser.Sound(this.game, 'sfx_star_09'),
  //     new Phaser.Sound(this.game, 'sfx_star_10'),
  //     new Phaser.Sound(this.game, 'sfx_star_11'),
  //   ]
  // };

  //  Being mp3 files these take time to decode, so we can't play them instantly
  //  Using setDecodedCallback we can be notified when they're ALL ready for use.
  //  The audio files could decode in ANY order, we can never be sure which it'll be.

  this.game.sound.setDecodedCallback(
    this.tracks,
    // this.tracks.concat(this.shapeSounds.star).concat([]),
    this.startLevel, this);
};

playState.prototype.startAllMusic = function() {
  var i;
  for (i = 0; i < this.tracks.length; i += 1) {
    this.tracks[i].play(undefined, 0, MIN_VOLUME, true);
  }

  this.tracks[0].fadeTo(MUSIC_FADE_TIME, VOLUME);
};

playState.prototype.crossFadeMusicTo = function(numTrack) {
  if (numTrack > 0 && numTrack < this.tracks.length) {
    this.tracks[numTrack-1].fadeTo(MUSIC_FADE_TIME, MIN_VOLUME);
    this.tracks[numTrack].fadeTo(MUSIC_FADE_TIME, VOLUME);
  }
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

playState.prototype.playShapeSound = function(shapeType) {
  // var noteIdx;

  // // should we get a new pattern?
  // if (this.currentPattern.length < 1 || this.prevSfxType !== shapeType || this.game.time.now - this.prevSfxTime > SFX_PATTERN_REFRESH_DELAY) {
  //   this.currentPattern = SFX_PATTERNS[Math.floor(Math.random() * SFX_PATTERNS.length)].slice();
  //   this.prevNote = -1;
  // }

  // this.prevSfxType = shapeType;
  // this.prevSfxTime = this.game.time.now;

  // //FOOBAR: type selection
  // noteIdx = this.currentPattern.shift();
  // if (this.prevNote !== noteIdx) {
  //   this.shapeSounds.star[noteIdx].play(undefined, 0, SFX_VOLUME, false);
  //   this.prevNote = noteIdx;
  // }
}
