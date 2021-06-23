new Vue({
    el: '#app',
    data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      turns: []
    },
    methods: {
      startGame() {
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
      },
      attack() {
        let damage;
        
        damage = this.calculateDamage(1, 10);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: `Player hits Monster for ${damage}`
        })
        if (this.checkWin()) {
          return;
        }
        
        damage = this.calculateDamage(1, 10);
        this.playerHealth -= damage;
        this.checkWin();
        this.turns.unshift({
          isPlayer: false,
          text: `Monster hits Player for ${damage}`
        })
      },
      specialAttack() {
        this.monsterHealth -= this.calculateDamage(10, 20);
        if (this.checkWin()) {
          return;
        }
        
        this.playerHealth -= this.calculateDamage(10, 20);
        this.checkWin();
      },
      heal() {
        (this.playerHealth <= 90) ?
          this.playerHealth += 10 :
          this.playerHealth += this.calculateDamage(1, 20);
        
        (this.monsterHealth <= 90) ?
          this.monsterHealth += 10 :
          this.monsterHealth += this.calculateDamage(1, 20);
      },
      giveUp() {
        this.gameIsRunning = false;
        alert('Game Ended');
      },
      calculateDamage(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      checkWin() {
        if ( this.monsterHealth <= 0 ) {
          if ( confirm('You Won! New Game?') ) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
        } else if ( this.playerHealth <= 0 ) {
          if ( confirm('You Lost! New Game?') ) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
        }
        return false;
      }
    }
  });