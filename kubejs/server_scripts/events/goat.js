// priority: 800
const Goat = Java.loadClass("net.minecraft.world.entity.animal.goat.Goat");
const GoatAI = Java.loadClass("net.minecraft.world.entity.animal.goat.GoatAi");

const goatEvent = {
  name: "ftbskies:goat",
  displayName: "山羊",
  description: "开关山羊事件。在你附近随机生成一只量子山羊",
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
    console.log('警告玩家' + player.id + '山羊近在咫尺');
    player.sendSystemMessage({ text: "⚠ " + '您听到附近有窸窸窣窣的声音，好像有什么生物正在靠近...', color: "red" }, true);

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
            message(target, "你被山羊撞了！")
            Utils.server.scheduleInTicks(40, () => { message(target, "山羊事件现在可以在任务书中禁用！") })
        }
    }
})