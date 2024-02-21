// priority: 800
const amethystEvent = {
  name: "ftbskies:amethyst",
  displayName: "Budding Amethyst",
  description: "Toggles the Amethyst Event. Diamond Blocks can convert into Budding Amethyst with this Event.",
  chance: 0.7,
  minDistance: 1,
  maxDistance: 24,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: false,
  itemDespawnTime: 400,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    const level = player.getLevel();

    if (player.stages.has("mana_steel_mesh")) {
      //console.log('Amethyst Event Triggered.')
      let diamond_block = checkForBlockInCube("minecraft:diamond_block", level, 24, player.x, player.y, player.z);

      if (diamond_block == "") {
        //console.log('Diamond conversion event was chosen but no diamond block was found in range.')
        //no diamond block, reset event and continue
        Utils.server.scheduleInTicks(20, (_) => {
          player.persistentData.timer = 10000; //reset their event timer since no event was able to trigger
        });
      } else {
        let blockLoc = diamond_block.pos;

        player.tell([`Your offerings have been accepted.`]);
        player.tell([`The sky fairy has blessed you.`]);

        let fairy = level.createEntity("ars_nouveau:familiar_whirlisprig");
        fairy.glowing = true;
        fairy.setPosition(blockLoc.x + 0.25, blockLoc.y + 2.5, blockLoc.z + 0.25);
        //console.log("setting diamond block@ " + blockLoc.x + ", " + blockLoc.y + ", " + blockLoc.z)
        fairy.spawn();
        diamond_block.set("minecraft:budding_amethyst");
        let nbt = fairy.fullNBT;
        nbt.DespawnDelay = NBT.i(48000);
        fairy.mergeFullNBT(nbt);
      }
    } else {
      //console.log('Amethyst Event Triggered but player is missing mana steel mesh requirement')
      player.persistentData.timer = Math.floor(player.getServer().persistentData.eventSettings.timeCooldown * 0.8); //reset their event timer since no event was able to trigger
    }
  },
};
