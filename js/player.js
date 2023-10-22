class Player {
	constructor(ctx, canvasW, canvasH, keys, hit) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH
		this.keys = keys
		this.hit = hit

		this.img = new Image()
		this.img.src = 'assets/quieto.png'


		this.img.frameIndex = 0
		this.img.frames = 5

		this.x = canvasW * 0.08
		this.y0 = canvasH * 0.7

		this.y = this.y0

		this.vx = 1
		this.vy = 1
		

		this.w = 150
		this.h = 160

		this.bullets = []
		this.bullets2 = []
		this.recharge = false

		this.actions = {
			jump: false,
			shot: false,
			right: false,
			left: false,
			dying: false,
			dead: false,
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
					this.shot2()
					

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



		this.bullets.forEach((bullet) => {
			bullet.draw(frameCounter)
			bullet.move()
		})

		this.bullets2.forEach((Bullet2) => {
			Bullet2.draw(frameCounter)
			Bullet2.move()
		})
	}

	shot() {

		if (this.recharge) return

		this.recharge = true 

		this.bullets.push(
			new Bullet(this.ctx, this.x + this.w, this.y0 + 60, this.y, this.h)
		)

		setTimeout(() => (this.recharge = false), 500)
	}

	shot2() {

		if (this.recharge) return

		this.recharge = true

		this.bullets2.push(
			new Bullet2(this.ctx, this.x + this.w / 2, this.y0, this.y, this.h)
		)

		setTimeout(() => (this.recharge = false), 500)
	}

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++

			if (this.img.frameIndex >= this.img.frames) {
				
				if (this.actions.dying) {
					this.img.frameIndex = 16
					// this.actions.dead = true
					
					
				} else {this.img.frameIndex = 0
				}
				
			
			
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
			this.x += this.vx + 10
			if (this.x + this.w > this.canvasW) {
				this.x = this.canvasW - this.w
			}
		}

		if (this.actions.left) {
			this.x -= this.vx + 10
			if (this.x < 0) {
				this.x = 0
			}
		}
	
	}

	die() {
		this.img.src = 'assets/player_die.png'
		this.img.frames = 17
		this.actions.dying = true


	}

	win() {
		this.img.src = 'assets/win.png'
		this.img.frames = 6
	}
	
}
