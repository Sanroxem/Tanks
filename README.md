# Tanks
Game for HR

npm install
npm run dev
use localhost provided in your browser

To the reviewer:
---------------------------------------------
Hey!
At the beggining I'd like to say that while I know typescript, I never really used it in any project. At previous job we worked with pure JS, so I'm not sure how much stuff should or shouldnt have types etc. as a good practice. Those things are quickly learned once you start working in company that has some standards regarding that, so It should be of not too much issue for you at this point. Or if you don't use typescript at work ( I was not told which company I'm being recruited for so far ;) ) => no issue at all.

I'm sending this late because I messed up a little => When I was almost done with the game, I realized that I misread specifications sheet from you and wrote whole thing in JavaScript instead of TypeScript, so I had to spend some time porting the code to TS.

I've added gameconfig file that lets you quickly change tanks data such as damage, number of bullets, or change the number and type of grids on the game board.
It also makes it easy to add new grid types. I tried to write the game in a way that makes it easy to add new things to it. Specifications said nothing about tanks interacting with each other so I only made bullets and other tanks treat them like a wall.

I left console log that displays hay HP after being shot for easier testing. Bullets that destroyed hay and still have dmg left in them keep flying retaining the rest of their dmg.
(I know that hay looks like a tree from graphics side, but I only had tree sprites in asset pack I found so... forgive me :P)

Hope you like it.

Have a nice day! ;)
---------------------------------------------------------------------------------------

Game Info:
!!!Check GameConfig.ts file for easy game manipulation. You can add new tanks, change damage, number of bullets (up to 3), hp, map size and more!!!

Simple tanks game based on a board made of grids (50x50 grids, 35px x 35px each by default).

Tanks:
Red Tank has 1 bullet 10 dmg each
Green tank has 2 bullets 25 dmg each
Blue tank has 3 bullets 20 dmg each

Bullets that destroy hay keep flying retaining rest of their damage.

Enviroment:
You can move only through empty space. Destroyed hay turns into empty space.
Walls can't be destroyed.
Hays can be destroyed. Hay has 100hp by default.
Tanks can't be destroyed

Inputs:
"T" => switch tank
"space" => shoot from tank
arrowKeys => turning and movement
You can't do 2 different actions at the same time.
