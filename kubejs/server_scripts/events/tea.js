// priority: 800
const teaEvent = {
  name: "ftbskies:tea",
  displayName: "Tea",
  description: "Toggles the Tea Event. Server will get a cup of tea.",
  chance: 0.1,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    player.tell(["[Server]: getting a cup of tea, don't break the game!"]);
    Utils.server.scheduleInTicks(20, (_) => {
      player.persistentData.timer = Math.floor(player.getServer().persistentData.eventSettings.timeCooldown * 0.8); //lower their event timer instead of a full reset
    });
  },
};
