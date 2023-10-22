class bullet3 {
	constructor(ctx, TyraX, TyraY) {
		this.ctx = ctx

		this.x = TyraX
		this.y = TyraY

		this.img = new Image()
		this.img.src = 'assets/fire2.png'
		

		this.img.frameIndex = 0
		this.img.frames = 4

		

		this.w = 50
		this.h = 50

		this.vx = 10
		
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
	
		this.x -= this.vx
		
	}

	animateSprite(frameCounter) {
		
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
	
	
		
			
}}
}