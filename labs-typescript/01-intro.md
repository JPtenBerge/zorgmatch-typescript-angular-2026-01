# Lab 1 - debug the casino-app

Prerequisites: the latest version of VS Code installed

1. Open VS Code in an empty directory.
1. Copy and paste the "Casino app code" to a new file named "casino-app.js". This code can also be found in the "lab01.js" file in your package.
1. There might be some bugs in the code try to find them all WITHOUT running the code.
1. Now add this as a first line: `// @ts-check`
1. Can you now find more bugs?

**Casino app code:**

```javascript
class Person {
  /**
   * @param {string} name
   */
  constructor(name) {
    this._name = name;
  }
}

class Player extends Person {
  /**
   *
   * @param {string} name
   * @param {number} chips
   */
  constructor(name, chips) {
    this.chips = chips;
  }

  toString() {
    return `${this.name} has ${chips} number of chips left`;
  }
}

var playerOne = new Player('Han', 46);
var playerTwo = new Player('Leia', 68);

var highestNumberOfChips = Math.max([playerOne.chips, playerTwo.chips]);
console.log(highestNumberOfChips + ' is the highest number of chips');

class RouletteBoard {
  constructor() {
    this.betRecords = [];
  }

  /**
   *
   * @param {Player} player
   * @param {number} bet
   */
  placeBet(player, bet) {
    var record = this.records.find((r) => r.player === player && r.bet === bet);
    if (!record) {
      record = { player: player, bet: bet, numberOfChips: 0 };
      this.betRecords.add(record);
    }
    record.numberOfChips++;
  }

  play() {
    var winner = Math.floor(Math.random() * 36);
    console.log('winning number: ' + winner);
    for (var record in this.betRecords) {
      if (this.betRecords[record].bet === winner) {
        var loot = this.betRecords[record].numberOfChips * 10;
        this.betRecords[record].player.chips += loot;
        console.log(
          this.betRecords[record].player.toString() + ' wins ' + loot,
        );
      }
    }
    this.betRecords = [];
  }
}

var roulette = new RouletteBoard();
roulette.placeBet(playerOne, 20);
roulette.placeBet(playerOne, 20);
roulette.placeBet(playerTwo, 1);
roulette.placeBet(playerTwo, 2);
roulette.placeBet(playerTwo, 6);
roulette.placeBet(playerTwo, 31);
roulette.placeBet(playerTwo, 5);
roulette.placeBet(playerTwo, 4);

roulette.play();
```
