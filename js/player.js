class Player {
	constructor(ctx, canvasW, canvasH, keys) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH
		this.keys = keys

		this.img = new Image()
		this.img.src = 'assets/player_move.png'

		

		this.img.frameIndex = 0
		this.img.frames = 9

		this.x = canvasW * 0.05
		this.y0 = canvasH * 0.7

		this.y = this.y0
		

		this.vy = 1
		this.vx = 1
		this.w = 200
		this.h = 200

		this.bullets = []

		this.actions = {
			jump: false,
			walk: false,
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

				case this.keys.WALK:
					this.actions.walk = true
					break

					case this.keys.RIGHT:
					this.actions.right = true
					console.log('Pa la derecha')
								
					break
			}
		})

		document.addEventListener('keyup', (event) => {
			switch (event.code) {
				case this.keys.WALK:
					this.actions.walk = false
					break

					case this.keys.RIGHT:
					this.actions.right = false
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
            this.x += this.vx
		}
}

     
}