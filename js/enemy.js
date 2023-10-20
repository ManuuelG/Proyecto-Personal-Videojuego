class Enemy {
	constructor(ctx, canvasW, playerY, playerH) {
		this.ctx = ctx
		this.canvasW = canvasW

		this.img = new Image()
		this.img.src = "assets/enemy_walk.png"

		this.w = 100
		this.h = 140

		this.img.frameIndex = 0
		this.img.frames = 7

		this.x = canvasW
		this.y = playerY + playerH - this.h - 20

		this.dx = 4
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

	attack() {
		this.img.src = 'assets/melee2.png'
		this.img.frameIndex = 0
		this.img.frames = 4
		this.w = 100
		this.h = 140
		

		
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}
}
