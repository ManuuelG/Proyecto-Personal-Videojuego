class Bullet2 {
	constructor(ctx, playerX, playerY) {
		this.ctx = ctx

		this.x = playerX
		this.y = playerY

		this.img = new Image()
		this.img.src = 'assets/fire3.png'
		

		this.img.frameIndex = 0
		this.img.frames = 4

		


		this.w = 70
		this.h = 70

		this.vx = 0
		this.vy = -5
	}

	draw(frameCounter) {
		this.ctx.drawImage(
		this.img,
		0, // sx
		this.img.frameIndex * (this.img.height / this.img.frames), //sy
			this.img.width, //swidth
			this.img.height / this.img.frames, //sheight
			this.x, //dx
			this.y, //dy
			this.w, //dwidth
			this.h //dweight
			)
			
			
			this.animateSprite(frameCounter)
	}
	move() {
	
		this.y += this.vy
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