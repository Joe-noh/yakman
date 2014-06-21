class ArrayUtils
  @sample: (array) ->
    array[Math.floor(Math.random() * array.length)]

  @sampleSome: (array, number, excepts=[]) ->
    if number < 1 then return []
    candidates = if excepts.length > 0 then @difference(array, excepts) else array

    pickedUps = []
    for i in [1 .. number]
      picked = @sample(candidates)
      pickedUps.push(picked)
      candidates = @remove(candidates, picked)

    pickedUps

  @remove: (array, element) ->
    $.grep array, (e, i) ->
      e != element

  @populate: (element, number) ->
    (element for i in [1..number])

  @zipPopulate: (elements, numbers) ->
    ret = []
    if elements.length > numbers.length then return ret

    for element, i in elements
      ret = ret.concat(@populate element, numbers[i])
    ret

  @difference: (array1, array2) ->
    $.grep array1, (element, index) ->
      $.inArray(element, array2) == -1

  @sampleAndDouble: (array) ->
    clone  = [].concat(array)  ## clone!
    picked = @sample(clone)
    clone.splice($.inArray(picked, clone), 0, picked)
    clone

@ArrayUtils = ArrayUtils
