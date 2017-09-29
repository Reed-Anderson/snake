export default class Food {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    update(position) {
        if (position && position.x === this.x && this.position.y === this.y) {}
            // food has been eaten.
    }
    render(context) {
        context.save();
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, 1, 1)
        context.restore();
    }
}