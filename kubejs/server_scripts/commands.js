function setupCommand(e, ctx) {
	var source = ctx.getSource()
	if (!source) console.log('invalid source')

	var player = source.getPlayerOrException()

	if (!player) console.log('invalid player')

	if (!player.persistentData) console.log('invalid persistent data')

	var pData = player.persistentData
	var disabledEvents = pData.disabledEvents

	if (e.disableStage && !player.stages.has(e.disableStage)) {
		source.sendSuccess(
			Text.of(['You have not unlocked disabling this event yet!']).red(),
			false
		)
		return 0
	}
	if (disabledEvents) {
		let disabledEventsList = []
		for (let i = 0; i < disabledEvents.length; i++) {
			disabledEventsList.push(disabledEvents[i])
		}

		if (disabledEventsList.includes(e.name)) {
			pData.disabledEvents = disabledEventsList.filter(item => item !== e.name)
			source.sendSuccess(
				Text.of(['Toggled ' + e.displayName + ' Event on']).green(),
				false
			)
			return 1
		} else {
			pData.disabledEvents.push(e.name)
			source.sendSuccess(
				Text.of(['Toggled ' + e.displayName + ' Event off']).green(),
				false
			)
			return 1
		}
	} else {
		pData.disabledEvents = [e.name]
		source.sendSuccess(
			Text.of(['Toggled ' + e.displayName + ' Event off']).green(),
			false
		)
		return 1
	}
}

