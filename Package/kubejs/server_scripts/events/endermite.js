// priority: 800
const endermiteEvent = {
  name: "ftbskies:endermite",
  displayName: "末影螨",
  description: "开关末影螨占据事件。末影螨会占据方块",
  chance: 0.7,
  minDistance: 1,
  maxDistance: 24,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,
  itemDespawnTime: 400,
  stage: "seen_endermite",
  disableStage: null,

  execute(event, player, location, name) {
    const level = player.getLevel();

    //console.log('Endermite Event Triggered.')
    let amethyst_block = checkForBlockInCube("minecraft:budding_amethyst", level, 24, player.x, player.y, player.z);

    if (amethyst_block == "") {
      //console.log('Endermite possession event was chosen but no amethyst block was found in range.')
      //no diamond block, reset event and continue
      Utils.server.scheduleInTicks(20, (_) => {
        player.persistentData.timer = player.getServer().persistentData.eventSettings.timeCooldown; //reset their event timer since no event was able to trigger
      });
    } else {
      let blockLoc = amethyst_block.pos;

      player.tell([`紫水晶里有东西在蠕动...`]);

      let endermite = level.createEntity("occultism:possessed_endermite");
      if(name) {
        entity.setCustomName(name)
        entity.setCustomNameVisible(true)
      }
      endermite.glowing = true;
      endermite.setPosition(blockLoc.x + 0.25, blockLoc.y + 1.5, blockLoc.z + 0.25);
      endermite.spawn();
      let nbt = endermite.nbt;
      nbt.DespawnDelay = NBT.i(48000);
      endermite.mergeNbt(nbt);
    }
  },
};
