'use strict';
// clicked variable for check start button click
let clicked = false;
// msec,secs,msecs variables for timer
let msecs = 0;
let secs = 0;
let mins = 0;
// score variable for store score
let score = 0;
//level variable for store levels
let level = 1;
//hearts variables for store number of hearts
let hearts = 3;
// index of player array to chose specific player 
let index = 0;
// flag used for return y coordinate for enemies to initial
let count = 1;
// take button from html to interacte with it.
const starBtn = document.querySelector('button')
// array of players you can play with one of them
const players = ['images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]
// array of prizes you can collecte
const prizes = ['images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',
    'images/Heart.png',
    'images/Key.png',
    'images/Star.png'
]
// array of values that prizes can take in x coordinate
const prizeX = [20, 121, 222, 323, 424];
// array of values that prizes can take in y coordinate
const prizeY = [105, 188, 271];
/* Predefine the variables we'll be using within this scope,
 * create the canvas element, grab the 2D context for that canvas
 * set the canvas elements height/width and add it to the DOM.
 */
const doc = window.document
const win = window.window
const canvas = doc.createElement('canvas')
const ctx = canvas.getContext('2d')
let lastTime;
canvas.width = 505;
canvas.height = 606;
doc.body.appendChild(canvas);
//declare click event on start button
starBtn.addEventListener('click', function () {
    //when the first clicked or clicked and hearts equal zero.
    if (clicked === false || hearts === 0) {
        // initial values
        clicked = true;
        hearts = 3;
        msecs = 0;
        secs = 0;
        mins = 0;
        score = 0;
        level = 1;
        // timer function
        Timer = setInterval(function Time() {
            msecs++;
            if (msecs === 10) {
                secs++;
                msecs = 0;
            }
            if (secs === 60) {
                mins++;
                secs = 0;
            }
        }, 100);
        // call engine function
        Engine(window);
    }

})
// Enemies our player must avoid
// Enemy constractour function
var Enemy = function (x, y, speed) {
    // image of enemy
    this.sprite = 'images/enemy-bug.png';
    // x coordinate of enemy
    this.x = x;
    // y coordinate of enemy
    this.y = y;
    // speed of enemy
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //if you in play (hearts more than zero)
    if (hearts > 0) {
        // declare random value
        let random = Math.random();
        // declare the only three values can enemy take in y coordinate
        const yAxis = [62, 145, 228];
        // give random x coordinate for each enemy
        this.x = this.x + random * this.speed * dt;
        // if enemy reach the end of play screen
        if (this.x > 404) {
            // return to the start of screen
            this.x = 0;
            // change place of enemys by y coordinate 
            // in first,second or third row randomly
            this.y = yAxis[(Math.random() * 2).toFixed(0)];
            // change spped of enemy randomly and increase it according your level you reach.
            this.speed = Math.random() * (200 + level * 5) + 150 + level * 80;
        }
        // if player collision into enemy
        if (this.x >= player.x - 62 && player.y + 14 == this.y && player.x > this.x) {
            // decrease hearts 
            hearts--;
            // return player to the initial position
            player.reset();
        }
        // if you lose (your hearts equal zero)
    } else {
        // return enemies to initial state.
        this.x = 0;
        // when enemy is bug1
        if (count === 1) {
            this.y = 62;
            count++;
        }
        // when enemy is bug2
        else if (count === 2) {
            this.y = 145;
            count++;
        }
        // when enemy is bug3
        else if (count === 3) {
            this.y = 228;
            count = 1;
        }
        this.speed = Math.random() * 200 + 150;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// player constructour function
var Player = function (sprite, x, y) {
    // player image
    this.sprite = sprite;
    // player x coordinate
    this.x = x;
    // player y coordinate
    this.y = y;
}
// update player position to initial if hearts qual zero .
Player.prototype.update = function () {
    if (hearts === 0) {
        this.reset();
    }
}
// draw player image
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// move player by up,down,left and right keys
Player.prototype.handleInput = function (key) {
    // when click on start button
    if (clicked === true) {
        // when press up key
        if (key === 'up') {
            // when reach to the sea
            if (this.y < 131) {
                // increase level
                level++;
                // increase score
                score += 20;
                // return player to initial position
                this.reset();
            }
            // one move to up 
            else {
                this.y -= 83;
            }
        }
        // when press down key
        if (key === 'down') {
            // overcome move off screen from down
            if (this.y >= 380) {}
            // one move down
            else {

                this.y += 83;
            }
        }
        // when press left key
        if (key === 'left') {
            // overcome move off screen from left
            if (this.x <= 0) {}
            // one move left 
            else {
                this.x -= 101;
            }
        }
        // when press right key
        if (key === 'right') {
            // overcome move off screen from left
            if (this.x >= 404) {}
            // one move left
            else {
                this.x += 101;
            }
        }
    }
}
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 380;
}
// collections constructor function
var Collections = function (sprite, x, y) {
    // prize image
    this.sprite = sprite;
    // prize x coordinate
    this.x = x;
    // prize y coordinate
    this.y = y;
}
// draw prize image
Collections.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// update prize position randomly when player take one.
Collections.prototype.update = function () {
    // when player reach prize
    if (this.x === player.x + 20 && this.y === player.y + 57) {
        // when prize is heart
        if (this.sprite === 'images/Heart.png') {
            // increase heart
            hearts++;
        }
        // when prize is Gem
        else if (this.sprite === 'images/Gem Blue.png' ||
            this.sprite === 'images/Gem Green.png' ||
            this.sprite === 'images/Gem Orange.png') {
            // increase score 5
            score += 5;
        }
        // when prize is key
        else if (this.sprite === 'images/Key.png') {
            // increase score 10
            score += 10;
        }
        // when prize is star
        else if (this.sprite === 'images/Star.png') {
            // increase score 15
            score += 15;
        }
        // change prize randomly
        this.sprite = prizes[(Math.random() * 5).toFixed(0)];
        // change prize position randomly
        this.x = prizeX[(Math.random() * 4).toFixed(0)];
        this.y = prizeY[(Math.random() * 2).toFixed(0)];
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//  the collections object in a variable prize
var bug1 = new Enemy(0, 62, Math.random() * 200 + 150);
var bug2 = new Enemy(0, 145, Math.random() * 200 + 150);
var bug3 = new Enemy(0, 228, Math.random() * 200 + 150);
var allEnemies = [bug1, bug2, bug3];
var player = new Player(players[index], 202, 380);
var prize = new Collections(prizes[(Math.random() * 5).toFixed(0)],
    prizeX[(Math.random() * 4).toFixed(0)],
    prizeY[(Math.random() * 2).toFixed(0)]);
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
// function to chose player you want
function choosePlayer() {
    // draw selector image
    ctx.drawImage(Resources.get('images/Selector.png'), 202, 380);
    // draw initial player image
    ctx.drawImage(Resources.get(players[index]), 202, 380);
    // click by mouse to navegate between players images 
    document.addEventListener('click', function (e) {
        // prevent replace the player when click start button
        if (e.target.id === 'start') {}
        // change player
        else {
            // move to the next player
            index++;
            // when reach the last player
            if (index === 5) {
                // return to the first player
                index = 0;
            }
        }
        // draw the player image
        ctx.drawImage(Resources.get(players[index]), 202, 380);
    });
    // make the player in the game who you chose
    player.sprite = players[index];

}
// load image for use it in choosePlayer function
Resources.load([
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
    'images/Selector.png',
]);
Resources.onReady(choosePlayer);