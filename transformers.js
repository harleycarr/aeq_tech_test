battles = 0;

function Transformer (name, stats) {
  this.name = name;
  this.stats = stats;
  this.rating = stats.strength + stats.intelligence + stats.speed + stats.endurance + stats.firepower;
  this.active = true;
  this.isBoss = (name == 'Predaking' || name == 'Optimus Prime');
}

// transformer mocks
var autobots = [
  new Transformer("Bumblebee", {"strength": 2, "intelligence": 8, "speed":4, "endurance": 7, "rank": 7, "courage": 10, "firepower": 1, "skill": 7}),
  new Transformer("Shockwave", {"strength": 9, "intelligence": 10, "speed":7, "endurance": 7, "rank": 9, "courage": 9, "firepower": 9, "skill": 9}),
  new Transformer("Ravage", {"strength": 5, "intelligence": 8, "speed":5, "endurance": 6, "rank": 7, "courage": 4, "firepower": 7, "skill": 10})
];

var decepticons = [
  new Transformer("Pounce", {"strength": 5, "intelligence": 7, "speed": 4, "endurance": 5, "rank": 6, "courage": 8, "firepower": 7, "skill": 10}),
  new Transformer("Starscream", {"strength": 7, "intelligence": 7, "speed":9, "endurance": 7, "rank": 5, "courage": 8, "firepower": 7, "skill": 7}),
  new Transformer("Soundwave", {"strength": 8, "intelligence": 9, "speed":2, "endurance": 6, "rank": 8, "courage": 5, "firepower": 6, "skill": 10})
];

// sort transformers
function sortByRank(a, b){ return a.stats.rank < b.stats.rank;}
autobots.sort(sortByRank);
decepticons.sort(sortByRank);

function teamBattle(teamA,teamB) {
  function bosses(a,b) {
    return a.isBoss && b.isBoss;
  }
  function boss(a,b) {
    if(a.isBoss){
      b.active = false;
      return true;
    } else if(b.isBoss){
      a.active = false;
      return true;
    }
    return false;
  }

  function flee(a,b) {
    if (a.stats.courage - b.stats.courage >= 4 && a.stats.strength - b.stats.strength >= 3) {
      b.active = false;
      return true;
    } else if (b.stats.courage - a.stats.courage >= 4 && b.stats.strength - a.stats.strength >= 3) {
      a.active = false;
      return true;
    } else return false;
  }

  function skill(a,b){
    if (a.stats.skill - b.stats.skill >= 3) {
      b.active = false;
      return true;
    } else if (b.stats.skill - a.stats.skill >= 3) {
      a.active = false;
      return true;
    } else return false;
  }

  function rating(a,b){
    if (a.rating > b.rating){
      b.active = false;
    } else if (b.rating > a.rating){
      a.active = false;
    }
    return true;
  }
  battles = teamA.length < teamB.length ? autobots.length : decepticons.length;

  for(i=0; i < battles; i++){
    if(bosses(teamA[i], teamB[i])){
      autobots.forEach(function(item){ item.active = false; });
      decepticons.forEach(function(item){ item.active = false; });
      break;
    }

    if([boss,flee,skill,rating, function(a,b){a.active = false; b.active = false;}]
      .some(function(check){return check(teamA[i], teamB[i])}))
    continue;
  }
}

teamBattle(autobots, decepticons);

function reducer(sum, decepticon){
  if(!decepticon.active) return sum + 1;
  return sum;
}

function survivors(transformers){
return transformers
  .filter(function(transformer){
    return transformer.active;
  })
  .map(function(transformer){
    return transformer.name
  });
}
inactiveAutobots = autobots.reduce(reducer, 0);
console.log('battles: ', battles);
// interestingly there is an edge case here not defined in the design doc. If both teams tie, but one
inactiveDecepticons = decepticons.reduce(reducer, 0);

if(inactiveAutobots === inactiveDecepticons){
  // team has more transformers left alive it is not covered whether the team with more left alive win in this case.
  console.log('Tie!');
} else if(inactiveAutobots < inactiveDecepticons){
  console.log('Autobots Win!');
  console.log('Decepticon Survivors: ', survivors(decepticons));
} else {
  console.log('Decepticon\'s win', );
}