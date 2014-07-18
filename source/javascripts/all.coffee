#= require jquery
#= require velocity/jquery.velocity.min.js
#= require_tree .

$ ->
  $('#start-button').click ->
    $('#start-button').hide()
    $('#curtain').velocity({height: '0'}, 1500, "ease-in", => $('#curtain').remove())

  yakman = Yakman.random()

  $('.tile').each (i) ->
    $(@).addClass(yakman.tiles[i])

  for i in [0 ... yakman.name.length]
    kanjiId = Kanji.toId(yakman.name[i])
    svg = $('#kanji_'+kanjiId).html()

    char = $('<div></div>').addClass('char')
                           .addClass(kanjiId)
                           .html(svg)
    $('#name-chars').append(char)

  $(window).resize -> onResize()

  do onResize = ->
    scale = $(document).width() / 200.0
    $('.char svg').css('transform', 'scale('+scale+')')

    chars = $('.char')
    switch yakman.name.length
      when 3
        chars.eq(0).css('left',  '20%')
        chars.eq(1).css('left',  '48%')
        chars.eq(2).css('right', '20%')
      when 4
        chars.eq(0).css('left',  '15%')
        chars.eq(1).css('left',  '36%')
        chars.eq(2).css('right', '36%')
        chars.eq(3).css('right', '15%')

  do dropStick = ->
    new Stick
    setTimeout dropStick, 300
