var gamejs = require('gamejs');

var Player = function() {
  this._groups = [];
  this.groups.forEach(function(group) {
    this.add(group);
  }, this);

  this.image = new gamejs.Surface([16, 16]);
  this.image.fill("#FFFF00");
  this.rect = this.image.get_rect({topleft: [64, 0]});
  this.jump_speed = 0;
  this.jumping = false;

  this.update = function(controls) {

    // Move left/right
    dir = 0;
    if(controls.left) {
      dir = -1;
    }
    if(controls.right) {
      dir = 1;
    }

    //Increase the jump speed so you fall
    if(this.jump_speed < 5) {
      this.jump_speed += 0.3;
    }

    //We fell off a platform!
    if(this.jump_speed > 2) {
      this.jumping = true;
    }

    this.move(2*dir, this.jump_speed);
  };

  this.__move = function(dx, dy) {

    // Create a temporary new rect that has been moved to dx and dy
    newRect = new gamejs.Rect(this.rect);
    //newRect = this.rect.clone();
    newRect.left += dx;
    newRect.top += dy;
    skipMove = false;

    // loop through all the sprites we're supposed to collide with
    // (collision_sprites is defined in the main() function below)
    this.collision_sprites.forEach(function(sprite) {
      // If there's a collision between the new rect (the one that's
      // been moved) and the sprite's rect then we check
      // for what direction the sprite is moving, and then we
      // clamp the "real" rect to that side
      if (newRect.collideRect(sprite.rect)) {
        // Check the X axis
        if (dx > 0) {         // moving right
          this.rect.right = sprite.rect.left;
        }
        else if (dx < 0) {    // moving left
          this.rect.left = sprite.rect.right;
        }

    // Check the Y axis
    if (dy > 0) {           // moving down
      this.rect.bottom = sprite.rect.top;

      // Landed!
      this.jump_speed = 0;
      this.jumping = false;
    }
    else if (dy < 0) {      // moving up
      this.rect.top = sprite.rect.bottom;
      this.jump_speed = 0;  // oww, we hit our head
    }
    // skips the move
    skipMove = true;
      }
    }, this);

    // If there's no collision, move the rect!
    if(!skipMove) {
      this.rect = new gamejs.Rect(newRect);
    }
  };

  // Calls __move for the X and Y axises
  this.move = function(dx, dy) {
    if (dx !== 0) {
      this.__move(dx, 0);
    }
    if (dy !== 0) {
      this.__move(0, dy);
    }
  };

  return this;
};
gamejs.utils.objects.extend(Player, gamejs.sprite.Sprite);
exports.Player = Player;

// Class for the white platforms
var Platform = function (pos) {
  this._groups = [];
  this.groups.forEach(function(group) {
    this.add(group);
  }, this);

  this.image = new gamejs.Surface([16, 16]);
  this.image.fill("#FFFFFF");
  this.rect = this.image.get_rect({topleft : pos});

  return this;
};
gamejs.utils.objects.extend(Platform, gamejs.sprite.Sprite);
exports.Platform = Platform;
