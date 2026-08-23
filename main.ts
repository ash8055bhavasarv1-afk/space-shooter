statusbars.onZero(StatusBarKind.Health, function (status) {
    sprites.destroy(status.spriteAttachedTo())
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, otherSprite, 200, 0)
    music.play(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -5
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let enemyShip: Sprite = null
let projectile: Sprite = null
let otherSprite: Sprite = null
effects.starField.startScreenEffect()
otherSprite = sprites.create(assets.image`plane`, SpriteKind.Player)
controller.moveSprite(otherSprite)
otherSprite.setStayInScreen(true)
info.setLife(5)
game.onUpdateInterval(2000, function () {
    enemyShip = sprites.create(img`
        . . . . . . . . . . . . . . 2 2 
        . . . . . . . . . . . . . 2 2 2 
        . . . . . . . . . . . . 2 2 2 2 
        . . . . . . . . . . . . 2 2 2 2 
        . . . . . . . . . . . 2 2 2 2 2 
        . . . . . . . . . . 2 2 2 2 5 2 
        . . . . . . . . 2 2 2 2 5 2 2 2 
        2 2 2 2 5 5 5 5 5 5 5 5 5 2 2 2 
        2 2 2 2 5 2 2 2 2 5 2 2 2 2 2 2 
        . . . . . . . . 2 2 5 2 2 2 2 2 
        . . . . . . . . . . 2 2 2 2 2 2 
        . . . . . . . . . . . 2 2 2 2 2 
        . . . . . . . . . . . . 2 2 2 2 
        . . . . . . . . . . . . 2 2 2 2 
        . . . . . . . . . . . . . 2 2 2 
        . . . . . . . . . . . . . . 2 2 
        `, SpriteKind.Enemy)
    enemyShip.x = scene.screenWidth()
    enemyShip.vx = -20
    enemyShip.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 2, StatusBarKind.EnemyHealth)
    statusbar.setColor(2, 7)
    statusbar.max = 0
    statusbar.attachToSprite(enemyShip)
})
