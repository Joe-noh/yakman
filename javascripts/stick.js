(function() {
  var Stick;

  Stick = (function() {
    var _types;

    Stick._id = 0;

    _types = ['stick100', 'stick1000', 'stick5000', 'stick10000'];

    function Stick() {
      var left;
      this.id = Stick._id;
      Stick._id += 1;
      left = Math.floor(Math.random() * 80) + 5;
      this.stick = $('<div></div>').attr('class', "stick " + (this._randomType())).attr('id', "stick" + this.id).css('top', '0%').css('left', "" + left + "%");
      $('#sticks').append(this.stick);
      this.stick.velocity({
        top: '80%'
      }, 6000, "ease-in", (function(_this) {
        return function() {
          return _this.stick.remove();
        };
      })(this));
    }

    Stick.prototype._randomType = function() {
      return ArrayUtils.sample(_types);
    };

    return Stick;

  })();

  this.Stick = Stick;

}).call(this);
