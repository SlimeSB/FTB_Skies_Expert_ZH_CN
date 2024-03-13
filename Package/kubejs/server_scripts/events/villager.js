// priority: 800
const villagerEvent = {
  name: "ftbskies:villager",
  displayName: "村民",
  description: "开关村民事件。如果没有村民，该事件有几率生成一个村民",
  chance: 0.15,
  minDistance: 2,
  maxDistance: 15,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    const level = player.getLevel();

    const checkAmountOfVillagers = new Ku.Level(level).findEntitiesWithinRadius("minecraft:villager", location.pos, 64);

    if (checkAmountOfVillagers.length < 2) {
      player.tell([
        `一位来访的村民来到了，它在 X: ${location.pos.x}, Y: ${location.pos.y}, Z: ${location.pos.z}`,
      ]);
      player.tell([`村民: 嘿，这地方真不错，我想我会留下来的！`]);

      let entityVillager = level.createEntity("minecraft:villager");
      entityVillager.setPosition(location.pos.x + 0.5, location.pos.y + 0.5, location.pos.z + 0.5);

      entityVillager.spawn();
    }
  },
};
