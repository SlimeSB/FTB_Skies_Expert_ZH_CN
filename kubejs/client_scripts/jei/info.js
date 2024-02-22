// priority: 99
const itemsAndPages = [
	['mekanism:jetpack_armored', '可从盔甲匠村民处交易获得'],
	[
		['productivebees:sturdy_bee_cage', 'productivebees:spawn_egg_quarry_bee'],
		'可从养蜂人村民处交易获得',
	],
	['ars_nouveau:source_berry', '可从二级牧师村民处交易获得'],
	[
		['botania:ender_air_bottle', 'minecraft:dragon_breath', 'minecraft:ender_pearl'],
		'可从四级牧师村民处交易获得',
	],
	['cyclic:chorus_flight', '可从五级牧师村民处交易获得'],
	[['minecraft:echo_shard'], '可从暗影导师村民处交易获得'],
	[['minecraft:totem_of_undying'], '可从月球上的二级月球牧师处交易获得'],
	[
		['industrialforegoing:mob_imprisonment_tool', 'mekanism:atomic_disassembler'],
		'可从工具匠村民处交易获得',
	],
	['ftbskies:eye_of_legend_end', '当传奇之眼处于末地时自动转换'],
	['ftbskies:eye_of_legend_nether', '当传奇之眼在下界时自动转换'],
	[['ftbskies:rock', 'ftbskies:soil'], 'Shift 右键草地或泥土方块'],
	['tetra:hammer_base', '从五级盔甲匠村民处交易获得'],
	['tetra:thermal_cell', '与猪灵交易获得'],
	['minecraft:pointed_dripstone', '从三级石匠村民处交易获得'],
	['ars_nouveau:warp_scroll', '可从二级暗影导师处获得'],
	['minecraft:redstone', '首先得从女巫传送门击杀女巫获得'],
	['pneumaticcraft:spawner_core', '当副手上时，并有怪物被击杀时，它将成为该怪物的生成核心'],
	['pneumaticcraft:pcb_blueprint', '可与工程师交易获得 (工作方块为：充气站)'],
	[
		'elementalcraft:water_shard',
		'如果你正在为水元素碎片而苦恼, 循环的自动鱼栅可以捕到鱼，您可以将它们从发射器中射出，重新变成鱼类。 击杀它们，它们就有几率掉落水元素碎片',
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
		'在此整合包中禁用，结构不会成型',
	],
	[
		'mekanismgenerators:advanced_solar_generator',
		'不产生 FE，只提供热力能量',
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
		event.addItem(item, '可从流浪商人处交易获得')
	}
	for (let [item, info] of itemsAndPages) {
		event.addItem(item, info)
	}
})
