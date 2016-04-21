//FOR SOME DUMB CACHING REASON YOU ARE REQUIRED TO RUN THIS SHIT IN FIREFOX
//FUCK. Y U DO DIS, GOOGLE?

var game = new Phaser.Game(800, 480, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('map', 'assets/map.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('block', 'assets/block.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var blocks;
var cursors;

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
    ground.scale.setTo(7, 1);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(600, 310, 'block');
    ledge.body.immovable = true;

    ledge = platforms.create(300, 310, 'block');
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

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    //game.physics.arcade.overlap(player, stars, collectStar, null, this);

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


