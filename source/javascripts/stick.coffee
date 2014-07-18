class Stick
  @_id: 0

  constructor: ->
    @id = Stick._id
    Stick._id += 1

    left = Math.floor(Math.random() * 80) + 5
    @stick = $('<div></div>').attr('class', 'stick')
                             .attr('id', "stick#{@id}")
                             .css('top', '0%')
                             .css('left', "#{left}%")
    $('#sticks').append(@stick)
    @stick.velocity({top: '80%'}, 6000, "ease-in", => @stick.remove())

@Stick = Stick
