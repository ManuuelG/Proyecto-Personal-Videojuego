class Bullet {
	constructor(ctx, canvasW, canvasH) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH

		this.img = new Image()
		this.img.src = 'assets/fuego.png'

		this.img.frameIndex = 0
		this.img.frames = 1

		this.frameCounter = 0

		this.x = canvasW * 0.9
		this.y0 = canvasH * 0.9

		this.y = this.y0

		this.w = 300
		this.h = 300
		


		this.vx = 10
		this.vy = -5
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
		
		this.x += this.vx
		
	}

	animateSprite(frameCounter) {
		if (frameCounter % 1 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}}
