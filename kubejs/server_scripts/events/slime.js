// priority: 800
const slimeEvent = {
    name: "ftbskies:slime",
    displayName: "史莱姆",
    description: "开关史莱姆事件。在岛上生成随机大小的史莱姆",
    chance: 0.5,
    minDistance: 1,
    maxDistance: 15,
    size: 0,
    checkBlocks: ["minecraft:air"],
    requireBlockBelow: true,
    itemDespawnTime: 400,
    stage: null,
    disableStage: null,

    execute(event, player, location) {
        player.tell("Squish!")
        const level = player.getLevel();
        let entity = level.createEntity('minecraft:slime')
        entity.x = location.pos.x
        entity.y = location.pos.y
        entity.z = location.pos.z
        let size = getRandomInt(0, 3)
        let nbt = entity.nbt
        nbt.Size = size
        entity.nbt = nbt
        entity.spawn()
    },
};
