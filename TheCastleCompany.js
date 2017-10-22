// Guessing if you wanted to write this in Jedi you could use .map .filter and store the slope results in a trinary variable -1,0,1
// the ending array would filter out duplicate slopes and 0's resulting in a final array that could be counted for the number of castles.

function placeCastles(geography){
  var castles = 0;
  var direction = 0;
  // takes in array of integers, find true peaks and values. returns count.
  
  function checkDirection(index){
    var changeDirection = false;

    // check direction
    if(geography[index] > geography[index-1] && direction <= 0){
      direction = 1;
    } else if(geography[index] < geography[index-1] && direction >= 0) {
      direction = -1;
    }

    // check for direction change
    if(geography[index] < geography[index+1] && direction < 0){
      changeDirection = true
    } else if(descending = geography[index] > geography[index+1] && direction > 0){
      changeDirection = true
    }

    return changeDirection;
  }

  // count castles
  if(geography.length) castles++;
  geography.forEach(function(item, index){
    if(checkDirection(index)) castles++
    if(typeof geography[index+1] == 'undefined' && (direction !== 0)) castles++;
  });
  return castles;
}

console.log('castles: ', placeCastles([1,1,2,3,3,4,3,2,2,1,1,2,1,4])); // 6 castles in mock.