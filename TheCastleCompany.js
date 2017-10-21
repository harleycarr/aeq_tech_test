function placeCastles(geography){
  var houses = 0;
  var direction = 0;
  var init = true;

  function checkDirection(index){
    var changeDirection = false;
    // place initial house
    if(init){
      init = false;
      return true;
    }

    // check direction
    if(geography[index] > geography[index-1] && direction <= 0){
      direction = 1;
    } else if(geography[index] < geography[index-1] && direction >= 0) {
      direction = -1;
    }

    // place final house
    if(typeof geography[index+1] == 'undefined' && (direction !== 0)){
      return true;
    }

    // check for directionChange
    if(geography[index] < geography[index+1] && direction < 0){
      changeDirection = true
    } else if(descending = geography[index] > geography[index+1] && direction > 0){
      changeDirection = true
    }

    return changeDirection;
  }

  geography.forEach(function(item, index){
    var changeDirection = checkDirection(index);
    if(changeDirection){
      houses++
    }
  });
}