//TODO: change size of platforms, manage random platform creation to prevent overlays
//TODO: Determine the players position at a certain point in time and create platforms based on those properties
// TODO: first though; manage spacing between platforms

var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('map', 'assets/map.png'); // thjs is the background
    game.load.image('ground', 'assets/platform.png');//this is the ground
    game.load.image('block', 'assets/block.png');//this is the image for the platforms, the block argument in the create function below links the sprite to the platform
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var blocks;
var cursors;

//these are the variables used to modify the parameters in the game below
var width = 480; //The width of the world
var height = 3000; //The height of the world


function create() {

    game.world.setBounds(0, 0, 3000, 480);
    for (var i=0; i < 10; i++)
    {
        game.add.sprite(game.world.randomX, game.world.randomY, 'dude');
    }
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'map');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    blocks = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.enableBody=true;
    ground.body.immovable = true;//keeps platforms in place





    //place single platforms; comment this out later
    //var ledge = platforms.create(random_platform_x, random_platform_y, 'block'); //1st value:x-offset to the left, 2nd value: y-offset to the top

    function createLedges(random_platform_x, random_platform_y) {
        var block;
        block = platforms.create(random_platform_x, random_platform_y, 'block');//block because we need to link it to the spritesheet
        block.body.immovable = true;
        console.log("A platform has been created since the function has been called");
    }

    //Loop to Create random ledges; value settings: 1st value: x-offset to left, 2nd value: y-offset to the top
    //ensure that the individual platforms have enough space between each other...
    //40 px in each direction should probably suffice...
    //this means we need to ensure that the random integers are created with spacing

    for (i = 0; i<=2; i++){
        createLedges(game.rnd.integerInRange(10, 250),game.rnd.integerInRange(10, 250));
        i++;
        //we need to automate this task
        if(i>1){
            createLedges(game.rnd.integerInRange(251, 500), game.rnd.integerInRange(251,500));

        }
    }
    
    //improvement try platform creation algorithm
    



    
    ///THIS CALLS FOR MOTHERFUCKNG ARRAYS
    var ledgesArray = [10];
    ledgesArray[0] = 1;
    ledgesArray[1] = 2;
    ledgesArray[2] = 3;
    console.log("This is the length of the ledgesArray" + ledgesArray.length);
//this works just like in java.
    for (var j = 0; j < ledgesArray.length; j++) {
        console.log(ledgesArray[j]);
    }


    /****************************************************************************************************************/
    /*                      Player related settings                                                                  /
    /************************************************************************************************************** */

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    
    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
        
    game.camera.follow(player);
    lockonFollow();

}

function lockonFollow() {
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
    style = 'STYLE_LOCKON';
}


    
function update() {

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);


    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -300;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 300;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}