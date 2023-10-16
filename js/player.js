class Player {
	constructor(ctx, canvasW, canvasH, keys) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH
		this.keys = keys

		this.img = new Image()
		this.img.src = 'assets/quieto.png'

		this.img2 = new Image()
		this.img2.src = 'assets/palante.png'

		// this.img3 = new Image()
		// this.img2.src = 'assets/patras.png'





		

		this.img.frameIndex = 0
		this.img.frames = 5

		this.img2.frameIndex = 0
		this.img2.frames = 5

		// this.img3.frameIndex = 0
		// this.img3.frames = 5
		

		this.x = canvasW * 0.05
		this.y0 = canvasH * 0.7

		this.y = this.y0
		

		this.vy = 1
		this.vx = 1
		this.w = 190
		this.h = 190

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
					
								
					break

					case this.keys.LEFT:
					this.actions.left = true
					
					break

					case this.keys.UP:
					this.actions.up = true
			}
		})

		document.addEventListener('keyup', (event) => {
			switch (event.code) {
				case this.keys.WALK:
					this.actions.walk = false
					break

					case this.keys.RIGHT:
					this.actions.right = false

					break

					case this.keys.LEFT:
					this.actions.left = false

					break

					case this.keys.UP:
					this.actions.up = false
			}
		})

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

		
		if (this.actions.right) {
			this.ctx.drawImage(
				this.img2,
				this.img2.frameIndex * (this.img2.width / this.img2.frames), // sx
				0, //sy
				this.img2.width / this.img2.frames, //swidth
				this.img2.height, //sheight
				this.x, //dx
				this.y, //dy
				this.w, //dwidth
				this.h //dweight
			)

			this.animateSprite(frameCounter)

			console.log('izquierdaaaaaaaaaa')
		}

		// else if (this.actions.left) {
		// 	this.ctx.drawImage(
		// 		this.img3,
		// 		this.img3.frameIndex * (this.img3.width / this.img3.frames), // sx
		// 		0, //sy
		// 		this.img3.width / this.img3.frames, //swidth
		// 		this.img3.height, //sheight
		// 		this.x, //dx
		// 		this.y, //dy
		// 		this.w, //dwidth
		// 		this.h //dweight
		// 	)

		// 	this.animateSprite(frameCounter)
		// }
		}
	

	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.img.frameIndex++
			 this.img2.frameIndex++
			//  this.img3.frameIndex++

			if (this.img.frameIndex >= this.img.frames) {
				this.img.frameIndex = 0
			} else if (this.img2.frameIndex >= this.img2.frames){
			 	this.img2.frameIndex = 0
			 }
			//  else if (this.img3.frameIndex >= this.img3.frames){
			// 	this.img3.frameIndex = 0
			// }
			

		
	}}
    
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
			this.x += this.vx + 2
			if (this.x + this.w > this.canvasW) {
				this.x = this.canvasW - this.w
			}
		}

		if (this.actions.left) {
			this.x -= this.vx + 2
			if (this.x < 0) {
				this.x = 0
			}
		}

		if (this.actions.up) {

		}
	}
}