const entityStages = {
	'alexsmobs:centipede_head': 'no_centipedes',
}
const modStages = {
	// cnb: 'no_cnb',
}

function horizontalDistanceSqr(x1, z1, x2, z2) {
	return (x1 - x2) * (x1 - x2) + (z1 - z2) * (z1 - z2)
}

function findClosestPlayer(entity) {
	let { level, server, x, z } = entity

	const players = server
		.getPlayerList()
		.getPlayers()
		.filter(player => player.isAlive && player.level == level)

	if (players.length == 0) return null

	let nearestPlayer = players[0]
	let firstDistanceSqr = horizontalDistanceSqr(x, z, nearestPlayer.x, nearestPlayer.z)

	for (let player of players) {
		let x2 = player.x
		let z2 = player.z

		let distanceSqr = horizontalDistanceSqr(x, z, x2, z2)

		if (distanceSqr < firstDistanceSqr) {
			nearestPlayer = player
		}
	}

	return nearestPlayer
}

const mobSpawnsDebug = false

function debugLog(message) {
	if (mobSpawnsDebug) {
		console.log(message)
	}
}

EntityEvents.spawned(event => {
	const { entity } = event

	const entityType = entity.getType()
	const entityMod = entityType.split(':')[0]

	const isInEntityStages = entityType in entityStages
	const isInModStages = entityMod in modStages

	if (!isInEntityStages && !isInModStages) return

	//If this isn't the mob's first spawn (ie, server restart, chunk reload, etc), ignore the check
	//Only checks if it contains it, since it either exists as true or doesn't exist at all
	const mobHasData = entity.persistentData.contains('already_spawned')
	if (mobHasData) {
		debugLog(
			`A ${entityType} has spawned, but it has already spawned before. Continuing.`
		)
		return
	}

	const nearestPlayer = findClosestPlayer(entity)

	if (nearestPlayer == null) {
		debugLog(
			`A ${entityType} has spawned, but there were no players nearby. Continuing.`
		)
		return
	}

	const playerName = nearestPlayer.getName().getString()

	debugLog(`A ${entityType} has spawned, and the nearest player is ${playerName}`)
	if (!nearestPlayer) return

	//Uses mob mod
	if (isInModStages) {
		debugLog(`Checking if the player has stage ${modStages[entityMod]}`)

		let playerHasStage = nearestPlayer.stages.has(modStages[entityMod])

		if (playerHasStage) {
			// Always log, not just in debug
			console.log(
				`Canceling ${entityType} spawn as ${playerName} has stage ${modStages[entityMod]}`
			)
			event.cancel()
		}
		debugLog('They do not, continuing')
	}

	//Uses mob id
	if (isInEntityStages) {
		debugLog(`Checking if the player has stage ${entityStages[entityType]}`)

		let playerHasStage = nearestPlayer.stages.has(entityStages[entityType])
		if (playerHasStage) {
			debugLog(
				`Canceling ${entityType} spawn as ${playerName} has stage ${entityStages[entityType]}`
			)
			event.cancel()
		}

		debugLog('They do not, continuing')
	}

	//If it passes both of those checks, prevent them from being despawned if checked again
	entity.persistentData.putBoolean('already_spawned', true)
})
