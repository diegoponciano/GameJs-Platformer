(function(require, module) { require.define({
  './input': function(require, exports, module) {
    var gamejs = require('gamejs');

    /*
       A class to allow the player to control teh playerz.
       */
    var UserControls = function(player) {
      this.player = player;
      this.left = false;
      this.right = false;
      this.jumping = false;

      /*
         Handle events from the main loop to e.g. store which keys are currently
         being pressed by the player.
         */
      this.handle = function(event) {
        if (event.type === gamejs.event.KEY_DOWN) {
          if (event.key === gamejs.event.K_LEFT) {
            this.left = true;
          } 
          else if (event.key === gamejs.event.K_RIGHT) {
            this.right = true;
          } 
          else if (event.key === gamejs.event.K_z) {
            this.jumping = true;
          } 
          else {
            console.debug(event.key);
          }
        } 
        else if (event.type === gamejs.event.KEY_UP) {
          if (event.key === gamejs.event.K_LEFT) {
            this.left = false;
          } 
          else if (event.key === gamejs.event.K_RIGHT) {
            this.right = false;
          }
          else if (event.key === gamejs.event.K_z) {
            this.jumping = false;
          } 
        } 
      }

      return this;
    }

    exports.UserControls = UserControls;

  },
  });
})(modulr.require, modulr.require.main);
