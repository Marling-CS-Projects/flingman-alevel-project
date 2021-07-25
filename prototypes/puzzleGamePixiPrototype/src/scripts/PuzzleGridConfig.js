//list all puzzle grid fiels (places a pieve could go) as an array :]
export const PuzzleGridConfig = [
//array of the 9 different grid fields, with an id from 1 to 9, and their x/y coordinates RELATIVE TO THE PUZZLE GRID CONTAINER, NOT THE WHOLE SCREEN
{id: 1, x: -155, y: -155}, {id: 2, x: 0, y: -155}, {id: 3, x: 155, y: -155},
{id: 4, x: -155, y: 0}, {id: 5, x: 0, y: 0}, {id: 6, x: 155, y: 0},
{id: 7, x: -155, y: 155}, {id: 8, x: 0, y: 155}, {id: 9, x: 155, y: 155},
];