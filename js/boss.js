class Boss {
	constructor(ctx, canvasW, playerY, playerH, life) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.life = life
		

		this.img = new Image()
		this.img.src = "assets/boss.png"

		this.w = 200
		this.h = 200

		this.img.frameIndex = 0
		this.img.frames = 9

		this.x = canvasW
		this.y = playerY + playerH - this.h

		this.dx = 5

		this.direction = -1 

		this.bombs = []


		this.bombDropInterval = 3000;
		this.lastBombDropTime = Date.now();

		console.log('HOLAA')
		
	}

	draw(frameCounter) {
		this.ctx.drawImage(
			this.img,
			this.img.frameIndex * (this.img.width / this.img.frames), 
				0, 
				this.img.width / this.img.frames, 
				this.img.height, 
				this.x, 
				this.y, 
				this.w, 
				this.h 
				)
				this.animateSprite(frameCounter)

				this.bombs.forEach((bomb) => {
					bomb.draw(frameCounter)
					bomb.move()
				
				}
				)
				


				  const currentTime = Date.now();

				  if (currentTime - this.lastBombDropTime >= this.bombDropInterval) {
					this.drop(); 
					this.lastBombDropTime = currentTime;
				  }
	}

	move() {

		this.x += this.dx * this.direction;

    
        if (this.x < 0) {
            this.direction = 1; 
        } else if (this.x > this.canvasW - this.w) {
            this.direction = -1;
        }
		

	}

	defeat() {
		
		this.x = -3000
		this.y = -3000	
	}

	drop() {
		this.bombs.push(
			new Bomb(this.ctx, this.x, this.w, this.y, this.h)
		)
	}


	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}
}
