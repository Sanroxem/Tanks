TANKS 
Game for HR

npm install
npm run dev
use localhost provided in your browser

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
