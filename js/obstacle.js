class Obstacle {
	constructor(ctx, canvasW, canvasH) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH

		this.img = new Image()
		this.img.src = "assets/enemigo.png"

		this.w = 200
		this.h = 200

		this.img.frameIndex = 0
		this.img.frames = 9

		this.x = canvasW
		this.y = canvasH - this.h

		this.dx = 5
	}

	draw(frameCounter) {
		this.ctx.drawImage(
			this.img,
			this.img.frameIndex * (this.img.width / this.img.frames), // sx
				0, //sy
				this.img.width / this.img.frames, //swidth
				this.img.height, //sheight
				this.x, //dx
				this.y, //dy
				this.w, //dwidth
				this.h //dweight
				)
				this.animateSprite(frameCounter)
	}

	move() {
		this.x -= this.dx
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}
}
