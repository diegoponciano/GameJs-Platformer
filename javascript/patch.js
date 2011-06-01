(function(require, module) { require.define({
  './patch': function(require, exports, module) {

    var gamejs = require('gamejs');

    gamejs.Surface.prototype.get_rect = function(coord) {
      coord = coord || '';
      if (coord.topleft != undefined) {
        coord.left = coord.topleft[0];
        coord.top = coord.topleft[1];
      }
      coord.left = coord.left || 0;
      coord.top = coord.top || 0;
      return new gamejs.Rect(coord.left, coord.top, this.getSize()[0], this.getSize()[1]);
    };

    gamejs.Rect.prototype.collideRect = function(rect) {
      return ((((this.left >= rect.left) && (this.left < rect.left + rect.width))  ||
          ((rect.left >= this.left) && (rect.left < this.left + this.width))) &&
        (((this.top >= rect.top) && (this.top < rect.top + rect.height)) ||
         ((rect.top >= this.top) && (rect.top < this.top + this.height))));
    };

  },
});
})(modulr.require, modulr.require.main);
