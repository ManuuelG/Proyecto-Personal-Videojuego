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

			
			if (this.frameCounter % 100 === 0) {
				this.generateEnemy()	
			}

			if (this.frameCounter % 50 === 0) {
				this.boss.move()	
			}

			this.drawAll()
			this.moveAll()

			if (this.Collision()) {
				
			}

			

			if (this.Collision2()) {
				
			}

			if (this.Collision3()) {
				
				this.Winner()
			}


			this.clearEnemies()

			console.log(this.enemies)
		}, 1000 / this.fps)
	},

	drawAll() {
		this.background.draw()
		this.boss.draw(this.frameCounter)
		this.player.draw(this.frameCounter)
		this.enemies.forEach((enemy) => {
			enemy.draw(this.frameCounter)	
	})
},

	moveAll() {
		// this.background.move()
		this.enemies.forEach((enemy) => {
			enemy.move()
		})
		
		this.player.move()
		this.boss.move() 
		// this.player.movebackground()
	},

	gameOver: function () {
		clearInterval(this.intervalId)

		if (confirm('GAME OVER! ¿Volver a jugar?')) {
			this.reset()
		}
	},

	Winner: function () {
		clearInterval(this.intervalId)

		if (confirm('YOU ARE A BEAST!')) {
			this.reset()
		}
	},

	generateEnemy: function () {
		this.enemies.push(
			new Enemy(this.ctx, this.canvasW, this.player.y0, this.player.h)
		)
	},

	Collision: function () {
		return this.enemies.some(
			(enemy) =>
				{
				
				const Collision = enemy.x + 20 < this.player.x + this.player.w &&
				enemy.x + enemy.w > this.player.x &&
				enemy.y + enemy.h > this.player.y &&
				enemy.y < this.player.y + this.player.h

				if (Collision) {
			    enemy.attack()
				this.player.die()
				}

			
				
			
				
				//declaro una variable
				//la someto a una condicion
				//devuelvo la variable con return
				//Como en collision2 que esta perfe
				
				
				
				
					return Collision
			
			}
				
			 
		)

	},



	Collision2: function () {
		return this.enemies.some((enemy) => this.player.bullets.some((bullet) => {
				
			const Collision = enemy.x  < bullet.x + bullet.w
				enemy.x + enemy.w > bullet.x 
				enemy.y + enemy.h > bullet.y 
				enemy.y < bullet.y + bullet.h

				if (Collision) {
					this.enemies = this.enemies.filter((e) => e !== enemy)
					this.player.bullets = this.player.bullets.filter((b) => b !== bullet)
					
				}

				return Collision
			}
			)

			
		)},

		Collision3: function () {
			return this.player.bullets2.some(
				(bullets2) =>
					bullets2.x + 10 < this.boss.x + this.boss.w &&
					bullets2.x + bullets2.w > this.boss.x &&
					bullets2.y + bullets2.h > this.boss.y &&
					bullets2.y < this.boss.y + this.boss.h
			)},
	

	clearEnemies: function () {
		this.enemies = this.enemies.filter(
			(enemy) => enemy.x + enemy.w > 0
		)
	},

	clear: function () {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	}








}