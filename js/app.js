// Enemies class
const Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}

// Variables to use in the score message
let score = 0;
let scoreMessage = document.querySelector('h3');

// Update the enemy's position
// If player and enemy collide, replace the player in start positio
// and decrease the "Feed-Hydration_Level" 
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;

    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y){
            score = score - 1 ;
            scoreMessage.innerText = `Raise your Feet-Hydration. Current Level = ${score}.`;   
            player.x = 202;
            player.y = 405;
    }
}

// Draw the enemies on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class
const Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
}
// Update the players status
Player.prototype.update = function (dt) {

}
// Display the player on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Make player beeing controled by arrow keys
// Take care of the player not leaving the game board
// If player touches the water increase the "Feet-Hydration-Level"
Player.prototype.handleInput = function (keyPress) {
   if(keyPress == 'left' && this.x > 0) {
       this.x -= 102;
   } 
   if(keyPress == 'right' && this.x < 405) {
       this.x += 102;
   }
   if(keyPress == 'up' && this.y > 0) {
       this.y -= 83;
   }
   if(keyPress == 'down' && this.y < 405) {
       this.y += 83;
   }
   if(this.y < 0) {
       score = score + 1 ;
       scoreMessage.innerText = `Raise your Feet-Hydration. Current Level = ${score}.`;
       setTimeout(function () {
           player.x = 202;
           player.y = 405;
       }, 600);
   }
}

// Create an array of enemies and create enemies for each 
// of the three vertical positions (y-axis)
let allEnemies = [];
let enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player

let player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
