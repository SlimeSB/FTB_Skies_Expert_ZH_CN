// priority: 800
const frogEvent = {
  name: "ftbskies:frogs",
  displayName: "Frog and Squids",
  description: "Toggles the Frog and Squids Event. Frogs and Squids will spawn in water.",
  chance: 0.3,
  minDistance: 1,
  maxDistance: 15,
  size: 0,
  checkBlocks: ["minecraft:water"],
  requireBlockBelow: false,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,


  execute(event, player, location) {
    const level = player.getLevel();
    let creature = "minecraft:frog";

    if (getRandomInt(0, 100) < 50) {
      //default frog
      player.tell([`Ribbit.`]);
    } else {
      player.tell([`*SPLASH*`]);
      if (getRandomInt(0, 100) < 90) creature = "minecraft:squid";
      else creature = "minecraft:glow_squid";
    }

    const entity = level.createEntity(creature);
    entity.setPosition(location.pos.x + 0.5, location.pos.y + 0.5, location.pos.z + 0.5);

    entity.spawn();
  },
};
