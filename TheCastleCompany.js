var geography = [1,1,2,3,3,4,3,2,2,1,1,2,1,4];

function placeCastles(geography){
  var castles = 0;
  var direction = 0;

  function checkDirection(index){
    var changeDirection = false;

    // check direction
    if(geography[index] > geography[index-1] && direction <= 0){
      direction = 1;
    } else if(geography[index] < geography[index-1] && direction >= 0) {
      direction = -1;
    }

    // check for directionChange
    if(geography[index] < geography[index+1] && direction < 0){
      changeDirection = true
    } else if(descending = geography[index] > geography[index+1] && direction > 0){
      changeDirection = true
    }

    return changeDirection;
  }

  // place initial castle
  if(geography.length) castles++;

  geography.forEach(function(item, index){
    var changeDirection = checkDirection(index);
    if(changeDirection){
      castles++
    }

    // place final castle
    if(typeof geography[index+1] == 'undefined' && (direction !== 0)){
      castles++;
    }
  });
  console.log('castles: ', castles); // TODO - Remove me
}

placeCastles(geography);