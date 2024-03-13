// priority: 800
const teaEvent = {
  name: "ftbskies:tea",
  displayName: "茶水",
  description: "开关茶水事件。服务器将得到一杯茶",
  chance: 0.1,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    player.tell(["[Server]: 喝杯茶，别破坏了游戏！"]);
    Utils.server.scheduleInTicks(20, (_) => {
      player.persistentData.timer = Math.floor(player.getServer().persistentData.eventSettings.timeCooldown * 0.8); //lower their event timer instead of a full reset
    });
  },
};
