class Boss {
	constructor(ctx, canvasW, playerY, playerH) {
		this.ctx = ctx
		this.canvasW = canvasW

		this.img = new Image()
		this.img.src = "assets/boss.png"

		this.w = 200
		this.h = 200

		this.img.frameIndex = 0
		this.img.frames = 9

		this.x = canvasW
		this.y = playerY + playerH - this.h

		this.dx = 6
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

		if (this.x >= 0) 
		{this.x -= this.dx}
		

	}


	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}
}
