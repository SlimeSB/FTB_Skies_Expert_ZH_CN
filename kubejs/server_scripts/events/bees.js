// priority: 800
const lootbeeEvent = {
  name: "ftbskies:bees",
  displayName: "战利品蜜蜂",
  description: "开关蜜蜂战利品事件。战利品蜜蜂会掉落各种物品！",
  chance: 0.4,
  minDistance: 2,
  maxDistance: 15,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  itemDespawnTime: 400,
  stage: null,          // stage to gate the event
  mode: "stage",         // time or stage
  lootStages: {         // Stage to gate the loot tables
    table1: null,
    table2: "lootstage2",
    table3: "lootstage3",
    table4: "lootstage4"
  },
  disableStage: null,


  lootTable: {
    table1: [
      { entry: "ftbdripper:dripper", weight: 10 },
      { entry: "thermal:upgrade_augment_1", weight: 10 },
      { entry: "ironchest:gold_chest", weight: 10 },
      { entry: "minecraft:copper_ingot", weight: 25 },
      { entry: "botania:cyan_mystical_flower", weight: 15 },
      { entry: "botania:white_mystical_flower", weight: 15 },
      { entry: "create:andesite_alloy", weight: 15 },
      { entry: "bhc:red_heart", weight: 20 },
      { entry: "artifacts:superstitious_hat", weight: 10 },
      { entry: "energeticsheep:energetic_sheep_spawn_egg", weight: 35 },
      { entry: "minecraft:egg", weight: 60 },
    ],
    table2: [
      { entry: "thermal:upgrade_augment_2", weight: 10 },
      { entry: "productivebees:upgrade_simulator", weight: 15 },
      { entry: "laserio:card_fluid", weight: 15 },
      { entry: "laserio:card_item", weight: 15 },
      { entry: "laserio:card_energy", weight: 15 },
      { entry: "ironchest:crystal_chest", weight: 10 },
      { entry: "minecraft:trident", weight: 15 },
      { entry: "minecraft:ender_pearl", weight: 25 },
      { entry: "bhc:yellow_heart", weight: 20 },
      { entry: "minecraft:turtle_egg", weight: 30 },
    ],
    table3: [
      { entry: "refinedstorage:4k_storage_part", weight: 10 },
      { entry: "ae2:cell_component_4k", weight: 10 },
      { entry: "cyclic:soulstone", weight: 15 },
      { entry: "hexerei:budding_selenite", weight: 15 },
      { entry: "tetra:planar_stabilizer", weight: 20 },
      { entry: "tetra:thermal_cell", weight: 20 },
      { entry: "tetra:combustion_chamber", weight: 20 },
      { entry: "tetra:lubricant_dispenser", weight: 20 },
      { entry: "thermal:upgrade_augment_3", weight: 20 },
      { entry: "bhc:green_heart", weight: 20 },
      { entry: "apotheosis:boss_summoner", weight: 30 },
    ],
    table4: [
      { entry: "apotheosis:mythic_material", weight: 15 },
      { entry: "hexerei:budding_selenite", weight: 15 },
      { entry: "compactmachines:machine_giant", weight: 20 },
      { entry: "tetra:thermal_cell", weight: 20 },
      { entry: "mekanism:ultimate_tier_installer", weight: 20 },
      { entry: "bhc:blue_heart", weight: 20 },
      { entry: "apotheosis:boss_summoner", weight: 30 },
    ],
  },
  execute(event, player, location) {
    let level = player.getLevel();
    console.log(level)
    let pData = player.persistentData;
    console.log(pData)
    pData.lootBeeCount = pData.lootBeeCount ?? 0;
    console.log(pData.lootBeeCount)

    player.tell([
      `战利品蜜蜂生成在 X: ${location.pos.x}, Y: ${location.pos.y}, Z: ${location.pos.z}`,
      `\n快点，在它消失之前拿到战利品！`,
    ]);

    let selectedLootTable;
    switch (this.mode) {
      case "time": {
        if (pData.lootBeeCount >= 60) {
          selectedLootTable = this.lootTable.table4;
        } else if (pData.lootBeeCount >= 40) {
          selectedLootTable = this.lootTable.table3;
        } else if (pData.lootBeeCount >= 20) {
          selectedLootTable = this.lootTable.table2;
        } else if (pData.lootBeeCount >= 0) {
          selectedLootTable = this.lootTable.table1;
        }
        pData.lootBeeCount++;
      }
      case "stage": {
        if (player.stages.has(this.lootStages.table4)) {
          selectedLootTable = this.lootTable.table4;
        } else if (player.stages.has(this.lootStages.table3)) {
          selectedLootTable = this.lootTable.table3;
        } else if (player.stages.has(this.lootStages.table2)) {
          selectedLootTable = this.lootTable.table2;
        } else if
          (
          !player.stages.has(this.lootStages.table4) &&
          !player.stages.has(this.lootStages.table3) &&
          !player.stages.has(this.lootStages.table2)
        ) {
          selectedLootTable = this.lootTable.table1;
        }
        pData.lootBeeCount++;
      }
    }





    const entity = level.createEntity("minecraft:bee");
    entity.setPosition(location.pos.x + 0.5, location.pos.y + 0.5, location.pos.z + 0.5);
    entity.glowing = true;
    entity.persistentData.maxRounds = Math.floor(Math.random() * (10 - 3 + 1) + 3);
    entity.persistentData.currentRound = 0;

    entity.spawn();

    Utils.server.scheduleInTicks(800, (callback) => {
      this.cycle(Utils.server, entity, player, level, selectedLootTable, location.locationInfo);
    });
  },
  cycle(server, entity, player, level, lootTable, location) {
    if (entity.persistentData.currentRound < entity.persistentData.maxRounds && entity.alive) {
      entity.persistentData.currentRound++;
      giveStink(level, entity);
      server.scheduleInTicks(60, (callback) => {
        var itemEnity = level.createEntity("item");
        itemEnity.item = Ku.Lists.getEntryBasedOnWeight(lootTable);
        itemEnity.setPosition(entity.x, entity.y, entity.z);
        itemEnity.age = 6000 - this.itemDespawnTime;
        itemEnity.glowing = true;
        itemEnity.spawn();

        this.cycle(server, entity, player, level, lootTable, location);
      });
    } else {
      if (entity.alive) {
        entity.glowing = false;
      }
    }
  },
};

function giveStink(level, entity) {
  let aabb = AABB.of(
    entity.x - lootbeeEvent.maxDistance,
    entity.y - lootbeeEvent.maxDistance,
    entity.z - lootbeeEvent.maxDistance,
    entity.x + lootbeeEvent.maxDistance,
    entity.y + lootbeeEvent.maxDistance,
    entity.z + lootbeeEvent.maxDistance
  );
  let surroundingEntities = level.getEntitiesWithin(aabb);
  let players = surroundingEntities.filter((entity) => entity.isPlayer());
  players.forEach((player) => {
    player.potionEffects.add("evasiveitems:stinky", 15 * 20, 1);
  });
}
