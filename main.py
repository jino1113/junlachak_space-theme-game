def on_a_pressed():
    global canShoot, projectile
    if canShoot == True:
        canShoot = False
        projectile = sprites.create_projectile_from_sprite(img("""
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
                """),
            mySprite,
            0,
            -50)
        projectile.start_effect(effects.trail, 500)
        projectile.start_effect(effects.spray, 100)
        music.play(music.melody_playable(music.pew_pew),
            music.PlaybackMode.IN_BACKGROUND)
        pause(500)
        canShoot = True
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    sprite.destroy()
    otherSprite.destroy()
    info.change_score_by(1)
    music.play(music.melody_playable(music.ba_ding),
        music.PlaybackMode.IN_BACKGROUND)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.projectile, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    music.play(music.melody_playable(music.power_down),
        music.PlaybackMode.IN_BACKGROUND)
    info.change_life_by(-1)
    otherSprite2.destroy(effects.spray, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

myEnemy: Sprite = None
projectile: Sprite = None
canShoot = False
mySprite: Sprite = None
isButtonPressed = False
scene.set_background_color(15)
pause(100)
game.splash("Press A to Play",
    "High Score: " + ("" + str(info.high_score())))
effects.star_field.start_screen_effect(500)
mySprite = sprites.create(img("""
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
        """),
    SpriteKind.player)
controller.move_sprite(mySprite, 100, 100)
mySprite.set_stay_in_screen(True)
info.set_life(5)
music.play(music.string_playable("E B C5 A B G A F ", 120),
    music.PlaybackMode.LOOPING_IN_BACKGROUND)
music.set_volume(100)
canShoot = True

def on_update_interval():
    global myEnemy
    myEnemy = sprites.create_projectile_from_side(img("""
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
            """),
        0,
        50)
    myEnemy.x = randint(0, 160)
    myEnemy.set_kind(SpriteKind.enemy)
game.on_update_interval(1000, on_update_interval)
