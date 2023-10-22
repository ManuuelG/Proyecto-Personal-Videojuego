class Bomb {
	constructor(ctx, bossX, bossY) {
		this.ctx = ctx

		this.x = bossX + 40
		this.y = bossY - 10

		this.img = new Image()
		this.img.src = 'assets/boss_bombs.png'
		

		this.img.frameIndex = 0
		this.img.frames = 10

		


		this.w = 50
		this.h = 50

		this.vx = 0
		this.vy = 3
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