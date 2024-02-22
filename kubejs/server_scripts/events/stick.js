// priority: 800

const stickEvent = {
  name: "ftbskies:stick",
  displayName: "Stick",
  description: "Toggles the Stick Event. Players will receive a stick.",
  chance: 0.2,
  names: [
    "Do you ever feel like a plastic bag?",
    "SticKaren - it wants to speak to your manager",
    "I'm a stick, you're a stick!",
    "Branch out - grab a stick",
    "What's brown and sticky? - a stick!",
    "Stick of Truth",
    "Stick of lies",
    "Stick Lightyear - to infinitree and beyond!",
    "I am NOT Groot",
    "A stick is for life, not just for torches",
    "The stickiest of sticky sticks",
    "This could have been an anti-stick",
    "Stick it to the man!",
    "I'm sticking with you!",
    "No idea how I got here? I'm STUMPED too!",
    "I tried to quit Tree School but they said I couldn't leaf",
    "My bark is worse than my bite",
    "Tree of Impending Doom: Just add water",
    "Benestick Cumberbranch",
    "So versatile, you can STICK it anywhere!",
    "Lucky stick of unluckiness",
    "Holy stick of wood divining - 0 uses left",
    "Tree in training",
    "Loneztar's rod of tester beating",
    "Slowpoke101 doesn't want me",
  ],
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    player.tell([`Here's a stick! <3`]);
    Utils.server.scheduleInTicks(20, (_) => {
      player.persistentData.timer = Math.floor(player.getServer().persistentData.eventSettings.timeCooldown * 0.8); //lower their event timer instead of a full reset since this is a joke event
    });
    let chosenName = this.names[Math.floor(Math.random() * this.names.length)];
    player.give(
      Item.of("forcecraft:force_stick", {
        RepairCost: 0,
        display: { Name: '{"text":"' + chosenName + '"}' },
      })
    );
  },
};
