// priority: 800
const DyeColor = Java.loadClass("net.minecraft.world.item.DyeColor")
const Wololo = {
    name: "ftbskies:wololo",
    displayName: "乌拉拉",
    description: "开关乌拉拉事件，将你的一只羊随机变成蓝色或红色。",
    chance: 0.1,
    stage: null,
    disableStage: null,

    size: 0,
    minDistance: 1,
    maxDistance: 24,

    checkBlocks: ["minecraft:air"],
    requireBlockBelow: false,


    execute(event, player, location) {
        let level = player.getLevel();
        let server = Utils.server;

        let kuLevel = new Ku.Level(level);
        let pos = player.blockPosition();
        let entities = kuLevel.findEntitiesWithinRadius("minecraft:sheep", pos, 128)
        if (entities.length == 0) return;

        let blueSheep = []
        let redSheep = []
        let otherSheep = []
        entities.forEach((entity) => {
            let color = entity.getColor();
            switch (color) {
                case DyeColor.BLUE: blueSheep.push(entity); break;
                case DyeColor.RED: redSheep.push(entity); break;
                default: otherSheep.push(entity); break;
            }
        });

        let sheep = otherSheep[0] || entities[Math.floor(Math.random() * entities.length)];
        let color = Math.random() > 0.5 ? DyeColor.RED : DyeColor.BLUE;
        if (blueSheep.length > redSheep.length) {
            sheep = otherSheep[Math.floor(Math.random() * otherSheep.length)] || blueSheep[Math.floor(Math.random() * blueSheep.length)];
            color = DyeColor.RED;

        } else if (redSheep.length > blueSheep.length) {
            sheep = otherSheep[Math.floor(Math.random() * otherSheep.length)] || redSheep[Math.floor(Math.random() * redSheep.length)];
            color = DyeColor.BLUE;
        }

        sheep.setColor(color);
        sheep.playSound('minecraft:entity.evoker.prepare_wololo', 1, 1)
        Utils.server.runCommandSilent(`execute in ${level.dimension} run particle minecraft:ambient_entity_effect ${sheep.x} ${sheep.y + 1} ${sheep.z} 0 0 0 1 100 force`)
        player.sendSystemMessage("~ Wololo ~", true)
    }
}