//TODO: change size of platforms, manage random platform creation to prevent overlays
//TODO: Determine the players position at a certain point in time and create platforms based on those properties

var GameState = function (game) {    
};

//load assets
GameState.prototype.preload = function(){

    this.game.load.image('map', 'assets/map.png'); // thjs is the background
    this.game.load.image('ground', 'assets/block.png');//this is the ground
    this.game.load.image('block', 'assets/platform.png');//this is the image for the platforms, the block argument in the create function below links the sprite to the platform
    this.game.load.spritesheet('player', 'assets/dude.png', 32, 48);

};

GameState.prototype.create = function () {
    //this.game.add.sprite(0,0, 'map');

    //movement:
    this.MAX_SPEED = 500; //px/s
    this.ACCELERATION = 1500; //px/s/s
    this.DRAG = 900; //px/s
    this.GRAVITY = 2600;
    this.JUMP_SPEED = -1000;
    //create player
    this.player = this.game.add.sprite(this.game.width/2, this.game.height - 90, 'player');
    //add player movement animations;
    this.player.animations.add('left', [0,1,2,3], 10, true);
    this.player.animations.add('right', [5,6,7,8], 10, true);

    //physics
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    //make player collide with the boundaries of the game
    this.player.body.collideWorldBounds = true;
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
    this.player.body.drag.setTo(this.DRAG,0);

    //gravity:
    game.physics.arcade.gravity.y = this.GRAVITY;


    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    //controls:
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    //tryout with groups
    this.platforms = this.add.physicsGroup();

    this.platforms.create(0,110, 'block');
    this.platforms.create(50,30, 'block');


    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);//disable this, the platforms will fall

   


};

    /****************************************************************************************************************/
    /*                      Player related settings and controls                                                                  /
    /************************************************************************************************************** */

 GameState.prototype.update = function() {
     //collission checking
     this.game.physics.arcade.collide(this.player, this.ground);
     this.game.physics.arcade.collide(this.player, this.platforms);

     //controls
     if (this.leftInputIsActive()) {
         this.player.body.acceleration.x = -this.ACCELERATION;
         this.player.animations.play('left');
     } else if (this.rightInputIsActive()) {
         this.player.body.acceleration.x = this.ACCELERATION;
         this.player.animations.play('right');
     } else {
         this.player.body.acceleration.x = 0;
         this.player.animations.stop();
         //we need to do this to display the static position when standing
         this.player.frame = 4;
     }

     //check whether the player is on the ground
     var onTheGround = this.player.body.touching.down;
     //console.log(onTheGround);
     if(onTheGround && this.upInputIsActive()){
         this.player.body.velocity.y = this.JUMP_SPEED;
     }

     PlatformCallTimer = function (duration) {
         //TODO: write a timer that calls the create platform function after a
         //specified time
         this.timer = new game.timer(duration);
         //this.timer. WHATEVER, but: Set the timer here
         //after the timer is 0 call create platform with y = 0 and x = random
         //.... this might just work, damn
     };
     
     //Move platform group downwards
     //todo: add the function that moves the platforms downwards here we declared somewhere else to call it continually
     //todo: add a kill function for each platform on screen leave
    this.platforms.forEachAlive(function (platform) {
        platform.body.y += 0.5;
    });

     //kill function for platform ooB
     this.platforms.forEachAlive(function (platform){
         if (platform.body.y > game.world.height){
             platform.kill();
             console.log("platform killed");
         }

     })



 };//END UPDATE








//Player-left movement:
GameState.prototype.leftInputIsActive = function(){
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    isActive |= (this.game.input.activePointer.isDown &&
                this.game.input.activePointer.x < this.game.width/4);

    return isActive;
};


GameState.prototype.rightInputIsActive = function(){
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    isActive |= (this.game.input.activePointer.isDown &&
                this.game.input.activePointer.x > this.game.width/2 + this.game.width/4);

    return isActive;
};

GameState.prototype.upInputIsActive = function(duration){
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR, duration);
    isActive |= (this.game.input.activePointer.justPressed(duration + 1000/60) &&
                this.game.input.activePointer.x > this.game.width/4 &&
                this.game.input.activePointer.x < this.game.width/2 + this.game.width/4);

    return isActive;

//enable collission with platforms
    //this.game.physics.arcade.collide(block, player);
};

var game = new Phaser.Game(848,750, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);






















