// priority: 99
const itemsAndPages = [
	['mekanism:jetpack_armored', 'Can be traded from Armorer villagers'],
	[
		['productivebees:sturdy_bee_cage', 'productivebees:spawn_egg_quarry_bee'],
		'Can be traded from Bee Keeper villagers.',
	],
	['ars_nouveau:source_berry', 'Can be traded from level two cleric villagers.'],
	[
		['botania:ender_air_bottle', 'minecraft:dragon_breath', 'minecraft:ender_pearl'],
		'Can be traded from level four Cleric Villagers.',
	],
	['cyclic:chorus_flight', 'Can be traded from level five Cleric Villagers.'],
	[['minecraft:echo_shard'], 'Can be traded from a Shady Wizard Villager.'],
	[
		['minecraft:totem_of_undying'],
		'Can be traded from a level 2 Cleric Lunarian Trader on the Moon.',
	],
	[
		['industrialforegoing:mob_imprisonment_tool', 'mekanism:atomic_disassembler'],
		'Can be traded from a Toolsmith Villager.',
	],
	[
		'ftbskies:eye_of_legend_end',
		'Automatically transforms when the Eye of Legend is in the End.',
	],
	[
		'ftbskies:eye_of_legend_nether',
		'Automatically transforms when the Eye of Legend is in the Nether.',
	],
	[['ftbskies:rock', 'ftbskies:soil'], 'Sneak right-click a Grass or Dirt blocks.'],
	['tetra:hammer_base', 'Purchased from tier 5 Armorer villagers.'],
	['tetra:thermal_cell', 'Bartered from Piglins.'],
	['minecraft:pointed_dripstone', 'Purchased from tier 3 Mason Villagers.'],
	['ars_nouveau:warp_scroll', 'Traded from level 2 Lunarian Librarians.'],
	['minecraft:redstone', 'First obtained by killing witches from an endless witch gateway.'],
	[
		'pneumaticcraft:spawner_core',
		"When held in the offhand, and a mob is killed, it will become that mob's spawn core.",
	],
	['pneumaticcraft:pcb_blueprint', 'Can be traded from an engineer (Charging Station Job).'],
	[
		'elementalcraft:water_shard',
		"If you're struggling for water shards, the cyclic fisher can catch fish which you can eject from a dispenser to turn back into fish mobs. Once you kill them, they have a chance to drop water shards.",
	],
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
		'mekanismgenerators:advanced_solar_generator',
		'Does not produce FE, for thermal energy only.',
	],
]

const traderItems = [
	'thermal:invar_coin',
	'thermal:electrum_coin',
	'thermal:signalum_coin',
	'thermal:lumium_coin',
	'thermal:enderium_coin',
	'mob_grinding_utils:gm_chicken_feed_cursed',
	'mob_grinding_utils:nutritious_chicken_feed',
]

JEIEvents.information(event => {
	for (let item of traderItems) {
		event.addItem(item, 'Can be traded from a Wandering Trader.')
	}
	for (let [item, info] of itemsAndPages) {
		event.addItem(item, info)
	}
})
