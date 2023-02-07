def rapple():
    global ok
    while ok == 0:
        n = 0
        while n < len(RINGS) - 1:
            if apple.is_touching(RINGS[n]):
                apple.set(LedSpriteProperty.X, randint(0, 4))
                apple.set(LedSpriteProperty.Y, randint(0, 4))
            else:
                ok = 1
            n += 1

def on_gesture_tilt_left():
    global directionx, directiony
    if start == 1:
        if check == 1:
            directionx = -1
            directiony = 0
input.on_gesture(Gesture.TILT_LEFT, on_gesture_tilt_left)

def on_button_pressed_b():
    global directionx, directiony
    if start == 1:
        if check == 1:
            directionx = 0
            directiony = -1
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_gesture_tilt_right():
    global directionx, directiony
    if start == 1:
        if check == 1:
            directionx = 1
            directiony = 0
input.on_gesture(Gesture.TILT_RIGHT, on_gesture_tilt_right)

ok = 0
check = 0
start = 0
while start == 0:
    if check == 1:
        basic.show_leds("""
            . . # # #
                        . . # . #
                        # # # . #
                        . . . . .
                        . . # . .
        """)
    else:
        basic.show_leds("""
            . # . . .
                        . . . # .
                        . # . . .
                        . . . . .
                        . . . # .
        """)
    if input.button_is_pressed(Button.A):
        check = check - 1
    if input.button_is_pressed(Button.B):
        check = check + 1
    if input.button_is_pressed(Button.AB):
        start = 1
if start == 1 and check == 1:
    directionx = 1
    directiony = 0
    game.set_score(0)
    RINGS = [game.create_sprite(1, 2), game.create_sprite(0, 2)]
    apple = game.create_sprite(2, 2)
    rapple()

def on_forever():
    if start == 1 and check == 1:
        basic.pause(1000)
        if RINGS[0].is_touching_edge():
            if RINGS[0].get(LedSpriteProperty.X) == 4 and directionx == 1 or RINGS[0].get(LedSpriteProperty.X) == 0 and directionx == -1 or RINGS[0].get(LedSpriteProperty.Y) == 4 and directiony == 1 or RINGS[0].get(LedSpriteProperty.Y) == 0 and directionx == -1:
                game.game_over()
        RINGS.unshift(game.create_sprite(RINGS[0].get(LedSpriteProperty.X) + directionx,
                RINGS[0].get(LedSpriteProperty.Y) + directiony))
        for o in range(1, len(RINGS) - 1):
            if RINGS[0].is_touching(RINGS[o]):
                game.game_over()
        if RINGS[0].is_touching(apple):
            rapple()
            game.add_score(1)
        else:
            RINGS[len(RINGS) - 1].delete()
            RINGS.remove_at(len(RINGS) - 1)
basic.forever(on_forever)
