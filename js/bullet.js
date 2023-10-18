class Bullet {
	constructor(ctx, playerX, playerY) {
		this.ctx = ctx

		this.x = playerX
		this.y = playerY

		this.img = new Image()
		this.img.src = 'assets/fuego.png'
		

		this.img.frameIndex = 0
		this.img.frames = 4

		

		this.w = 70
		this.h = 70

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
		
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
	
	
		
			
}}
}
