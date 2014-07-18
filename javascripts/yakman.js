(function() {
  var Yakman;

  Yakman = (function() {
    var index, tile, _i, _len, _ref;

    function Yakman() {}

    Yakman._tiles = ['man1', 'man2', 'man3', 'man4', 'man5', 'man6', 'man7', 'man8', 'man9', 'pin1', 'pin2', 'pin3', 'pin4', 'pin5', 'pin6', 'pin7', 'pin8', 'pin9', 'soh1', 'soh2', 'soh3', 'soh4', 'soh5', 'soh6', 'soh7', 'soh8', 'soh9', 'ton', 'nan', 'sha', 'pe', 'haku', 'hatsu', 'chun'];

    Yakman._sangenTiles = ['haku', 'hatsu', 'chun'];

    Yakman._kazeTiles = ['ton', 'nan', 'sha', 'pe'];

    Yakman._rohtohTiles = ['man1', 'man9', 'pin1', 'pin9', 'soh1', 'soh9'];

    Yakman._chuchanTiles = ['man2', 'man3', 'man4', 'man5', 'man6', 'man7', 'man8', 'pin2', 'pin3', 'pin4', 'pin5', 'pin6', 'pin7', 'pin8', 'soh2', 'soh3', 'soh4', 'soh5', 'soh6', 'soh7', 'soh8'];

    Yakman._charTiles = Yakman._kazeTiles.concat(Yakman._sangenTiles);

    Yakman._yaochuTiles = Yakman._rohtohTiles.concat(Yakman._charTiles);

    Yakman._numberTiles = Yakman._rohtohTiles.concat(Yakman._chuchanTiles);

    Yakman._greenTiles = ['soh2', 'soh3', 'soh4', 'soh6', 'soh8', 'hatsu'];

    Yakman._yakmanNames = ['大三元', '四暗刻', '國士無双', '字一色', '清老頭', '九蓮宝燈', '緑一色', '大四喜', '小四喜'];

    Yakman._tileOrders = {};

    _ref = Yakman._tiles;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      tile = _ref[index];
      Yakman._tileOrders[tile] = index;
    }

    Yakman.random = function() {
      var elements, jusanmen, name, numbers, suite, tiles;
      name = ArrayUtils.sample(this._yakmanNames);
      tiles = (function() {
        switch (name) {
          case '大三元':
            numbers = [2, 3, 3, 3];
            elements = ArrayUtils.sampleSome(this._tiles, 1, this._sangenTiles).concat(this._sangenTiles);
            tiles = ArrayUtils.zipPopulate(elements, numbers);
            tiles = this._randomShuntsu().concat(tiles);
            return this._sortTiles(tiles);
          case '四暗刻':
            tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(this._tiles, 5), [2, 3, 3, 3, 3]);
            return this._sortTiles(tiles);
          case '國士無双':
            return ArrayUtils.sampleAndDouble(this._yaochuTiles);
          case '字一色':
            tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(this._charTiles, 5), [2, 3, 3, 3, 3]);
            return this._sortTiles(tiles);
          case '清老頭':
            tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(this._rohtohTiles, 5), [2, 3, 3, 3, 3]);
            return this._sortTiles(tiles);
          case '九蓮宝燈':
            suite = ArrayUtils.sample(['man', 'pin', 'soh']);
            numbers = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9];
            jusanmen = $.map(numbers, function(num) {
              return suite + num;
            });
            return ArrayUtils.sampleAndDouble(jusanmen);
          case '緑一色':
            return this._allGreen();
          case '大四喜':
            return this._sushi([3, 3, 3, 3], 2);
          case '小四喜':
            return this._sushi([2, 3, 3, 3], 3);
        }
      }).call(this);
      return {
        name: name,
        tiles: tiles
      };
    };

    Yakman._allGreen = function() {
      var ankoPart, hatsu86, head, numShuntsu, shuntsuPart, tiles, willBeAnko;
      numShuntsu = ArrayUtils.sample([0, 1, 2, 3]);
      shuntsuPart = ArrayUtils.zipPopulate(['soh2', 'soh3', 'soh4'], ArrayUtils.populate(numShuntsu, 3));
      if (numShuntsu === 0) {
        tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(this._greenTiles, 5), [2, 3, 3, 3, 3]);
        return this._sortTiles(tiles);
      }
      hatsu86 = ['hatsu', 'soh8', 'soh6'];
      switch (numShuntsu) {
        case 1:
          head = ArrayUtils.sample(this._greenTiles);
          willBeAnko = ArrayUtils.sampleSome(this._greenTiles, 3, [head]);
          break;
        case 2:
          head = ArrayUtils.sample(this._greenTiles);
          willBeAnko = ArrayUtils.sampleSome(hatsu86, 2, [head]);
          break;
        case 3:
          head = ArrayUtils.sample(hatsu86);
          willBeAnko = ArrayUtils.sampleSome(hatsu86, 1, [head]);
      }
      ankoPart = ArrayUtils.zipPopulate(willBeAnko, [3, 3, 3]);
      return this._sortTiles(ArrayUtils.populate(head, 2).concat(shuntsuPart, ankoPart));
    };

    Yakman._sushi = function(kazeNumbers, notKazeNumber) {
      var kazeTiles, notKazeTiles;
      if (notKazeNumber === 2) {
        notKazeTiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(this._tiles, 1, this._kazeTiles), [notKazeNumber]);
      } else {
        notKazeTiles = this._randomShuntsu();
      }
      kazeTiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(this._kazeTiles, 4), kazeNumbers);
      return this._sortTiles(notKazeTiles.concat(kazeTiles));
    };

    Yakman._randomShuntsu = function() {
      var i, num, suit, _j, _results;
      num = ArrayUtils.sample([1, 2, 3, 4, 5, 6, 7]);
      suit = ArrayUtils.sample(['man', 'pin', 'soh']);
      _results = [];
      for (i = _j = 0; _j <= 2; i = ++_j) {
        _results.push("" + suit + (num + i));
      }
      return _results;
    };

    Yakman._sortTiles = function(tiles) {
      return tiles.sort((function(_this) {
        return function(a, b) {
          return _this._tileOrders[a] - _this._tileOrders[b];
        };
      })(this));
    };

    return Yakman;

  })();

  this.Yakman = Yakman;

}).call(this);
