class Background {
	constructor(ctx, canvasW, canvasH, player) {
		this.ctx = ctx
		this.canvasW = canvasW
		this.canvasH = canvasH

		this.player = player
		

		this.img = new Image()
		this.x = 0
		this.dx = 10

		this.img.src = 'assets/background.png'
	}

	draw() {
		this.ctx.drawImage(this.img, this.x, 0, this.canvasW, this.canvasH)
		this.ctx.drawImage(this.img,this.canvasW + this.x ,0,this.canvasW,this.canvasH)
		
	}

	move() {
		

		
	
	}
}