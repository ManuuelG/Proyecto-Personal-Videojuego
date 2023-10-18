const Game = {
	ctx: undefined,
	canvasW: undefined,
	canvasH: undefined,
	fps: 60,
	keys: {
		JUMP: 'Space',
		SHOT: 'KeyX',
		RIGHT: 'ArrowRight',
		LEFT: 'ArrowLeft',
		UP: 'ArrowUp'
	},
	init: function () {
		const canvas = document.querySelector('canvas')
		this.ctx = canvas.getContext('2d')

		this.canvasW = canvas.width = innerWidth
		this.canvasH = canvas.height = innerHeight


		this.reset()
	},

	reset: function () {
		console.log('RESET')

		this.background = new Background(this.ctx, this.canvasW, this.canvasH)
		this.player = new Player(this.ctx, this.canvasW, this.canvasH, this.keys)
		this.boss = new Boss(this.ctx, this.canvasW, (this.canvasH - this.player.y0) - 150, this.player.h)
		this.enemies = []

	

		this.start()
	},

	start: function () {
		

		this.frameCounter = 0

		this.intervalId = setInterval(() => {
			this.clear()

			this.frameCounter++

			
			if (this.frameCounter % 50 === 0) {
				this.generateEnemy()	
			}

			if (this.frameCounter % 30 === 0) {
				this.boss.move()	
			}

			this.drawAll()
			this.moveAll()

			// if (this.isCollision()) {
			// 	// this.gameOver()
			// 	console.log('colision')
			// }

			this.clearEnemies()

			console.log(this.enemies)
		}, 1000 / this.fps)
	},

	drawAll() {
		this.background.draw()
		this.boss.draw(this.frameCounter)

		this.enemies.forEach((enemy) => {
			enemy.draw(this.frameCounter)
			if(
				this.enemies.some((enemy) => {
					const isCollision =
					enemy.x + 10 < this.player.x + this.player.w &&
					enemy.x + enemy.w > this.player.x &&
					enemy.y + enemy.h > this.player.y &&
					enemy.y < this.player.y + this.player.h

					if (isCollision) {
						enemy.attack()
						
					}

					return isCollision
				})
			)

			console.log('Colision')
		})
		


		this.player.draw(this.frameCounter)
	},

	moveAll() {
		// this.background.move()
		this.enemies.forEach((enemy) => {
			enemy.move()
		})
		
		this.player.move()
		// this.boss.move() 
		// this.player.movebackground()
	},

	gameOver: function () {
		// para el intervalo que implementa el loop de animación
		clearInterval(this.intervalId)

		if (confirm('GAME OVER! ¿Volver a jugar?')) {
			this.reset()
		}
	},

	generateEnemy: function () {
		this.enemies.push(
			new Enemy(this.ctx, this.canvasW, this.player.y0, this.player.h)
		)
	},



	// isCollision: function () {
	// 	return this.enemies.some(
	// 		(enemy) =>
	// 			enemy.x + 60 < this.player.x + this.player.w &&
	// 			enemy.x + enemy.w > this.player.x &&
	// 			enemy.y + enemy.h > this.player.y &&
	// 			enemy.y < this.player.y + this.player.h
	// 	)
	// },

	clearEnemies: function () {
		this.enemies = this.enemies.filter(
			(enemy) => enemy.x + enemy.w > 0
		)
	},

	clear: function () {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	},
}
