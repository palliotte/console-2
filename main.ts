let directionx: number;
let directiony: number;
let RINGS: game.LedSprite[];
let apple: game.LedSprite;
function rapple() {
    let n: number;
    
    while (ok == 0) {
        n = 0
        apple.set(LedSpriteProperty.X, randint(0, 4))
        apple.set(LedSpriteProperty.Y, randint(0, 4))
        while (n < RINGS.length - 1) {
            if (apple.isTouching(RINGS[n])) {
                apple.set(LedSpriteProperty.X, randint(0, 4))
                apple.set(LedSpriteProperty.Y, randint(0, 4))
            } else {
                ok = 1
            }
            
            n += 1
        }
    }
}

input.onGesture(Gesture.TiltLeft, function on_gesture_tilt_left() {
    
    if (start == 1) {
        if (check == 1) {
            directionx = -1
            directiony = 0
        }
        
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (start == 1) {
        if (check == 1) {
            directionx = 0
            directiony = -1
        }
        
    }
    
})
input.onGesture(Gesture.TiltRight, function on_gesture_tilt_right() {
    
    if (start == 1) {
        if (check == 1) {
            directionx = 1
            directiony = 0
        }
        
    }
    
})
let ok = 0
let check = 0
let start = 0
while (start == 0) {
    if (check == 1) {
        basic.showLeds(`
            . . # # #
                        . . # . #
                        # # # . #
                        . . . . .
                        . . # . .
        `)
    } else {
        basic.showLeds(`
            . # . . .
                        . . . # .
                        . # . . .
                        . . . . .
                        . . . # .
        `)
    }
    
    if (input.buttonIsPressed(Button.A)) {
        check = check - 1
    }
    
    if (input.buttonIsPressed(Button.B)) {
        check = check + 1
    }
    
    if (input.buttonIsPressed(Button.AB)) {
        start = 1
    }
    
}
if (start == 1 && check == 1) {
    directionx = 1
    directiony = 0
    game.setScore(0)
    RINGS = [game.createSprite(1, 2), game.createSprite(0, 2)]
    apple = game.createSprite(2, 2)
    rapple()
}

basic.forever(function on_forever() {
    if (start == 1 && check == 1) {
        basic.pause(1000)
        if (RINGS[0].isTouchingEdge()) {
            if (RINGS[0].get(LedSpriteProperty.X) == 4 && directionx == 1 || RINGS[0].get(LedSpriteProperty.X) == 0 && directionx == -1 || RINGS[0].get(LedSpriteProperty.Y) == 4 && directiony == 1 || RINGS[0].get(LedSpriteProperty.Y) == 0 && directionx == -1) {
                game.gameOver()
            }
            
        }
        
        RINGS.unshift(game.createSprite(RINGS[0].get(LedSpriteProperty.X) + directionx, RINGS[0].get(LedSpriteProperty.Y) + directiony))
        for (let o = 1; o < RINGS.length - 1; o++) {
            if (RINGS[0].isTouching(RINGS[o])) {
                game.gameOver()
            }
            
        }
        if (RINGS[0].isTouching(apple)) {
            rapple()
            game.addScore(1)
        } else {
            RINGS[RINGS.length - 1].delete()
            RINGS.removeAt(RINGS.length - 1)
        }
        
    }
    
})
