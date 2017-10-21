battles = 0;

function Transformer (name, stats) {
  this.name = name;
  this.stats = stats;
  this.rating = stats.strength + stats.intelligence + stats.speed + stats.endurance + stats.firepower;
  this.active = true;
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
    if (a.name == 'Optimus Prime' || a.name == 'Predaking' && b.name == 'Optimus Prime' || b.name == 'Predaking') {
      return true;
    }
    return false;
  }
  function boss(a,b) {
    if(a.name == 'Optimus Prime' || a.name == 'Predaking'){
      b.active = false;
      return true;
    } else if(b.name == 'Optimus Prime' || b.name == 'Predaking'){
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
    } else {
      a.active = false;
      b.active = false;
    }
    return true;
  }
  battles = teamA.length < teamB.length ? autobots.length : decepticons.length;

  for(i=0; i < battles; i++){
    if(bosses(teamA[i], teamB[i])){
      console.log('destroy all robots'); // TODO - Remove me
      autobots.forEach(function(item){ item.active = false; });
      decepticons.forEach(function(item){ item.active = false; });
      break;
    }
    
    if(boss(teamA[i], teamB[i])){
      continue;
    }

    if(flee(teamA[i], teamB[i])){
      continue;
    }
    if(skill(teamA[i], teamB[i])){
      continue;
    }
    if(rating(teamA[i], teamB[i])){
      continue;
    }
    // tie
    teamA[i].active = false;
    teamB[i].active = false;
  }

}

teamBattle(autobots, decepticons);

function reducer(sum, decepticon){
  if(!decepticon.active) return sum + 1;
  return sum;
}
inactiveAutobots = autobots.reduce(reducer, 0);
inactiveDecepticons = decepticons.reduce(reducer, 0);

if(inactiveAutobots === inactiveDecepticons){
  // interestingly there is an edge case here not defined in the design doc. If both teams tie, but one
  // team has more transformers left alive it is not covered whether the team with more left alive win in this case.
  console.log('Tie!');
} else if(inactiveAutobots < inactiveDecepticons){
  console.log('Autobots Win!');
} else {
  console.log('Decepticon\'s win', );
}
console.log('Total battes: ', battles);


/*

The “overall rating” of a Transformer is the following formula:
(Strength + Intelligence + Speed + Endurance + Firepower)
Each Transformer must either be an Autobot or a Decepticon.
Your program should take input that describes a group of Transformers and based on that group
displays:
a. The number of battles
b. The winning team
c. The surviving members of the losing team
The basic rules of the battle are:
● The teams should be sorted by rank and faced off one on one against each other in order to
determine a victor, the loser is eliminated
● A battle between opponents uses the following rules:
○ If any fighter is down 4 or more points of courage and 3 or more points of strength
compared to their opponent, the opponent automatically wins the face-off regardless of
overall rating (opponent has ran away)
○ Otherwise, if one of the fighters is 3 or more points of skill above their opponent, they win
the fight regardless of overall rating
○ The winner is the Transformer with the highest overall rating
● In the event of a tie, both Transformers are considered destroyed
● Any Transformers who don’t have a fight are skipped (i.e. if it’s a team of 2 vs. a team of 1, there’s
only going to be one battle)
● The team who eliminated the largest number of the opposing team is the winner
Special rules:
● Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
any other criteria
● In the event either of the above face each other (or a duplicate of each other), the game
immediately ends with all competitors destroyed
For example, given the following input:
Soundwave, D, 8,9,2,6,7,5,6,10
Bluestreak, A, 6,6,7,9,5,2,9,7

Hubcap: A, 4,4,4,4,4,4,4,4
The output should be:
1 battle
Winning team (Decepticons): Soundwave
Survivors from the losing team (Autobots): Hubcap
 */
