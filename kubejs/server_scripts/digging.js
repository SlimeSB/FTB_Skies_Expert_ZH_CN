const digBlocks = [
	'botania:dry_grass',
	'botania:vivid_grass',
	'minecraft:grass_block',
	'minecraft:dirt',
	'minecraft:coarse_dirt',
	'antiblocksrechiseled:wool_green',
	'antiblocksrechiseled:wool_lime',
	'compactmachines:solid_wall',
	'botania:infused_grass',
	'ftbskies:compressed_dirt',
	'ftbskies:compressed_cobblestone',
	'ftbskies:compressed_gravel',
]

BlockEvents.rightClicked(digBlocks, event => {
	const { item, hand, player, server, block } = event
	let pData = player.persistentData
	if (!pData.digging) pData.digging = 0

	if (hand != 'MAIN_HAND') return
	if (!event.player.crouching) return
	if (item.id != 'minecraft:air') {
		return
	}
	pData.digging++
	if (pData.digging < 10) {
		if (block.id.contains('compressed')) {
			player.getInventory().placeItemBackInInventory(
				Item.of(block.id.replace('ftbskies:compressed_', 'minecraft:'), 2)
			)
		} else {
			let chunk
			switch (player.getOffhandItem()) {
				case 'ftbskies:soil':
					chunk = 'ftbskies:soil'
					break
				case 'ftbskies:rock':
					chunk = 'ftbskies:rock'
					break
				default:
					chunk =
						Math.random() < 0.25
							? 'ftbskies:soil'
							: 'ftbskies:rock'
					break
			}
			player.getInventory().placeItemBackInInventory(chunk)
		}
	} else {
		if (!pData.throttled) {
			error(event, `你挖得太快了！`)
		}

		// this should only ever trigger when using an autoclicker or spamming right click VERY fast
		pData.throttled = true
		pData.throttledTimer = 0
	}
	// player.tell(`Digging: ${pData.digging}`);
	// for (let i in player) console.log(i)
})

PlayerEvents.loggedIn(event => {
	event.player.persistentData.digging = 0
	event.player.persistentData.throttled = false
	event.player.persistentData.throttledTimer = 0
})

PlayerEvents.tick(event => {
	const { player } = event
	let pData = player.persistentData

	// decrement the digging counter every 3 ticks
	if (player.age % 4 === 0 && pData.digging > 0) {
		// player.tell(`Digging-Tick: ${pData.digging}`)
		pData.digging--
	}
	// If throttled, start timer for 1.5 seconds to give the player a timeout on digging
	if (pData.throttled) pData.throttledTimer++

	if (pData.throttledTimer >= 40) {
		success(event, `你可以再挖一次！`)
		pData.throttledTimer = 0
		pData.throttled = false
		pData.digging = 0
	}
})