ServerEvents.commandRegistry(event => {
	const { commands: Commands, arguments: Arguments, builtinSuggestions: Suggestions } = event
	const EventSettingsArgs = {
		timer: Arguments.INTEGER,
		timerDelay: Arguments.INTEGER,
		debug: Arguments.BOOLEAN,
		maxAttempts: Arguments.INTEGER,
		timeCooldown: Arguments.INTEGER,
	}
	event.register(
		Commands.literal('events').then(
			Commands.literal('statistics')
				.requires(src => src.hasPermission(3))
				.executes(function (ctx) {
					const source = ctx.getSource()
					let statistics = ctx.source
						.getServer()
						.getPersistentData().Statistics

					if (!statistics) {
						source.sendSuccess(
							Text.of(['No statistics found!']).red(),
							false
						)
						return 0
					}

					let text = []
					text.push(
						'Total Events Triggered: ' + statistics.totalEvents
					)
					text.push('==============================')
					Object.keys(statistics.failure).forEach(function (key) {
						text.push(
							'Total ' +
								key +
								' Events Failed: ' +
								statistics.failure[key]
						)
					})
					text.push('==============================')
					Object.keys(statistics.success).forEach(function (key) {
						let event = ftbEvents.find(e => e.name == key)
						text.push(
							'Total ' +
								event.displayName +
								' Events Succeeded: ' +
								statistics.success[key]
						)
					})
					source.sendSuccess(Text.of([text.join('\n')]), false)
					return 1
				})
				.then(
					Commands.literal('reset')
						.requires(src => src.hasPermission(3))
						.executes(function (ctx) {
							const source = ctx.getSource()
							let statistics = ctx.source
								.getServer()
								.getPersistentData().Statistics
							if (!statistics) {
								source.sendSuccess(
									Text.of([
										'No statistics found!',
									]).red(),
									false
								)
								return 0
							}
							statistics.totalEvents = 0
							statistics.failure = {}
							statistics.success = {}
							source.sendSuccess(
								Text.of([
									'Statistics reset',
								]).green(),
								false
							)
							return 1
						})
				)
		)
	)

	ftbEvents.forEach(ftbEvent => {
		event.register(
			Commands.literal('events')
				.then(
					Commands.literal('toggle').then(
						Commands.literal(ftbEvent.name).executes(function (
							ctx
						) {
							setupCommand(ftbEvent, ctx)
							return 1
						})
					)
				)
				.then(
					Commands.literal('force')
						.requires(src => src.hasPermission(3))
						.then(
							Commands.literal('ftbskies:random')
								.then(
									Commands.argument(
										'target',
										Arguments.PLAYER.create(
											event
										)
									).executes(function (ctx) {
										const target =
											Arguments.PLAYER.getResult(
												ctx,
												'target'
											)
										var source =
											ctx.getSource()
										if (!source)
											console.log(
												'invalid source'
											)
										if (!target)
											target =
												source.getPlayerOrException()
										if (!target)
											console.log(
												'invalid Target'
											)
										let chosenEvent =
											ftbEvents[
												Object.keys(
													ftbEvents
												)[
													Math.floor(
														Math.random() *
															Object.keys(
																ftbEvents
															)
																.length
													)
												]
											]
										let spawnFound =
											checkForSize(
												chosenEvent,
												target,
												10,
												true
											)
										if (
											!spawnFound &&
											chosenEvent.size >=
												0
										) {
											source.sendSuccess(
												Text.of(
													[
														'Spawn not found for ' +
															chosenEvent.displayName +
															' Event',
													]
												).red(),
												false
											)
											return 0
										}
										chosenEvent.execute(
											ctx,
											target,
											spawnFound
										)
										source.sendSuccess(
											Text.of([
												'Forced ' +
													chosenEvent.displayName +
													' Event for ' +
													target.username,
											]).green(),
											false
										)
										return 1
									})
								)
								.executes(function (ctx) {
									var source = ctx.getSource()
									if (!source)
										console.log(
											'invalid source'
										)
									let target =
										source.getPlayerOrException()
									if (!target)
										console.log(
											'invalid target'
										)

									let chosenEvent =
										ftbEvents[
											Object.keys(
												ftbEvents
											)[
												Math.floor(
													Math.random() *
														Object.keys(
															ftbEvents
														)
															.length
												)
											]
										]
									let spawnFound =
										checkForSize(
											chosenEvent,
											target,
											10,
											true
										)
									if (
										!spawnFound &&
										chosenEvent.size >=
											0
									) {
										source.sendSuccess(
											Text.of([
												'Spawn not found for ' +
													chosenEvent.displayName +
													' Event',
											]).red(),
											false
										)
										return 0
									}
									chosenEvent.execute(
										ctx,
										target,
										spawnFound
									)
									source.sendSuccess(
										Text.of([
											'Forced ' +
												chosenEvent.displayName +
												' Event',
										]).green(),
										false
									)
									return 1
								})
						)
						.then(
							Commands.literal(ftbEvent.name)
								.then(
									Commands.argument(
										'target',
										Arguments.PLAYER.create(
											event
										)
									).executes(function (ctx) {
										const target =
											Arguments.PLAYER.getResult(
												ctx,
												'target'
											)
										console.log(target)
										var source =
											ctx.getSource()
										if (!source)
											console.log(
												'invalid source'
											)
										if (!target)
											target =
												source.getPlayerOrException()
										if (!target)
											console.log(
												'invalid Target'
											)
										let chosenEvent =
											ftbEvent

										let spawnFound =
											checkForSize(
												chosenEvent,
												target,
												10,
												true
											)
										if (
											!spawnFound &&
											chosenEvent.size >=
												0
										) {
											source.sendSuccess(
												Text.of(
													[
														'Spawn not found for ' +
															chosenEvent.displayName +
															' Event',
													]
												).red(),
												false
											)
											return 0
										}
										chosenEvent.execute(
											ctx,
											target,
											spawnFound
										)

										source.sendSuccess(
											Text.of([
												'Forced ' +
													chosenEvent.displayName +
													' Event for ' +
													target.username,
											]).green(),
											false
										)
										return 1
									})
								)
								.executes(function (ctx) {
									var source = ctx.getSource()
									if (!source)
										console.log(
											'invalid source'
										)
									let target =
										source.getPlayerOrException()
									if (!target)
										console.log(
											'invalid target'
										)

									let chosenEvent = ftbEvent
									let location =
										target.blockPosition
									if (!location) {
										console.log(
											'invalid location'
										)
										return 0
									}

									let spawnFound =
										checkForSize(
											chosenEvent,
											target,
											10,
											true
										)
									if (
										!spawnFound &&
										chosenEvent.size >=
											0
									) {
										source.sendSuccess(
											Text.of([
												'Spawn not found for ' +
													chosenEvent.displayName +
													' Event',
											]).red(),
											false
										)
										return 0
									}
									chosenEvent.execute(
										ctx,
										target,
										spawnFound
									)
									source.sendSuccess(
										Text.of([
											'Forced ' +
												chosenEvent.displayName +
												' Event',
										]).green(),
										false
									)
									return 1
								})
						)
				)
				.then(
					Commands.literal('settings').then(
						Commands.literal('list').executes(function (ctx) {
							const source = ctx.getSource()
							let player = source.getPlayerOrException()
							let server = source.getServer()
							let sPData = server.getPersistentData()
							let eventSettings = sPData.eventSettings
							let text = []
							Object.keys(eventSettings).forEach(
								function (key) {
									text.push(
										key +
											': ' +
											eventSettings[
												key
											]
									)
								}
							)
							source.sendSuccess(
								Text.of([text.join('\n')]),
								false
							)
							return 1
						})
					)
				)
		)
	})
	Object.keys(EventSettingsArgs).forEach(function (key) {
		event.register(
			Commands.literal('events').then(
				Commands.literal('settings').then(
					Commands.literal('set').then(
						Commands.literal(key).then(
							Commands.argument(
								key,
								EventSettingsArgs[key].create(event)
							).executes(function (ctx) {
								const source = ctx.getSource()
								let server = source.getServer()
								let sPData =
									server.getPersistentData()
								let eventSettings =
									sPData.eventSettings
								let argument = EventSettingsArgs[
									key
								].getResult(ctx, key)
								eventSettings[key] = argument
								source.sendSuccess(
									Text.of([
										key +
											' set to ' +
											argument,
									]).green(),
									false
								)
								return 1
							})
						)
					)
				)
			)
		)
	})
})

function checkForSize(chosenEvent, chosenPlayer, maxAttempts, debug) {
	if (chosenEvent.size >= 0 && chosenEvent.minDistance && chosenEvent.maxDistance) {
		//10 Tries to find random location for the event to happen.
		let tries = 0
		let spawnFound
		let playerPos = new BlockPos(chosenPlayer.x, chosenPlayer.y, chosenPlayer.z)

		while (tries < maxAttempts && !spawnFound) {
			let randomLoc = new Ku.Level(chosenPlayer.getLevel()).getRandomLocation(
				playerPos,
				chosenEvent.minDistance,
				chosenEvent.maxDistance
			)

			if (debug && !spawnFound)
				console.log('Checking spawn location for event:' + chosenEvent.name)

			let spawnCheck = checkSpawnLocation(
				chosenPlayer.getLevel(),
				randomLoc,
				chosenEvent.size,
				chosenEvent.checkBlocks,
				chosenEvent.requireBlockBelow
			)
			if (spawnCheck.okay) {
				spawnFound = { pos: randomLoc, locationInfo: spawnCheck }
				return spawnFound
			} else {
				tries++
			}
		}
	} else {
		return null
	}
}
