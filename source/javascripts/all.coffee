#= require jquery
#= require_tree .

$ ->
  yakman = Yakman.random()
  $('.tile').each (i) ->
    $(this).addClass(yakman.tiles[i])
