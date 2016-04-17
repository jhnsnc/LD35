playState.prototype.generateShapes = function() {
  var shapes = [];

  shapes.push(this.generateShape('triangle'));
  shapes.push(this.generateShape('square'));
  shapes.push(this.generateShape('circle'));
  shapes.push(this.generateShape('star'));

  return shapes;
};

playState.prototype.generateShape = function(shapeType) {
  var shape = {
    type: shapeType,
    sprite: this.game.add.sprite(0, 0, 'shape_'+shapeType),
    row: 0,
    col: 0,
    destinationSprite: this.game.add.sprite(0, 0, 'shape_outline_'+shapeType),
    destRow: 0,
    destCol: 0,
    isPlaced: false,
  };
  shape.sprite.scale.setTo(SHAPES_SCALE, SHAPES_SCALE);
  shape.sprite.anchor.setTo(0.5, 0.5);
  shape.destinationSprite.scale.setTo(SHAPES_SCALE, SHAPES_SCALE);
  shape.destinationSprite.anchor.setTo(0.5, 0.5);

  return shape;
};

playState.prototype.moveShapeToPoint = function(grid, shape, r, c) {
  console.log('setting '+shape.type+' to ('+r+', '+c+')');
  var targetPoint = grid[r][c];

  shape.row = r;
  shape.col = c;

  shape.sprite.position.setTo(
    targetPoint.position.x + this.gridOffset.x,
    targetPoint.position.y + this.gridOffset.y
  );

  if (shape.row === shape.destRow && shape.col === shape.destCol) {
    console.log('YAY! '+shape.type+' found its destination!');
    shape.isPlaced = true;
    shape.sprite.rotation = 0;
    this.cycleCurrentShape();
    // check if all shapes are done
    this.checkGridDone();
  }
};

playState.prototype.setDestinationToPoint = function(grid, shape, r, c) {
  var targetPoint = grid[r][c];

  shape.destRow = r;
  shape.destCol = c;

  shape.destinationSprite.position.setTo(
    targetPoint.position.x + this.gridOffset.x,
    targetPoint.position.y + this.gridOffset.y
  );
};
