#= require jquery
#= require_tree .

$ ->
  $('.yakman').each (i) ->
    yakman = Yakman.random()
    $(this).text(yakman.name + yakman.tiles)
