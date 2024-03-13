// priority: 800
const chestEvent = {
  name: "ftbskies:chest",
  displayName: "宝箱怪",
  description: "开关宝箱怪事件。它们会从你的一个箱子中生成。宝箱怪死亡时会掉落奇异饰品",
  chance: 0.5,
  minDistance: 1,
  maxDistance: 15,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    const level = player.getLevel();
    const mimic = "artifacts:mimic";
    let failed = false;
    let chest_block = checkForBlockInCube("minecraft:chest", level, 15, player.x, player.y, player.z);
    if (chest_block == "") failed = true;

    if (failed) {
      console.log("Failed to find chest");
      Utils.server.scheduleInTicks(20, (_) => {
        player.persistentData.timer = Math.floor(player.getServer().persistentData.eventSettings.timeCooldown * 0.5); //reset their event timer by half since no event was able to trigger
      });
    } else {
      let blockLoc = chest_block.pos;
      let mimicEntity = level.createEntity(mimic);
      mimicEntity.setPosition(blockLoc.x, blockLoc.y + 1.25, blockLoc.z);
      mimicEntity.spawn();
      player.tell([
        `你的箱子成倍增加，新的箱子在 X: ${blockLoc.x}, Y: ${blockLoc.y}, Z: ${blockLoc.z}。 里面会有什么呢？`,
      ]);
    }
  },
};
