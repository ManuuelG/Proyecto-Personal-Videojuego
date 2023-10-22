class Enemy2 {
	constructor(ctx, canvasW, playerY, playerH) {
		this.ctx = ctx
		this.canvasW = canvasW

		this.img = new Image()
		this.img.src = "assets/tyra_walk.png"

		this.w = 120
		this.h = 100

		this.shotSound = new Audio ('assets/shotgun_shot.wav')

		this.img.frameIndex = 0
		this.img.frames = 12

		this.x = canvasW
		this.y = playerY + playerH - this.h - 40

		this.dx = 2

        this.bullets3 = []
        this.recharge = false

        this.isAttacking = false
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

                if (this.x <= this.canvasW - this.w) {
                    this.isAttacking = true;
                }
        
                if (this.isAttacking) {
                    this.attack();
                    this.bullets3.forEach((bullet3) => {
                        bullet3.draw(frameCounter)
                        bullet3.move()
                    
                    }
                    )
                } else {
                    this.move();
                    this.animateSprite(frameCounter);
                }
	}

	move() {
		this.x -= this.dx

        if (this.x < this.canvasW - this.w) {
            this.x = this.canvasW - this.w
        }
 

	}

	attack() {
		this.img.src = 'assets/tyra_attack.png'
		this.img.frames = 5
        this.w = 150
        this.h = 110

        if (this.recharge) return

		this.recharge = true 
		this.shotSound.play()
		this.shotSound.volume = 0.2

		this.bullets3.push(
			new bullet3 (this.ctx, this.x + this.w - 150 , this.y + 20, this.h)
		)

		setTimeout(() => (this.recharge = false), 4000)	
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
		
			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
			
}}
}