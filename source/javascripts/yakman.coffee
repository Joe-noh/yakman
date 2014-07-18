class Yakman
  @_tiles = ['man1', 'man2', 'man3', 'man4', 'man5', 'man6', 'man7', 'man8', 'man9',
             'pin1', 'pin2', 'pin3', 'pin4', 'pin5', 'pin6', 'pin7', 'pin8', 'pin9',
             'soh1', 'soh2', 'soh3', 'soh4', 'soh5', 'soh6', 'soh7', 'soh8', 'soh9',
             'ton',  'nan',  'sha',  'pe',   'haku', 'hatsu', 'chun']

  @_sangenTiles  = ['haku', 'hatsu', 'chun']
  @_kazeTiles    = ['ton', 'nan', 'sha', 'pe']
  @_rohtohTiles  = ['man1', 'man9', 'pin1', 'pin9', 'soh1', 'soh9']
  @_chuchanTiles = ['man2', 'man3', 'man4', 'man5', 'man6', 'man7', 'man8',
                    'pin2', 'pin3', 'pin4', 'pin5', 'pin6', 'pin7', 'pin8',
                    'soh2', 'soh3', 'soh4', 'soh5', 'soh6', 'soh7', 'soh8']
  @_charTiles    = @_kazeTiles.concat @_sangenTiles
  @_yaochuTiles  = @_rohtohTiles.concat @_charTiles
  @_numberTiles  = @_rohtohTiles.concat @_chuchanTiles
  @_greenTiles   = ['soh2', 'soh3', 'soh4', 'soh6', 'soh8', 'hatsu']

  @_yakmanNames = ['大三元', '四暗刻', '國士無双', '字一色', '清老頭',
                   '九蓮宝燈', '緑一色', '大四喜', '小四喜']

  @_tileOrders = {}
  @_tileOrders[tile] = index for tile, index in @_tiles

  @random: ->
    name = ArrayUtils.sample(@_yakmanNames)

    tiles = switch name
      when '大三元'
        numbers  = [2, 3, 3, 3]
        elements = ArrayUtils.sampleSome(@_tiles, 1, @_sangenTiles).concat(@_sangenTiles)
        tiles = ArrayUtils.zipPopulate(elements, numbers)
        tiles = @_randomShuntsu().concat(tiles)
        @_sortTiles tiles
      when '四暗刻'
        tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(@_tiles, 5), [2, 3, 3, 3, 3])
        @_sortTiles tiles
      when '國士無双'
        ArrayUtils.sampleAndDouble(@_yaochuTiles)
      when '字一色'
        tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(@_charTiles, 5), [2, 3, 3, 3, 3])
        @_sortTiles tiles
      when '清老頭'
        tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(@_rohtohTiles, 5), [2, 3, 3, 3, 3])
        @_sortTiles tiles
      when '九蓮宝燈'
        suite   = ArrayUtils.sample ['man', 'pin', 'soh']
        numbers = [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9]
        jusanmen = $.map numbers, (num) -> suite + num
        ArrayUtils.sampleAndDouble(jusanmen)
      when '緑一色'
        @_allGreen()
      when '大四喜'
        @_sushi([3, 3, 3, 3], 2)
      when '小四喜'
        @_sushi([2, 3, 3, 3], 3)

    {name: name, tiles: tiles}


  @_allGreen: ->
    numShuntsu = ArrayUtils.sample [0, 1, 2, 3]
    shuntsuPart = ArrayUtils.zipPopulate(['soh2', 'soh3', 'soh4'], ArrayUtils.populate(numShuntsu, 3))

    if numShuntsu == 0
      tiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(@_greenTiles, 5), [2, 3, 3, 3, 3])
      return @_sortTiles(tiles)

    hatsu86 = ['hatsu', 'soh8', 'soh6']
    switch numShuntsu
      when 1
        head = ArrayUtils.sample(@_greenTiles)
        willBeAnko = ArrayUtils.sampleSome(@_greenTiles, 3, [head])
      when 2
        head = ArrayUtils.sample(@_greenTiles)
        willBeAnko = ArrayUtils.sampleSome(hatsu86, 2, [head])
      when 3
        head = ArrayUtils.sample hatsu86
        willBeAnko = ArrayUtils.sampleSome(hatsu86, 1, [head])

    ankoPart = ArrayUtils.zipPopulate(willBeAnko, [3, 3, 3])
    @_sortTiles ArrayUtils.populate(head, 2).concat(shuntsuPart, ankoPart)

  @_sushi: (kazeNumbers, notKazeNumber) ->
    if notKazeNumber == 2
      notKazeTiles = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(@_tiles, 1, @_kazeTiles), [notKazeNumber])
    else
      notKazeTiles = @_randomShuntsu()
    kazeTiles    = ArrayUtils.zipPopulate(ArrayUtils.sampleSome(@_kazeTiles, 4), kazeNumbers)
    @_sortTiles notKazeTiles.concat(kazeTiles)

  @_randomShuntsu: ->
    num  = ArrayUtils.sample([1, 2, 3, 4, 5, 6 ,7])
    suit = ArrayUtils.sample(['man', 'pin', 'soh'])
    ("#{suit}#{num+i}" for i in [0..2])

  @_sortTiles: (tiles) ->
    tiles.sort (a, b) =>
      @_tileOrders[a] - @_tileOrders[b]

@Yakman = Yakman
