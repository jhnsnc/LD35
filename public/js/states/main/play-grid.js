playState.prototype.setupGrid = function(numCols, numRows, width, height) {
  var grid, row, cell;
  var cellWidth, cellHeight;
  var r, c;

  cellWidth = width / numCols;
  cellHeight = height / numRows;

  grid = [];
  for (r = 0; r < numRows; r += 1) {
    row = [];
    for (c = 0; c < numCols; c += 1) {
      point = {
        'connects-up': false,
        'connects-right': false,
        'connects-down': false,
        'connects-left': false,
        connections: [],
        position: {
          x: c * cellWidth,
          y: r * cellHeight,
        },
        row: r,
        col: c,
      };
      row.push(point);
    }
    grid.push(row);
  }

  return grid;
};

playState.prototype.makeSpriteFromGrid = function(grid) {
  var r, c, numRows, numCols, hasConnections, gridPoint;

  var colorEnabled = 0xdddddd;
  var colorDisabled = 0x454545;
  var alphaEnabled = 1.0;
  var alphaDisabled = 0.1;
  var lineWidth = 3.0;
  var gfx = new Phaser.Graphics(this.game, 0, 0);

  numRows = grid.length;
  numCols = grid[0].length;
  for (r = 0; r < numRows; r += 1) {
    for (c = 0; c < numCols; c += 1) {
      gridPoint = grid[r][c];
      hasConnections = false;
      //up
      if (r > 0) {
        if (grid[r][c]['connects-up']) {
          gfx.lineStyle(lineWidth, colorEnabled, alphaEnabled);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, colorDisabled, alphaDisabled);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r-1][c].position.x, grid[r-1][c].position.y);
      }
      //right
      if (c < numCols - 1) {
        if (grid[r][c]['connects-right']) {
          gfx.lineStyle(lineWidth, colorEnabled, alphaEnabled);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, colorDisabled, alphaDisabled);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r][c+1].position.x, grid[r][c+1].position.y);
      }
      //down
      if (r < numRows - 1) {
        if (grid[r][c]['connects-down']) {
          gfx.lineStyle(lineWidth, colorEnabled, alphaEnabled);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, colorDisabled, alphaDisabled);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r+1][c].position.x, grid[r+1][c].position.y);
      }
      //left
      if (c > 0) {
        if (grid[r][c]['connects-left']) {
          gfx.lineStyle(lineWidth, colorEnabled, alphaEnabled);
          hasConnections = true;
        } else {
          gfx.lineStyle(lineWidth, colorDisabled, alphaDisabled);
        }
        gfx.moveTo(gridPoint.position.x, gridPoint.position.y);
        gfx.lineTo(grid[r][c-1].position.x, grid[r][c-1].position.y);
      }
      //dot in the middle
      if (hasConnections) {
        gfx.lineStyle(lineWidth, colorEnabled, alphaEnabled);
        gfx.drawCircle(gridPoint.position.x, gridPoint.position.y, 1.0);
      }
    }
  }
  // create sprite
  sprite = this.game.add.sprite(0, 0);
  gfx.position.setTo(-GRID_WIDTH / 2, -GRID_HEIGHT / 2);
  sprite.addChild(gfx);
  sprite.alpha = 1.0;

  return sprite;
};

playState.prototype.addGridConnection = function(grid, row, col, direction) {
  switch (direction) {
    case 'up':
      if (row > 0) {
        grid[row][col]['connects-up'] = true;
        grid[row][col].connections.push({ row: row-1, col: col });
        grid[row-1][col]['connects-down'] = true;
        grid[row-1][col].connections.push({ row: row, col: col });
      }
      break;
    case 'right':
      if (col < grid[0].length - 1) {
        grid[row][col]['connects-right'] = true;
        grid[row][col].connections.push({ row: row, col: col+1 });
        grid[row][col+1]['connects-left'] = true;
        grid[row][col+1].connections.push({ row: row, col: col });
      }
      break;
    case 'down':
      if (row < grid.length - 1) {
        grid[row][col]['connects-down'] = true;
        grid[row][col].connections.push({ row: row+1, col: col });
        grid[row+1][col]['connects-up'] = true;
        grid[row+1][col].connections.push({ row: row, col: col });
      }
      break;
    case 'left':
      if (col > 0) {
        grid[row][col]['connects-left'] = true;
        grid[row][col].connections.push({ row: row, col: col-1 });
        grid[row][col-1]['connects-right'] = true;
        grid[row][col-1].connections.push({ row: row, col: col });
      }
      break;
  }
};
