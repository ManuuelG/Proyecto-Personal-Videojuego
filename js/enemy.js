class Enemy {
	constructor(ctx, canvasW, playerY, playerH) {
		this.ctx = ctx
		this.canvasW = canvasW

		this.img = new Image()
		this.img.src = "assets/enemy_run.png"

		this.w = 100
		this.h = 100

		this.img.frameIndex = 0
		this.img.frames = 6

		this.x = canvasW
		this.y = playerY + playerH - this.h - 40

		this.dx = 2
	}

	draw(frameCounter) {
		this.ctx.drawImage(
			this.img,
			this.img.frameIndex * (this.img.width / this.img.frames),
				0, //sy
				this.img.width / this.img.frames, 
				this.img.height, 
				this.x, 
				this.y, 
				this.w, 
				this.h 
				)
				this.animateSprite(frameCounter)
	}

	move() {
		this.x -= this.dx

	}

	attack() {
		this.img.src = 'assets/enemy_punch.png'
		this.img.frames = 4

		this.w = 115
		this.h = 115

		
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}
}
