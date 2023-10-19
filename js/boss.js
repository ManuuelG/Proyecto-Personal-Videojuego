class Boss {
	constructor(ctx, canvasW, playerY, playerH, life, visible) {
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

		this.bombs = []

		visible = true

		this.bombDropInterval = 3000;
		this.lastBombDropTime = Date.now();

		
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

				this.bombs.forEach((bomb) => {
					bomb.draw(frameCounter)
					bomb.move()
					console.log(bomb.draw)
				}
				)
				

				if (Math.random() < 0.01) {
					this.drop(); 
					console.log(this.drop)
				  }

				  const currentTime = Date.now();

				  if (currentTime - this.lastBombDropTime >= this.bombDropInterval) {
					this.drop(); 
					this.lastBombDropTime = currentTime;
				  }
	}

	move() {

		if (this.x >= 1) 
		{this.x -= this.dx}
		

	}

	defeat() {
		this.visible = false
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
