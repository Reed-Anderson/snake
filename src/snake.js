// Snake.js

/**
 * @class Snake
 */
export default class Snake {
    constructor(x, y, segments) {
        this.body = [];
        for (var i = 0; i < segments; i++) {
            this.body.push({
                x: x-i,
                y: y
            });
        }
        this.direction = 'right';
    }
    checkForConsumption(food) {

    }
    update() {
        // Did we hit a wall?
        // Did we eat ourselves?
        // Did we eat food?
        // Do we need to grow?
    }
    /**
     * 
     * @param {*} ctx 
     */
    render(ctx) {
        this.body.forEach(segment => {
            ctx.save();
            ctx.fillStyle = 'green';
            ctx.fillRect(
                segment.x,
                segment.y,
                1, 1
            )
            ctx.restore();
        })
    }
}