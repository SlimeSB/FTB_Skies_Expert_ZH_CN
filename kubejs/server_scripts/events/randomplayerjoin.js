// priority: 800
const playerJoin = {
    name: "ftbskies:playerjoin",
    displayName: "玩家加入",
    description: "",
    chance: 0.1,
    stage: null,
    disableStage: null,

    size: -1,
    minDistance: 1,
    maxDistance: 24,

    checkBlocks: ["minecraft:air"],
    requireBlockBelow: false,



    /**
     * Executes the event.
     * In here you can do almost everything you want.
     * 
     * @param {Event} event - The event object. limited use when triggering the event with the force command
     * @param {Player} player - The player object.
     * @param {Location} location - The location object.
     */
    execute(event, player, location) {
        let server = Utils.server;

        let randomName = randomNames[Math.floor(Math.random() * randomNames.length)];

        let randomLine;
        switch (randomName) {
            case "Herobrine": randomLine = "我在看着你..."; break;
            case "Dinnerbone": randomLine = "我是颠倒的！"; break;
            case "Slowpoke": randomLine = "Uhhh..."; break;
            case "Spiderman": randomLine = "我是你们的邻居蜘蛛侠！"; break;
            case "BuzzLightyear": randomLine = "无穷无尽！"; break;
            default: randomLine = randomLines[Math.floor(Math.random() * randomLines.length)];
        }

        server.tell(Text.of(`${randomName} 加入游戏`).yellow());
        Utils.server.scheduleInTicks(60, (_) => {
            server.tell(`<${randomName}> ${randomLine}`)
        });

        Utils.server.scheduleInTicks(120, (_) => {
            server.tell(Text.of(`${randomName} 退出游戏`).yellow())

        })
        player.persistentData.timer = 11000; //lower their event timer instead of a full reset

    }
}

const randomLines = [
    "等等... 这不是正确的服务器",
    "呜呜~弄错服务器了！",
    "我迷路了，谁能帮帮我？",
    "我不应该在这里",
]


const randomNames = [
    "TheonlyTazz",
    "Saereth",
    "Aaronhowser1",
    "Pikminman",
    "Slowpoke",
    "ErrorMikey",
    "Dinnerbone",
    "Herobrine",
    "Spiderman",
    "BuzzLightyear",
]