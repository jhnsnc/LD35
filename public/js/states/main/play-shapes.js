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
  };
  shape.sprite.scale.setTo(SHAPES_SCALE, SHAPES_SCALE);
  shape.sprite.anchor.setTo(0.5, 0.5);

  return shape;
};

playState.prototype.setShapeToPoint = function(shape, r, c) {
  console.log('setting '+shape.type+' to ('+r+', '+c+')');
  var targetPoint = this.grid[r][c];

  shape.row = r;
  shape.col = c;

  shape.sprite.position.setTo(
    targetPoint.position.x + this.gridOffset.x,
    targetPoint.position.y + this.gridOffset.y
  );
};
