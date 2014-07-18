(function() {
  var Kanji;

  Kanji = (function() {
    function Kanji() {}

    Kanji._dict = {
      大: 'dai',
      三: 'san',
      元: 'gen',
      四: 'su',
      暗: 'an',
      刻: 'koh',
      國: 'koku',
      士: 'shi',
      無: 'mu',
      双: 'soh',
      字: 'tsu',
      一: 'i',
      色: 'color',
      清: 'chin',
      老: 'roh',
      頭: 'head',
      九: 'chu',
      蓮: 'ren',
      宝: 'poh',
      燈: 'toh',
      緑: 'ryu',
      喜: 'joy',
      小: 'sho',
      槓: 'kan',
      子: 'child'
    };

    Kanji.toId = function(kanji) {
      return this._dict[kanji];
    };

    return Kanji;

  })();

  this.Kanji = Kanji;

}).call(this);
