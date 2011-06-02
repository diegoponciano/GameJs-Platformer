var gamejs = require('gamejs');
var input = require('./input');
var sprites = require('./sprites');
require('./patch');

var draw = gamejs.draw;

var SIZE = [320, 240];

var parseLevel = function() {
  var map = "1..................1\n";
  map += "1..................1\n";
  map += "11111..............1\n";
  map += "1..................1\n";
  map += "1..................1\n";
  map += "1......111.........1\n";
  map += "1.....11.....1.....1\n";
  map += "1.....1............1\n";
  map += "1.....1.........1111\n";
  map += "1...111............1\n";
  map += "1.............1....1\n";
  map += "11...........1.....1\n";
  map += "1...........1......1\n";
  map += "1..................1\n";
  map += "11111111111111111111\n";

  //Parse the level
  x = 0;
  y = 0;
  mapArray = map.split('\n');
  mapArray.forEach(function(row) {
    for(i=0; i<row.length; i++){
      char = row.substring(i, i+1);
      // Spawn a platform if the character is a 1
      if(char === "1") {
        new sprites.Platform([x*16, y*16]);
      }
      x += 1;
    }
    x = 0;
    y += 1;
  });
};

function main() {

  // screen setup
  gamejs.display.setCaption("Platformer Demo");
  var screen = gamejs.display.setMode(SIZE);

  var grSprites = new gamejs.sprite.Group();
  var grPlatforms = new gamejs.sprite.Group();

  sprites.Player.prototype.groups = [grSprites];
  sprites.Platform.prototype.groups = [grSprites, grPlatforms];

  sprites.Player.prototype.collision_sprites = grPlatforms;

  this.player = new sprites.Player();

  var controls = new input.UserControls(player);

  parseLevel();

  var tick = function(msDuration) {
    gamejs.event.get().forEach(function(event) {
      controls.handle(event);
    });

    grSprites.update(controls);

    if(controls.jumping) {
      if(!this.player.jumping) {
        this.player.jump_speed = -5.7;
        this.player.jumping = true;
      }
    }

    screen.fill("#000000");
    grSprites.draw(screen);
  };
  gamejs.time.fpsCallback(tick, this, 60);
}

gamejs.ready(main);
