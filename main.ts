namespace SpriteKind {
    export const Healitem = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Healitem, function (sprite2, otherSprite2) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
    otherSprite2.destroy(effects.spray, 500)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (sprites.allOfKind(SpriteKind.Projectile).length < 1) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . 3 1 1 3 . . . . . . 
            . . . . . 2 1 1 1 1 2 . . . . . 
            . . . . . 2 1 1 1 1 2 . . . . . 
            . . . . . . 3 1 1 3 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 0, -50)
        projectile.startEffect(effects.trail, 500)
        projectile.startEffect(effects.spray, 100)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    } else {
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone)
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    otherSprite2.destroy(effects.spray, 500)
})
info.onLifeZero(function () {
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.UntilDone)
    game.setGameOverMessage(true, "GAME OVER!")
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.gameOver(true)
})
let myEnemy: Sprite = null
let myHealitem: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(15)
game.splash("Press A to Play", "High Score: " + ("" + info.highScore()))
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 6 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 6 . . . . . . . 
    . . . . . . 8 8 9 8 . . . . . . 
    . . . . . . 8 6 9 8 . . . . . . 
    . . . . . c c c 8 8 8 . . . . . 
    . . . . 8 8 6 6 6 9 8 8 . . . . 
    . . 8 f f f c c e e f f 8 8 . . 
    . 8 8 8 8 8 8 6 6 6 6 9 6 8 8 . 
    8 8 8 8 8 8 8 8 6 6 6 9 6 6 8 8 
    8 8 8 8 8 8 8 8 6 6 6 6 9 6 8 8 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
info.setLife(5)
info.setScore(0)
music.play(music.stringPlayable("E B C5 A B G A F ", 120), music.PlaybackMode.LoopingInBackground)
music.setVolume(100)
game.onUpdateInterval(5000, function () {
    if (info.life() < 5) {
        myHealitem = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . 6 6 6 6 6 
            . . . . . . . . . 6 6 7 7 7 7 8 
            . . . . . . 8 8 8 7 7 8 8 6 8 8 
            . . e e e e c 6 6 8 8 . 8 7 8 . 
            . e 2 5 4 2 e c 8 . . . 6 7 8 . 
            e 2 4 2 2 2 2 2 c . . . 6 7 8 . 
            e 2 2 2 2 2 2 2 c . . . 8 6 8 . 
            e 2 e e 2 2 2 2 e e e e c 6 8 . 
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 . 
            . c 2 e e e 2 e 2 4 2 2 2 2 c . 
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e 
            . . . e c c e c 2 2 2 2 2 2 2 e 
            . . . . . . . c 2 e e 2 2 e 2 c 
            . . . . . . . c e e e e e e 2 c 
            . . . . . . . . c e 2 2 2 2 c . 
            . . . . . . . . . c c c c c . . 
            `, 0, 50)
        myHealitem.x = randint(0, 160)
        myHealitem.setKind(SpriteKind.Healitem)
    }
})
game.onUpdateInterval(1000, function () {
    myEnemy = sprites.createProjectileFromSide(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, 0, 50)
    myEnemy.x = randint(0, 160)
    myEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(500, function () {
    if (info.score() == 20) {
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    }
    if (info.score() >= 20) {
        myEnemy = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . c c . . . . . . 
            . . . . . c a a a a . . . . . . 
            . . . . . a a f f b a . . . . . 
            . . . . c a b f f c b . . . . . 
            . . . . c b b b a f c b . . . . 
            . . . . c b a c a b b b . . . . 
            . . . . . b b f f a a c . . . . 
            . . . . . . a a b b c . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 50)
        myEnemy.x = randint(0, 160)
        myEnemy.setKind(SpriteKind.Enemy)
    }
})
