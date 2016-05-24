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


    //scaling
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.maxWidth = this.game.width;
    this.scale.maxHeight = this.game.height;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize( true );

    //camera
    this.cameraYMin = 99999;
    this.platformYMin = 99999;

    //create platforms
    this.platformsCreate();


};

    /****************************************************************************************************************/
    /*                      Player related settings and controls                                                                  /
    /************************************************************************************************************** */

 GameState.prototype.update = function() {
     //collission checking
     this.game.physics.arcade.collide(this.player, this.ground);

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



     this.world.setBounds( 0, -this.player.yChange, this.world.width, this.game.height + this.player.yChange );

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
};

var game = new Phaser.Game(848,750, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);