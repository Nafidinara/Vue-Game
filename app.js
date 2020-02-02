new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods: {
        startGame:function(){
            this.gameIsRunning = true,
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.turns = []
        },
        attack:function(){
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'player has damage the monster for '+ damage
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();
        },
        specialAttack:function(){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : 'player has damage hard the monster for ' + damage
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();
        },
        heal:function(){
            var heal = 10;
            if(this.playerHealth <=90){
                this.playerHealth += heal;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer : true,
                isHeal:true,
                text : 'player heal for ' + heal
            });
            this.monsterAttack();
        },
        giveUp:function(){
            if(confirm('you wanna give up?')){
                this.gameIsRunning = false;
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.turns = [];
                return;
            }else{

            }
        },
        monsterAttack:function(){
            var damage = this.calculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer : false,
                text : 'monster has damage the player for ' + damage
            });
            this.checkWin();
        },
        calculateDamage:function(min, max){
            return Math.max(Math.floor(Math.random()*max)+1,min)
        },
        checkWin:function(){
            if(this.monsterHealth<=0){
                if(confirm('you Won! new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;

            }else if (this.playerHealth<=0) {
                if(confirm('you lose! new game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }

            return false;
        }
    },
})