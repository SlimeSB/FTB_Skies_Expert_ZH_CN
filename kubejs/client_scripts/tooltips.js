const toolTips = [
	['forcecraft:force_shears', '能为大多数动物剪毛！'],
	['ftbskies:mycelium_spores', '右键泥土，将其转化为菌丝'],
	['ftbskies:warped_nylium_spores', '右键下界岩，将其转化为诡异菌岩'],
	['ftbskies:crimson_nylium_spores', '右键下界岩，将其转化为绯红菌岩'],
	['ftbskies:eye_of_legend', '向最近的天空村庄方向移动'],
	['ftbskies:eye_of_legend_end', '向最近的末地城方向移动'],
	['ftbskies:eye_of_legend_nether', '向最近的下界村庄方向移动'],
	['minecraft:end_portal_frame', '空手 Shift 右键拾取 \n不能放置在大厅或下界维度中'],
	['minecraft:wither_rose', '可与猪灵交易获得'],
	['minecraft:strider_spawn_egg', '可与猪灵交易获得'],
	['nethersdelight:hoglin_hide', '可与猪灵交易获得'],
	['create:blaze_cake', '可与猪灵交易获得'],
	['productivebees:spawn_egg_nomad_bee', '可与猪灵交易获得'],
	['nethersdelight:propelplant_cane', '可与猪灵交易获得'],
	['wstweaks:fragment', '可与猪灵交易获得'],
	['minecraft:blaze_rod', '可与猪灵交易获得或与村民交易获得'],
	['minecraft:amethyst_shard', '可与猪灵交易获得'],
	['minecraft:ender_pearl', '可与猪灵交易获得'],
	['tetra:thermal_cell', '可与猪灵交易获得'],
	['minecraft:crying_obsidian', '可与猪灵交易获得'],
	['ftbskies:mobfarm_deployer', '使用方法请查看 JEI 信息'],
	['supplementaries:ash', '仅限高炉！'],
	['occultism:storage_controller', '警告：如果内含大量物品，则可能导致数据丢失或 NBT 溢出'],
	['ars_nouveau:warp_scroll', '可从二级暗影导师处获得'],
	['minecraft:redstone', '首先得从女巫传送门击杀女巫获得'],
	[['minecraft:totem_of_undying'], '可从月球上的二级月球牧师处交易获得'],
	['pneumaticcraft:pcb_blueprint', '可与工程师交易获得 (工作方块为：充气站)'],
	[['ftbskies_companion:liquid_crystallizer'], '需要魔力和应力才能工作'],
	[['quark:bottled_cloud'], '可在特定的 Y 轴获得 [192 to 195].'],
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
	['tropicraft:coconut_chunk', '使用剑破坏椰子获得。椰子可以通过种植棕榈树获得'],
	['mekanismgenerators:advanced_solar_generator', '不产生 FE，只提供热力能量'],
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
		Text.of('右键激活').gray(),
		Text.of('Shift 右键锁定或解锁位置').gray(),
		Text.of('锁定时右键可放置结构').gray(),
		Text.of('左键停用').gray(),
	])
	toolTips.forEach(tip => e.add(tip[0], Text.gold(tip[1])))
})
