//TODO: change size of platforms, manage random platform creation to prevent overlays
//TODO: Determine the players position at a certain point in time and create platforms based on those properties
// TODO: first though; manage spacing between platforms

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
    this.game.stage.background = "map";

    //movement:
    this.MAX_SPEED = 500; //px/s
    this.ACCELERATION = 1500; //px/s/s
    this.DRAG = 600; //px/s
    this.GRAVITY = 2600; //px/s/s
    this.JUMP_SPEED = -700; //->negative because negative is up

    //create player
    this.player = this.game.add.sprite(this.game.width/2, 100, 'player');

    //physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.player.body.maxSpeed.setTo(MAX_SPEED, MAX_SPEED * 10);//x,y
    //enable physics on player
    game.physics.enable(this.player);
    game.physics.arcade.gravity.y = this.GRAVITY;

    //make player collide with the boundaries of the game
    this.player.body.collideWorldBounds = true;

    //controls:
    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);


    this.ground = this.game.add.group();
    for(var x = 0; x < this.game.width; x += 32) {
        // Add the ground blocks, enable physics on each, make them immovable
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = true;
        groundBlock.body.allowGravity = false;
        this.ground.add(groundBlock);
    }



 
    //create ground
    /*this.ground = this.game.add.group();
    for(var x = 0; x < 10; x += 32){
       
    for(var x = 0; x < 10; x += 32){ //Add ground, enable physics, make blocks static
        var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
        this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
        groundBlock.body.immovable = false;//this allows the player to push the bloks away
        groundBlock.body.allowGravity = false;//setting this makes the blocks fall when the player touches them
        groundBlock.collideWorldBounds = true;

        //this.ground.add(groundBlock);//setting this makes the player unable to move
    }*/
};



   /* function createLedges(random_platform_x, random_platform_y) {
        var block;
        block = platforms.create(random_platform_x, random_platform_y, 'block');//block because we need to link it to the spritesheet
        block.body.immovable = true;
        console.log("A platform has been created since the function has been called");
    }

    
    function createArrays(platformarrayLength){
        var PlatformYarray = [platformarrayLength];
        //array that holds the y coordinates
        PlatformYarray[0] =  game.rnd.integerInRange(10,20);

        for (var i = 1; i < PlatformYarray; i++) {
            var obj = PlatformYarray[i-1];
            var obj_new = obj + game.rnd.integerInRange(10,20);
            PlatformYarray[i]=obj_new;
        }

        return obj_new;
    }

    function testArray(){
        //test
        for (var i = 0; i <= PlatformYarray; i++) {
            console.log(PlatformYarray[i]);
        }
    }*/

    //TODO: call createLedges() with the components of the x- and y- arrays



    /****************************************************************************************************************/
    /*                      Player related settings and controls                                                                  /
    /************************************************************************************************************** */

 GameState.prototype.update = function() {
     //collission checking
     this.game.physics.arcade.collide(this.player, this.ground);

     //controls
     if (this.leftInputIsActive()) {
         this.player.body.velocity.x = -this.MAX_SPEED;
     } else if (this.rightInputIsActive()) {
         this.player.body.velocity.x = this.MAX_SPEED;
     } else {
         this.player.body.velocity.x = 0;
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

var game = new Phaser.Game(848,450, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);






















