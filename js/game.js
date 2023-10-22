const Game = {
	ctx: undefined,
	canvasW: undefined,
	canvasH: undefined,
	scoreboard: ScoreBoard,
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
		
		
		this.background = new Background(this.ctx, this.canvasW, this.canvasH)
		this.player = new Player(this.ctx, this.canvasW, this.canvasH, this.keys, this.hit = 1)
		this.boss = null
		this.enemies = []
		this.enemies2 = []

		this.score = 0

		this.scoreboard.init(this.ctx)
		


		this.start()

	},

	start: function () {
		

		this.frameCounter = 0

		this.intervalId = setInterval(() => {
			this.clear()

			this.frameCounter++

			
			if (this.frameCounter % 200 === 0) {
				this.generateEnemy();
			}

			if (this.frameCounter % 600 === 0) {
				this.generateEnemy2();	
			}

			if (!this.boss && this.frameCounter % 2400 === 0) {
				this.boss = new Boss(this.ctx, this.canvasW, (this.canvasH - this.player.y0) - 150, this.player.h, this.life = 3)
				
			}

			this.drawAll()
			this.moveAll()
	
			this.Collision()

			this.Collision2()

			this.Collision3()

			if (this.boss) {
			this.Collision4()
			}

			this.Collision5()

			this.Collision6()


			this.clearEnemies()

			
		}, 1000 / this.fps)
	},

	drawAll() {
		this.background.draw()
		
		if (this.boss) {this.boss.draw(this.frameCounter)
		
		}
		this.player.draw(this.frameCounter)
		this.enemies.forEach((enemy) => {
			enemy.draw(this.frameCounter)	
	})

	this.enemies2.forEach((enemy2) => {
		enemy2.draw(this.frameCounter)	
})

this.scoreboard.update(this.score)

},

	moveAll() {
		this.background.move()

		this.MoveBackground()

		this.enemies.forEach((enemy) => {
			enemy.move()
		})

		this.enemies2.forEach((enemy2) => {
			enemy2.move()
		})
		
		this.player.move()
		
		if (this.boss)
		{this.boss.move()
		}
		
		
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


	generateEnemy2: function () {
		this.enemies2.push(
			new Enemy2 (this.ctx, this.canvasW, this.player.y0, this.player.h)
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
				setTimeout(() => this.gameOver(), 1000)
				}
				
					return Collision
			
			})
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

					this.score += 10;
           			this.scoreboard.update(this.score)
					
				}

			
				return Collision
				
			}
			)
			
		)},

		Collision3: function () {
			return this.player.bullets2.some(
				(bullets2) => {
					
					const Collision =	
					bullets2.x + 10 < this.boss.x + this.boss.w &&
					bullets2.x + bullets2.w > this.boss.x &&
					bullets2.y + bullets2.h > this.boss.y &&
					bullets2.y < this.boss.y + this.boss.h

					if (Collision) {
						this.player.bullets2 = this.player.bullets2.filter((b) => b !== bullets2)
						this.boss.life -= this.player.hit
						
						
					}
					
					if (this.boss.life <= 0) {
						this.boss.defeat()
						this.player.win()
						setTimeout(() => this.Winner(), 2000)
					}
				
				return Collision
				
				})},

				Collision4: function () {
					return this.boss.bombs.some(
						(bombs) => {
							
							const Collision =	
							bombs.x < this.player.x + this.player.w &&
							bombs.x + bombs.w > this.player.x &&
							bombs.y + bombs.h > this.player.y &&
							bombs.y  < this.player.y + this.player.h
		
							if (Collision) {
								this.boss.bombs = this.boss.bombs.filter((b) => b !== bombs)
								this.player.die()
								setTimeout(() => this.gameOver(), 1000)
								
								
								
							}
		
					
						
						return Collision
						
						})},

						Collision5: function () {
							return this.enemies2.some((enemy) => {
								return enemy.bullets3.some((bullets3) => {
									const Collision =
										bullets3.x < this.player.x + this.player.w &&
										bullets3.x + bullets3.w > this.player.x &&
										bullets3.y + bullets3.h > this.player.y &&
										bullets3.y < this.player.y + this.player.h;
						
									if (Collision) {
									
										enemy.bullets3 = enemy.bullets3.filter((b) => b !== bullets3);
										this.player.die()
										setTimeout(() => this.gameOver(), 1000)
									}
						
									return Collision;
								});
							});
						},

						Collision6: function () {
							return this.enemies2.some((enemy2) => this.player.bullets.some((bullet) => {
									
								const Collision = enemy2.x  < bullet.x + bullet.w
								enemy2.x + enemy2.w > bullet.x 
								enemy2.y + enemy2.h > bullet.y 
								enemy2.y < bullet.y + bullet.h
					
									if (Collision) {
										this.enemies2 = this.enemies2.filter((e) => e !== enemy2)
										this.player.bullets = this.player.bullets.filter((b) => b !== bullet)

										this.score += 20;
            							this.scoreboard.update(this.score)
										
									}
					
								
									return Collision
									
								}
								)
								)},

		MoveBackground: function() {

				
					
			if (this.player.x >= this.canvasW / 2) {
			
				this.background.x -= this.player.vx + 1;
			}
			
				},
	

	clearEnemies: function () {
		this.enemies = this.enemies.filter(
			(enemy) => enemy.x + enemy.w > 0
		)
	},

	clear: function () {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	}


}