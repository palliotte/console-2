function snake() {
    let RINGS: game.LedSprite[];
    let apple: game.LedSprite;
    input.onButtonPressed(Button.A, function on_button_pressed_a() {
        let directionx = 0
        let directiony = 1
    })
    input.onGesture(Gesture.TiltLeft, function on_gesture_tilt_left() {
        let directionx = -1
        let directiony = 0
    })
    input.onButtonPressed(Button.B, function on_button_pressed_b() {
        let directionx = 0
        let directiony = -1
    })
    input.onGesture(Gesture.TiltRight, function on_gesture_tilt_right() {
        let directionx = 1
        let directiony = 0
    })
    function rapple() {
        let n: number;
        let ok = 0
        while (ok == 0) {
            n = 0
            n = 0
            while (n < RINGS.length - 1) {
                apple.set(LedSpriteProperty.X, randint(0, 4))
                apple.set(LedSpriteProperty.Y, randint(0, 4))
                if (!apple.isTouching(RINGS[n])) {
                    ok = 1
                }
                
                n += 1
            }
        }
    }
    
    let directionx = 1
    let directiony = 0
    game.setScore(0)
    RINGS = [game.createSprite(1, 2), game.createSprite(0, 2)]
    apple = game.createSprite(2, 2)
    rapple()
    basic.forever(function on_forever() {
        basic.pause(3000)
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
        
    })
}

let check = 0
let start = 0
while (start == 0) {
    if (check == 1) {
        basic.showLeds(`
            . . # # #
                        . . # . #
                        # # # . #
                        . . . . .
                        . . . # .
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
        check = 0
    }
    
    if (input.buttonIsPressed(Button.B)) {
        check = 1
    }
    
    if (input.buttonIsPressed(Button.AB)) {
        if (check == 1) {
            snake()
        } else {
            
        }
        
        start = 1
    }
    
}
