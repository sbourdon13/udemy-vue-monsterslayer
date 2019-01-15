new Vue({
  el: "#app",
  data: {
    startNew: true,
    monster: {
      name: "Monster",
      score: 100,
      attack: 0
    },
    player: {
      name: "You",
      score: 100,
      attack: 0,
      heal: 0
    },
    historic: []
  },
  computed: {
    monsterWidth() {
      if (this.monster.score > 0) {
        return this.monster.score;
      } else return 0;
    },
    playerWidth() {
      if (this.player.score > 0) {
        return this.player.score;
      } else return 0;
    },
    winner() {
      if (this.player.score < 1) {
        return this.monster.name;
      } else if (this.monster.score < 1) {
        return this.player.name;
      } else {
        return 0;
      }
    }
  },
  methods: {
    monsterAttack() {
      this.monster.attack = Math.floor(Math.random() * 6) + 5;
      this.player.score -= this.monster.attack;
    },
    attack() {
      this.player.attack = Math.floor(Math.random() * 6) + 5;
      this.monster.score -= this.player.attack;
      this.monsterAttack();
      this.displayScores("attack");
    },
    specialAttack() {
      this.player.attack = Math.floor(Math.random() * 11) + 10;
      this.monster.score -= this.player.attack;
      this.monsterAttack();

      this.displayScores("attack");
    },
    heal() {
      this.player.heal = Math.floor(Math.random() * 6) + 5;
      this.player.score += this.player.heal;
      this.monsterAttack();
      this.displayScores("heal");
    },
    displayScores(type) {
      var textPlayer = "";
      if (type === "attack") {
        textPlayer = `PLAYER HITS MONSTER FOR ${this.player.attack}`;
      } else if (type === "heal") {
        textPlayer = `PLAYER HEALS HIMSELF FOR ${this.player.heal}`;
      }
      this.historic.splice(
        0,
        0,
        {
          turn: "monster",
          text: `MONSTER HITS PLAYER FOR ${this.monster.attack}`
        },
        {
          turn: "player",
          text: textPlayer
        }
      );
      if (this.winner) {
        var msg = confirm(this.winner + " win! Do you want to start again?");
        if (msg) {
          this.reset();
        } else this.startNew = true;
      }
    },
    reset() {
      this.monster.score = 100;
      this.player.score = 100;
      this.historic = [];
    }
  }
});
