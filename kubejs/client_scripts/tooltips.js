const toolTips = [
  ["forcecraft:force_shears", "能为大多数动物剪毛！"],
  ["ftbskies:mycelium_spores", "右击泥土，将其转化为菌丝"],
  ["ftbskies:warped_nylium_spores", "右击下界岩，将其转化为诡异菌岩"],
  ["ftbskies:crimson_nylium_spores", "右击下界岩，将其转化为绯红菌岩"],
  ["ftbskies:eye_of_legend", "向最近的天空村庄方向移动"],
  ["cyclic:placer", "因可无视区块声明而被禁用"],
  ["ftbskies:eye_of_legend_end", "向最近的末地城方向移动"],
  ["tropicraft:pineapple", "放置并种植一个菠萝，以获得多个菠萝"],
  ["thermal:blizz_powder", "可通过击杀暴雪人获得，您可以用灵魂基座召唤暴雪人。请在 JEI 中查看它的用途，以获取仪式配方"],
  ["ftbskies:eye_of_legend_nether", "向最近的下界村庄方向移动"],
  ["minecraft:end_portal_frame", "空手 Shift 右击拾取 \n 只能在霜原上放置"],
  ["ftbskies:mobfarm_deployer", "使用方法请查看 JEI 信息"],
  ["supplementaries:ash", "仅限高炉！"],
  ["occultism:storage_controller", "警告：如果内含大量物品，则可能导致数据丢失或 NBT 溢出"],
  ["ars_nouveau:warp_scroll", "可从二级暗影导师处获得"],
  ["minecraft:redstone", "首先得从女巫传送门击杀女巫获得"],
  [["minecraft:totem_of_undying"], "可从月球上的二级月球牧师处交易获得"],
  ["pneumaticcraft:pcb_blueprint", "可与工程师交易获得 (工作方块为：充气站)"],
  [["ftbskies_companion:liquid_crystallizer"], "需要魔力和应力才能工作"],
  [["quark:bottled_cloud"], "可在特定的 Y 轴获得 [192 to 195]."],
  [
    [
      "immersiveengineering:bucket_wheel",
      "immersiveengineering:diesel_generator",
      "immersiveengineering:excavator",
      "immersiveengineering:fermenter",
      "immersiveengineering:lightning_rod",
      "immersiveengineering:refinery",
      "immersiveengineering:squeezer",
      "immersiveengineering:mixer",
    ],
    "在此整合包中禁用，结构不会成型",
  ],
  [
    "tropicraft:coconut_chunk",
    "使用剑破坏椰子获得。椰子可以通过种植棕榈树获得",
  ],
  ['mekanismgenerators:advanced_solar_generator', '不产生 FE，只提供热力能量'],
  ['createteleporters:quantum_fluid_bucket', '不稳定，无法装桶。使用流体漏斗将其转移到储罐中'],
  ['pedestals:upgrade_pedestal_attacker', '功能类似杀手乔，但在基座上！'],
  ['spirit:soul_crystal', '需要 4 级灵魂吞噬结构！'],
  ['reaper:reaper_generator', '合成配方需要不同的灵魂吞噬结构！更多信息请查看 JEI'],
  [
    [
      'mekanism:basic_smelting_factory', 
      'mekanism:basic_enriching_factory', 
      'mekanism:basic_crushing_factory', 
      'mekanism:basic_compressing_factory', 
      'mekanism:basic_combining_factory', 
      'mekanism:basic_purifying_factory', 
      'mekanism:basic_injecting_factory', 
      'mekanism:basic_infusing_factory', 
      'mekanism:basic_sawing_factory', 
      'mekanism:advanced_smelting_factory', 
      'mekanism:advanced_enriching_factory', 
      'mekanism:advanced_crushing_factory', 
      'mekanism:advanced_compressing_factory', 
      'mekanism:advanced_combining_factory', 
      'mekanism:advanced_purifying_factory', 
      'mekanism:advanced_injecting_factory', 
      'mekanism:advanced_infusing_factory', 
      'mekanism:advanced_sawing_factory', 
      'mekanism:elite_smelting_factory', 
      'mekanism:elite_enriching_factory', 
      'mekanism:elite_crushing_factory', 
      'mekanism:elite_compressing_factory', 
      'mekanism:elite_combining_factory', 
      'mekanism:elite_purifying_factory', 
      'mekanism:elite_injecting_factory', 
      'mekanism:elite_infusing_factory', 
      'mekanism:ultimate_enriching_factory', 
      'mekanism:ultimate_crushing_factory', 
      'mekanism:ultimate_compressing_factory', 
      'mekanism:ultimate_combining_factory', 
      'mekanism:ultimate_purifying_factory', 
      'mekanism:ultimate_injecting_factory', 
      'mekanism:ultimate_infusing_factory', 
      'mekanism:ultimate_sawing_factory'
    ],
    "⚠  安装工厂安装器获取",
  ],
  ["create:creative_blaze_cake", "⚠ 使用时会消耗掉 ⚠"],
  ["ftbskies:lightly_magical_imbued_soil", "ⓘ 在园艺玻璃罩中可增加 25% 的生长速度"],
  ["ftbskies:magical_imbued_soil", "ⓘ 在园艺玻璃罩中可增加 50% 的生长速度"],
  ["ftbskies:densely_magical_imbued_soil", "ⓘ 在园艺玻璃罩中可增加 75% 的生长速度"],

  ["create:water_wheel", "⚠ 产生少量应力 ⚠"],
  ["create:windmill_bearing", "⚠ 产生少量应力 ⚠"],
  ["thermal:raw_nickel", "ⓘ 与流浪商人交易获得"],
  [
    [
      "minecraft:wither_rose",
      "minecraft:strider_spawn_egg",
      "nethersdelight:hoglin_hide",
      "create:blaze_cake",
      "productivebees:spawn_egg_nomad_bee",
      "nethersdelight:propelplant_cane",
      "wstweaks:fragment",
      "minecraft:amethyst_shard",
      "minecraft:ender_pearl",
      "tetra:thermal_cell",
      "minecraft:crying_obsidian",
      'forcecraft:force_log', 
      'cyclic:experience_food', 
      'minecraft:spectral_arrow', 
      'archers_paradox:shulker_arrow', 
      'minecraft:nether_brick', 
      'minecraft:music_disc_pigstep', 
      'minecraft:hoglin_spawn_egg', 
      'forcecraft:gold_chu_jelly', 
      'forcecraft:fortune_cookie', 
      'apotheosis:gem_dust', 
      Item.of('productivebees:spawn_egg_configurable_bee', '{EntityTag:{type:"productivebees:ghostly"}}'), 
      'minecraft:gilded_blackstone', 'cyclic:chorus_spectral', 
      Item.of('ceramicbucket:ceramic_bucket', '{Fluid:{Amount:1000,FluidName:"industrialforegoing:meat"}}')
    ],
    "ⓘ 与猪灵交易获得",
  ],
  ["minecraft:blaze_rod", "ⓘ 与猪灵或牧师村民交易获得"],
  ["easy_piglins:barterer", "ⓘ 在 JEI 中搜索 'Bartered' 查看物品清单"],
]

ItemEvents.tooltip((e) => {
  let tooltipNBT = (itemNoNBT, itemWithNBT, theText) => {
    e.addAdvanced(itemNoNBT, (item, advanced, text) => {
      if (item.test(itemWithNBT)) {
        if (Array.isArray(theText)) {
          theText.forEach(function (line, index) {
            text.add(index + 1, line);
          });
        } else {
          text.add(1, theText);
        }
      }
    });
  };
  e.add(/ftbskies:.*deployer/, [
		Text.of("右击激活").gray(),
		Text.of("Shift 右击锁定或解锁位置").gray(),
		Text.of("锁定时右击可放置结构").gray(),
		Text.of("左键点击停用").gray(),
  ]);
  toolTips.forEach((tip) => e.add(tip[0], Text.gold(tip[1])));
});
