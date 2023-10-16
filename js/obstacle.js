class Obstacle {
	constructor(ctx, canvasW, playerY, playerH) {
		this.ctx = ctx
		this.canvasW = canvasW

		this.w = 20
		this.h = 50

		this.x = canvasW
		this.y = playerY + playerH - this.h

		this.dx = 10
	}

	draw() {
		this.ctx.fillStyle = 'black'
		this.ctx.fillRect(this.x, this.y, this.w, this.h)
	}

	move() {
		this.x -= this.dx
	}
}
