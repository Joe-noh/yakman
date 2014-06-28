#= require jquery
#= require velocity/jquery.velocity.min.js
#= require_tree .

$ ->
  yakman = Yakman.random()

  $('.tile').each (i) ->
    $(this).addClass(yakman.tiles[i])

  for i in [0..yakman.name.length]
    char = $('<div></div>').text(yakman.name[i])
    $('#name-chars').append char

  do dropStick = ->
    new Stick
    setTimeout dropStick, 300
