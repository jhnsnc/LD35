var playState = function(game) {};

(function() {

  playState.prototype = {
    create: function() {
      console.log("Starting Level Play");

      var i, j, randPoint;

      //////////////////////////////
      // grid and shapes basic init
      this.grid = this.setupGrid(18, 10, GRID_WIDTH, GRID_HEIGHT);
      this.shapes = this.generateShapes();
      this.currentShapeIdx = 0;

      var numRows = this.grid.length;
      var numCols = this.grid[0].length;
      for (i = 0; i < this.shapes.length; i += 1) {
        // position shapes around edges
        do {
          randPoint = {};
          if (Math.random() >= 0.5) {
            //random row
            randPoint.r = Math.floor(Math.random() * numRows);
            randPoint.c = (Math.random() >= 0.5) ? 0 : numCols - 1;
          } else {
            //random col
            randPoint.r = (Math.random() >= 0.5) ? 0 : numRows - 1;
            randPoint.c = Math.floor(Math.random() * numCols);
          }
        } while(this.grid[randPoint.r][randPoint.c].isOriginationPoint);
        this.shapes[i].row = randPoint.r;
        this.shapes[i].col = randPoint.c;
        this.grid[randPoint.r][randPoint.c].isOriginationPoint = true;

        // position destinations (a minimum distance from shapes locations)
        do {
          randPoint = {};
          randPoint.r = intBetween(1, numRows - 2);
          randPoint.c = intBetween(1, numCols - 2);
          randPoint.dist = Math.abs(randPoint.r - this.shapes[i].row) + Math.abs(randPoint.c - this.shapes[i].col);
        } while(this.grid[randPoint.r][randPoint.c].isOriginationPoint || randPoint.dist < MIN_DESTINATION_CROW_DISTANCE)
        this.shapes[i].destRow = randPoint.r;
        this.shapes[i].destCol = randPoint.c;
        this.grid[randPoint.r][randPoint.c].isOriginationPoint = true;
      }

      // connect shape points
      for (i = 0; i < this.shapes.length; i += 1) {
        this.linkPointsOnGrid(this.grid, this.shapes[i].row, this.shapes[i].col, this.shapes[i].destRow, this.shapes[i].destCol);
      }

      // add random "highway" paths for alternate routes
      var pointA, pointB, comparison, attempts;
      for (i = 0; i < NUM_HIGHWAY_PATHS; i += 1) {
        console.log('building a highway');
        //get point A
        attempts = 0;
        do {
          attempts += 1;
          pointA = {};
          pointA.r = intBetween(0, numRows - 1);
          pointA.c = intBetween(0, numCols - 1);
          pointA.overlaps = false;
          pointA.minDist = 30;
          for (j = 0; j < this.shapes.length; j += 1) {
            comparison = this.shapes[j];
            pointA.overlaps = pointA.overlaps || this.grid[pointA.r][pointA.c].isOriginationPoint;
            pointA.minDist = Math.min(pointA.minDist, (Math.abs(comparison.row - pointA.r) + Math.abs(comparison.col - pointA.c)));
            pointA.minDist = Math.min(pointA.minDist, (Math.abs(comparison.destRow - pointA.r) + Math.abs(comparison.destCol - pointA.c)));
          }
        } while((pointA.overlaps || pointA.minDist < MIN_HIGHWAY_CROW_DISTANCE) && attempts < MAX_HIGHWAY_ATTEMPTS);
        console.log('got point A in '+attempts+' attemps');
        if (attempts >= MAX_HIGHWAY_ATTEMPTS) {
          continue; //couldn't get pointA. move along
        }
        //get point B
        attempts = 0;
        do {
          attempts += 1;
          pointB = {};
          pointB.r = intBetween(0, numRows - 1);
          pointB.c = intBetween(0, numCols - 1);
          pointB.overlaps = false;
          pointB.minDist = 30;
          for (j = 0; j < this.shapes.length; j += 1) {
            comparison = this.shapes[j];
            pointB.overlaps = pointB.overlaps || this.grid[pointB.r][pointB.c].isOriginationPoint;
            pointB.minDist = Math.min(pointB.minDist, (Math.abs(comparison.row - pointB.r) + Math.abs(comparison.col - pointB.c)));
            pointB.minDist = Math.min(pointB.minDist, (Math.abs(comparison.destRow - pointB.r) + Math.abs(comparison.destCol - pointB.c)));
          }
          pointB.abDist = Math.abs(pointA.r - pointB.r) + Math.abs(pointA.c - pointB.c);
        } while((pointB.overlaps || pointB.minDist < MIN_HIGHWAY_CROW_DISTANCE || pointB.abDist < MIN_HIGHWAY_CROW_LENGTH) && attempts < MAX_HIGHWAY_ATTEMPTS);
        console.log('got point B in '+attempts+' attemps');
        if (attempts >= MAX_HIGHWAY_ATTEMPTS) {
          continue; //couldn't get pointA. move along
        }
        console.log('all good. placing points: ('+pointA.r+','+pointA.c+') and ('+pointB.r+','+pointB.c+')');
        this.linkPointsOnGrid(this.grid, pointA.r, pointA.c, pointB.r, pointB.c);
      }

      // make sure there are no completely empty cells
      var unlinkedNode = this.getUnlinkedNode(this.grid);
      var allowedDirections;
      while (unlinkedNode) {
        console.log('Found unlinked node: ('+unlinkedNode.r+', '+unlinkedNode.c+')');
        //get the next point until we connect to something
        pointB = {
            r: unlinkedNode.r,
            c: unlinkedNode.c,
        };
        do {
          pointA = pointB;

          allowedDirections = ['up', 'right', 'down', 'left'];
          // can't go out of bounds
          if (pointA.r <= 0 && allowedDirections.indexOf('up') !== -1) { allowedDirections.splice(allowedDirections.indexOf('up'),1); }
          if (pointA.r >= numRows - 1 && allowedDirections.indexOf('down') !== -1) { allowedDirections.splice(allowedDirections.indexOf('down'),1); }
          if (pointA.c <= 0 && allowedDirections.indexOf('left') !== -1) { allowedDirections.splice(allowedDirections.indexOf('left'),1); }
          if (pointA.c >= numRows - 1 && allowedDirections.indexOf('right') !== -1) { allowedDirections.splice(allowedDirections.indexOf('right'),1); }
          // can't go back along same path
          if (this.grid[pointA.r][pointA.c]['connects-up'] && allowedDirections.indexOf('up') !== -1) { allowedDirections.splice(allowedDirections.indexOf('up'),1); }
          if (this.grid[pointA.r][pointA.c]['connects-right'] && allowedDirections.indexOf('right') !== -1) { allowedDirections.splice(allowedDirections.indexOf('right'),1); }
          if (this.grid[pointA.r][pointA.c]['connects-down'] && allowedDirections.indexOf('down') !== -1) { allowedDirections.splice(allowedDirections.indexOf('down'),1); }
          if (this.grid[pointA.r][pointA.c]['connects-left'] && allowedDirections.indexOf('left') !== -1) { allowedDirections.splice(allowedDirections.indexOf('left'),1); }

          pointB = { // start w/ previous point
            r: pointA.r,
            c: pointA.c,
          };
          switch (allowedDirections[Math.floor(Math.random() * allowedDirections.length)]) { // move in one random direction
            case 'up':
              pointB.r -= 1;
              break;
            case 'down':
              pointB.r += 1;
              break;
            case 'left':
              pointB.c -= 1;
              break;
            case 'right':
              pointB.c += 1;
              break;
          }

          this.connectAdjacentPoints(this.grid, pointA.r, pointA.c, pointB.r, pointB.c);

          console.log('connecting ('+pointA.r+','+pointA.c+') to ('+pointB.r+','+pointB.c+')');
          console.log(this.grid[pointB.r][pointB.c].connections.length);
          console.log(!(pointA.r === pointB.r && pointA.c === pointB.c));
        } while(this.grid[pointB.r][pointB.c].connections.length < 2 && !(pointA.r === pointB.r && pointA.c === pointB.c));

        unlinkedNode = this.getUnlinkedNode(this.grid);
      }

      // get grid sprite
      this.gridSprite = this.makeSpriteFromGrid(this.grid);
      this.gridSprite.position.setTo(565, 325);
      this.gridOffset = {
        x: this.gridSprite.position.x - (GRID_WIDTH / 2),
        y: this.gridSprite.position.y - (GRID_HEIGHT / 2),
      };

      // shape visual positioning
      for (i = 0; i < this.shapes.length; i += 1) {
        this.setDestinationToPoint(this.shapes[i], this.shapes[i].destRow, this.shapes[i].destCol);
        this.shapes[i].destinationSprite.bringToTop();
      }
      for (i = 0; i < this.shapes.length; i += 1) {
        this.moveShapeToPoint(this.shapes[i], this.shapes[i].row, this.shapes[i].col);
        this.shapes[i].sprite.bringToTop();
      }
      //////////////////////////////

      //////////////////////////////
      // other
      //////////////////////////////
      var txtCurrentLevel;
      var bitmapData, grd;

      // this.gameEnding = false;
      // this.victoryOrDeath = false;

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

      //fade in cover graphic (black)
      this.introCover = this.game.add.graphics(0, 0);
      this.introCover.beginFill(0x000000, 1.0);
      this.introCover.drawRect(0, 0, 1080, 600);
      this.introCover.endFill();
      this.introCover.alpha = 1.0;

      //fullscreen toggle
      createFullscreenToggle(this);

      // decode audio -- continue setup after decoded
      this.setupAudio();
    },
    update: function(evt) {
      var self = this;

      // rotate shapes
      var i;
      for (i = 0; i < this.shapes.length; i += 1) {
        if (!this.shapes[i].isPlaced) {
          this.shapes[i].sprite.rotation = this.shapes[i].sprite.rotation + (1 * DEG_TO_RAD);
        }
      }
    }
  };

  playState.prototype.startLevel = function() {
    console.log("ALL READY -- START LEVEL!");

    var time;

    this.game.add.tween(this.introCover)
      .to({
        alpha: 0.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true)
      .onComplete.add(function() {
        this.introCover.parent.removeChild(this.introCover);
      }, this);

    //interactivity
    this.setupKeyboardInput();

    //music
    this.startAllMusic();

    //timers

    // //victory condition timer
    // time = LEVEL_DURATION_BASE + (LEVEL_DURATION_GROWTH * this.getEffectiveLevel());
    // this.levelCompleteTimer = this.game.time.events.add(time, this.setupVictoryOrDeath, this);
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

  playState.prototype.checkGridDone = function() {
    var isDone = true;
    var i;
    for (i = 0; i < this.shapes; i += 1) {
      isDone = isDone && this.shapes[i].isPlaced;
    }

    if (isDone) {
      console.log('HUZZAH! all shapes have been placed');
      //TODO: get next grid ready and reset shapes/destinations
    }
  }

})();
