// priority: 800
const Goat = Java.loadClass("net.minecraft.world.entity.animal.goat.Goat");
const GoatAI = Java.loadClass("net.minecraft.world.entity.animal.goat.GoatAi");

const goatEvent = {
  name: "ftbskies:goat",
  displayName: "Goat",
  description: "Toggles the Goat Event. Spawns a random Quantum Goat near you",
  chance: 0.5,
  size: -1,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  itemDespawnTime: 400,
  stage: null,
  disableStage: "seen_goat",
  lootTable: {
    goatloot: [
      { entry: "rftoolsbase:dimensionalshard", weight: 10 },
      { entry: "minecraft:diamond", weight: 2 },
    ],
  },

  execute(event, player, location) {
    const level = player.getLevel();
    let entity = level.createEntity("minecraft:goat");
    console.log('Warning Player' + player.id + ' that a goat is near');
    player.sendSystemMessage({ text: "⚠ " + 'You hear some rustling nearby as if some creature is approaching...', color: "red" }, true);

    Utils.server.scheduleInTicks(140, () => {
      let goat = Goat(entity);
      goat.setPos(player.pos);
      goat.setCustomName("Quantum Goat");
      goat.setCustomNameVisible(true);
      goat.setScreamingGoat(true);
      goat.potionEffects.add("minecraft:invisibility", 10, 1, true, false);

      goat.spawn();

      let goatAi = new GoatAI();
      goatAi.updateActivity(goat);

      for (let i = 0; i < 80; i++) {
        goat.aiStep();
      }
      Utils.server.scheduleInTicks(120, () => {
          var itemEntity = level.createEntity("item");
          itemEntity.item = Ku.Lists.getEntryBasedOnWeight(this.lootTable.goatloot);
          itemEntity.setPosition(goat.x, goat.y, goat.z);
          itemEntity.age = 6000 - this.itemDespawnTime;
          itemEntity.glowing = true;
          itemEntity.spawn();        
        goat.discard();
      });
    });
  },
};
EntityEvents.hurt(event => {
    const { entity, target } = event;
  if (!target || !entity) return
    if (target.isPlayer() && entity.type == 'minecraft:goat') {
        if (!target.stages.has("seen_goat")) {
            target.stages.add("seen_goat")
            message(target, "You got hit by a Goat!")
            Utils.server.scheduleInTicks(40, () => { message(target, "Goat Event's can now be disabled in the Quest Book!") })
        }
    }
})