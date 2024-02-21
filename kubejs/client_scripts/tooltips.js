const toolTips = [
	['forcecraft:force_shears', 'Capable of shearing most animals!'],
	['ftbskies:mycelium_spores', 'Right click onto dirt to transform into mycelium'],
	[
		'ftbskies:warped_nylium_spores',
		'Right click onto netherrack to transform into warped nylium',
	],
	[
		'ftbskies:crimson_nylium_spores',
		'Right click onto netherrack to transform into crimson nylium',
	],
	['ftbskies:eye_of_legend', 'Moves in the direction of the nearest Sky Village'],
	['ftbskies:eye_of_legend_end', 'Moves in the direction of the nearest End City'],
	[
		'ftbskies:eye_of_legend_nether',
		'Moves in the direction of the nearest Nether Sky Village',
	],
	[
		'minecraft:end_portal_frame',
		'Shift-Right click with an empty hand to pickup\nCannot be placed in the lobby or nether dimensions',
	],
	['minecraft:wither_rose', 'Can be bartered from piglins'],
	['minecraft:strider_spawn_egg', 'Can be bartered from piglins'],
	['nethersdelight:hoglin_hide', 'Can be bartered from piglins'],
	['create:blaze_cake', 'Can be bartered from piglins'],
	['productivebees:spawn_egg_nomad_bee', 'Can be bartered from piglins'],
	['nethersdelight:propelplant_cane', 'Can be bartered from piglins'],
	['wstweaks:fragment', 'Can be bartered from piglins'],
	['minecraft:blaze_rod', 'Can be bartered from piglins or traded from cleric villagers'],
	['minecraft:amethyst_shard', 'Can be bartered from piglins'],
	['minecraft:ender_pearl', 'Can be bartered from piglins'],
	['tetra:thermal_cell', 'Can be bartered from piglins'],
	['minecraft:crying_obsidian', 'Can be bartered from piglins'],
	['ftbskies:mobfarm_deployer', 'See JEI Information for useage'],
	['supplementaries:ash', 'Blast furnace only.'],
	[
		'occultism:storage_controller',
		'WARNING: Breaking with large amount of items inside may potentially cause data loss or NBT overflow.',
	],
	['ars_nouveau:warp_scroll', 'Tradeable from level 2 Lunarian Librarians'],
	['minecraft:redstone', 'First obtained by killing witches from an endless witch gateway.'],
	[
		['minecraft:totem_of_undying'],
		'Can be traded from a level 2 Cleric Lunarian Trader on the Moon.',
	],
	['pneumaticcraft:pcb_blueprint', 'Can be traded from an engineer (Charging Station Job).'],
	[['ftbskies_companion:liquid_crystallizer'], 'Requires both Mana and Rotation to work.'],
	[['quark:bottled_cloud'], 'Can be made at a specific Y Level [192 to 195].'],
	[
		[
			'immersiveengineering:bucket_wheel',
			'immersiveengineering:diesel_generator',
			'immersiveengineering:excavator',
			'immersiveengineering:fermenter',
			'immersiveengineering:lightning_rod',
			'immersiveengineering:refinery',
			'immersiveengineering:squeezer',
		],
		'Disabled in this pack, will not form.',
	],
	[
		'tropicraft:coconut_chunk',
		"Untainted from using a sword on a coconut. Coconut can's be obtained by growing a palm trees",
	],
	[
		'mekanismgenerators:advanced_solar_generator',
		'Does not produce FE, for thermal energy only.',
	],
]

ItemEvents.tooltip(e => {
	let tooltipNBT = (itemNoNBT, itemWithNBT, theText) => {
		e.addAdvanced(itemNoNBT, (item, advanced, text) => {
			if (item.test(itemWithNBT)) {
				if (Array.isArray(theText)) {
					theText.forEach(function (line, index) {
						text.add(index + 1, line)
					})
				} else {
					text.add(1, theText)
				}
			}
		})
	}
	e.add(/ftbskies:.*deployer/, [
		Text.of('Right click to activate.').gray(),
		Text.of('Shift right click to lock or unlock Position').gray(),
		Text.of('Right click when locked to place Structure').gray(),
		Text.of('Left click to deactivate').gray(),
	])
	toolTips.forEach(tip => e.add(tip[0], Text.gold(tip[1])))
})
