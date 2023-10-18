class Player {
	constructor(ctx, canvasW, canvasH, keys) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH
		this.keys = keys

		this.img = new Image()
		this.img.src = 'assets/quieto.png'


		this.img.frameIndex = 0
		this.img.frames = 5

		this.x = canvasW * 0.08
		this.y0 = canvasH * 0.7

		this.y = this.y0

		this.vx = 1
		

		this.w = 150
		this.h = 190

		this.bullets = []

		this.actions = {
			jump: false,
			shot: false,
			right: false,
			left: false,
		}

		this.setControls()
	}

	setControls() {
		document.addEventListener('keydown', (event) => {
			switch (event.code) {
				case this.keys.JUMP:
					this.actions.jump = true

					if (this.y === this.y0) {
						this.y = this.y0 - 1
						this.vy = -10
					}

					break

					case this.keys.RIGHT:
					this.actions.right = true
					this.img.src = 'assets/palante.png'
					this.img.frames = 5
					
					
								
					break

					case this.keys.LEFT:
					this.actions.left = true
					this.img.src = 'assets/patras.png'
					this.img.frames = 5
					
					break

					case this.keys.UP:
					this.actions.up = true
					this.img.src = 'assets/up.png'
					this.img.frames = 6
					

					break

				case this.keys.SHOT:
					this.actions.shot = true
					this.img.src = 'assets/disparo.png'
					this.img.frames = 6
					this.shot()

			
			}
		})

		document.addEventListener('keyup', (event) => {
			switch (event.code) {
				case this.keys.SHOT:
					this.actions.shot = false
					this.img.src = 'assets/quieto.png'
					this.img.frames = 5
					break

					case this.keys.RIGHT:
					this.actions.right = false
					this.img.src = 'assets/quieto.png'
					this.img.frames = 5

					break

					case this.keys.LEFT:
					this.actions.left = false
					this.img.src = 'assets/quieto.png'
					this.img.frames = 5

					break

					case this.keys.UP:
					this.actions.up = false
					this.img.src = 'assets/quieto.png'
					this.img.frames = 5
			}
		})
	}

	draw(frameCounter) {
		this.ctx.drawImage(
			this.img,
			this.img.frameIndex * (this.img.width / this.img.frames), // sx
			0,
			this.img.width / this.img.frames,
			this.img.height,
			this.x,
			this.y,
			this.w,
			this.h
		)

		this.animateSprite(frameCounter)

		this.bullets = this.bullets.filter(
			(bullet) => bullet.x - bullet.radius < this.canvasW
		)

		this.bullets.forEach((bullet) => {
			bullet.draw()
			bullet.move()
		})
	}

	shot() {
		this.bullets.push(
			new Bullet(this.ctx, this.x + this.w, this.y0, this.y, this.h)
		)
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++

			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			}
		}
	}

	move() {
		const gravity = 0.45

		if (this.y < this.y0) {
			this.vy += gravity
		} else {
			this.vy = 0
			this.y = this.y0
		}

		this.y += this.vy

		if (this.actions.right) {
			this.playerx += this.vx + 2
			// if (this.playerx + this.w > this.canvasW) {
			// 	this.playerx = this.canvasW - this.w
			// }
		}

		if (this.actions.left) {
			this.playerx -= this.vx + 2
			if (this.playerx < 0) {
				this.playerx = 0
			}
		}
		
	}
}
