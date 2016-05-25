var GameState = function (game) {
};

//load assets
GameState.prototype.preload = function(){

    this.game.load.image('map', 'assets/map.png'); // thjs is the background
    this.game.load.image('ground', 'assets/block.png');//this is the ground
    this.game.load.image('block', 'assets/pixel_1.png');//this is the image for the platforms, the block argument in the create function below links the sprite to the platform
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
    this.player.anchor.set(0.5);

    this.player.yOrig = this.player.y;
    this.player.yChange = 0;

    //add player movement animations;
    this.player.animations.add('left', [0,1,2,3], 10, true);
    this.player.animations.add('right', [5,6,7,8], 10, true);

    //physics
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    //make player collide with the boundaries of the game
    this.player.body.collideWorldBounds = true;
    this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
    this.player.body.drag.setTo(this.DRAG,0);


    this.player.body.gravity.y = this.GRAVITY;
    this.player.body.checkCollision.up = false;
    //this.player.body.checkCollision.left = false;
    //this.player.body.checkCollision.right = false;
    


    //create floor
    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }

    //create platforms
    this.platformsCreate();

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




};

    /****************************************************************************************************************/
    /*                      Player related settings and controls                                                                  /
    /************************************************************************************************************** */

 GameState.prototype.update = function() {
     //collission checking
     this.physics.arcade.collide(this.player, this.ground);
     this.physics.arcade.collide(this.player, this.platforms);

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
     if (onTheGround && this.upInputIsActive()) {
         this.player.body.velocity.y = this.JUMP_SPEED;
     }

     this.world.setBounds(0, -this.player.yChange, this.world.width, this.game.height + this.player.yChange);

     /*this.cameraYMin = Math.min( this.cameraYMin, this.hero.y - this.game.height + 130 );
      this.camera.y = this.cameraYMin;*/

     this.platforms.forEachAlive(function (elem) {
         this.platformYMin = Math.min(this.platformYMin, elem.y);
         if (elem.y > this.camera.y + this.game.height) {
             elem.kill();
             this.platformsCreateOne(this.rnd.integerInRange(0, this.world.width - 50), this.platformYMin - 100, 50);
         }
     }, this);
 },
     
     GameState.prototype.shutdown = function () {
         this.world.setBounds( 0, 0, this.game.width, this.game.height );
         this.cursor = null;
         this.player.destroy();
         this.player = null;
         this.platforms.destroy();
         this.platforms = null;
         
     },

     GameState.prototype.platformsCreate = function(){
         //FUCK EVERYTHING
         this.platforms = this.add.group();
         this.platforms.enableBody = true;
         //the first parameter here changes the amount of platforms, but you have to change

         var numberofPlatforms = 8;
         this.platforms.createMultiple( numberofPlatforms, 'block' );

         // create the base platform, with buffer on either side so that the hero doesn't fall through
         this.platformsCreateOne( -16, this.world.height - 16, this.world.width + 16 );
         // create a batch of platforms that start to move up the level
         for( var i = 0; i < numberofPlatforms; i++ ) {
             //modify the last parameter in this line to change the width of the platforms
             this.platformsCreateOne( this.rnd.integerInRange( 0, this.world.width - 50 ), this.world.height - 100 - 100 * i, 100 );
         }
     },

     GameState.prototype.platformsCreateOne = function( x, y, width) {
    // this is a helper function since writing all of this out can get verbose elsewhere
    var platform = this.platforms.getFirstDead();

         if(platform) {
             platform.reset(x, y);
             platform.scale.x = width;
             platform.scale.y = 16;
             platform.body.immovable = true;
             return platform;
         }
     };


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