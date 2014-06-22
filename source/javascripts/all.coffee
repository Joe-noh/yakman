#= require jquery
#= require velocity/jquery.velocity.min.js
#= require_tree .

$ ->
  yakman = Yakman.random()
  $('.tile').each (i) ->
    $(this).addClass(yakman.tiles[i])
