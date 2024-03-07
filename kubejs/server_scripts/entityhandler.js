EntityEvents.spawned("minecraft:eye_of_ender", (event) => {
  const { entity, server } = event;
  let dimension = entity.level.dimension;
  entity.customName = "Eye of Legend";
  server.scheduleInTicks(4 * 20, (_) => {
    const { x, y, z } = entity;
    entity.kill();
    let command = `execute in ${dimension} run particle minecraft:reverse_portal ${Math.floor(x)} ${Math.floor(
      y
    )} ${Math.floor(z)} 0 0 0 0.8 50 force`;
    server.runCommandSilent(command);
  });
});

//custom spawning rules
EntityEvents.spawned((event) => {
  const { entity, server } = event;
  let dimension = entity.level.dimension;
  switch (event.entity.type) {
    case "alexsmobs:farseer":
    case "alexsmobs:murmur":
      if (dimension != "minecraft:the_end") event.cancel();
      break;
    default:
      break;
  }
});


// Kill Mobs when below y=0
const mobsToKill = ["minecraft:bee", "productivebees:", "ars_nouveau:whirlisprig", "minecraft:bat"];
LevelEvents.tick((event) => {
  const { level, server } = event;
  if (!level.dimension.toString().includes("ftbteamdimensions:team")) return;

  let lPdata = level.persistentData;

  if (!lPdata.Timer) lPdata.Timer = 0;
  lPdata.Timer++;
  if (lPdata.Timer % 100 != 0) return;
  lPdata.Timer = 0;

  let entities = level.getEntities();

  let mobs;
  mobsToKill.forEach((filter) => {
    mobs = entities.filter((entity) => entity.type.toString().includes(filter));
    if (mobs.length == 0) return;

    mobs.forEach((mob) => {
      if (mob.y < 0) {
        mob.kill();
        console.log("'在' + mob.x + ' ' + mob.y + ' ' + mob.z + '击杀蜜蜂');
      }
    });
  });
});

EntityEvents.death(event => {
  const { source, entity, level } = event;
  if (source.type != 'reaper') return
  let random = getRandomInt(1, 100);
  if (random < 15) {
    level.getBlock(entity.x, entity.y + 1, entity.z).popItem('spirit:soul_powder');
  }
})

// Delightful Dirt -> Grass
EntityEvents.spawned((event) => {
  const { entity, server } = event;
  const level = entity.getLevel();
  const pos = entity.blockPosition().below();

  if (entity.isAnimal() && level.getBlockState(pos).getBlock().getId() === "mob_grinding_utils:delightful_dirt") {
    if (Math.random() < 0.05) {
      level.setBlockAndUpdate(pos, Blocks.GRASS_BLOCK.defaultBlockState());
    }
  }
});

// Canceling Lightning Bolts at the Spawn Hub
EntityEvents.spawned((event) => {
  const { entity, server } = event;
  let dimension = entity.level.dimension;
  switch (event.entity.type) {
    case "minecraft:lightning_bolt":
      if (dimension = "minecraft:overworld") event.cancel();
      break;
    default:
      break;
  }
});
