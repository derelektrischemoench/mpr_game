//FOR SOME DUMB CACHING REASON YOU ARE REQUIRED TO RUN THIS SHIT IN FIREFOX
//FUCK. Y U DO DIS, GOOGLE?

var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('map', 'assets/map.png'); // thjs is the background
    game.load.image('ground', 'assets/platform.png');//this is the ground
    game.load.image('block', 'assets/block.png');//this is the image for the platforms
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var blocks;
var cursors;

//these are the variables used to modify the parameters in the game below
var width = 480; //The width of the world
var height = 3000; //The height of the world
var platformwidth = 200; //the width of the individual platforms


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
    blocks.enablyBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(7, 1);

    //  If this is disabled the platforms fall down under the weight of the player
    ground.body.immovable = true;

    //  Now let's create two ledges to which we pass two randomly generated position coordinates
    var random_platform_x = game.rnd.integerInRange(10,500);
    var random_platform_y = game.rnd.integerInRange(10,400);

    //place random platforms
    var ledge = platforms.create(random_platform_x, random_platform_y, 'block'); //1st value:x-offset to the left, 2nd value: y-offset to the top

    //for testing purposes: create statically positioned platforms
    //var ledge = platforms.create(500,400, 'block');

    ledge.scale.y = 0.1; //height of the platform
    ledge.body.immovable = true;


    // The player and its settings
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