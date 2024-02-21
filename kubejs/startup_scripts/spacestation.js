const FTBTeamsApi = Java.loadClass("dev.ftb.mods.ftbteams.FTBTeamsAPI")
ForgeEvents.onEvent("net.minecraftforge.event.entity.player.PlayerEvent$PlayerChangedDimensionEvent", event => {
    global.postChangeDimension(event)
})


const orbits = [
    "ad_astra:earth_orbit",
    "ad_astra:glacio_orbit",
    "ad_astra:mars_orbit",
    "ad_astra:mercury_orbit",
    "ad_astra:moon_orbit",
    "ad_astra:venus_orbit"
]
const planets = [
    "ad_astra:glacio",
    "ad_astra:mars",
    "ad_astra:mercury",
    "ad_astra:moon",
    "ad_astra:venus"
]

let structureOffset = { x: -35, y: 118, z: -35 };
let structure = 'ad_astra:space_station'

global.postChangeDimension = (event) => {
    try {
        console.log(`Entity: ${event.entity.getName().string} changed dimension to: ${event.getTo().location().toString()}`)
        let player = event.entity
        if (!player.isPlayer()) return

        let toDimension = event.getTo().location().toString()

        player.getPersistentData().mountedLander = false

        let team = FTBTeamsApi.getPlayerTeam(player.uuid)
        if (team == null) return

        if (!isOrbit(toDimension) && !isPlanet(toDimension) && !toDimension.includes('ftbteamdimensions')) return

        Utils.server.runCommandSilent(`execute in ${toDimension} run forceload add 0 0`)
        let landerTeleported = false
        Utils.server.scheduleInTicks(20, () => {

            let entities = player.level.getEntities().filter(entity => entity.getType() == 'ad_astra:lander')
            entities.forEach(lander => {
                // console.log(`Entity: ${lander.getName().string} x: ${lander.x}, y: ${lander.y}, z: ${lander.z}`)
                if (lander.y < 590) return
                lander.teleportTo(player.x, player.y, player.z)
                // lander.getInventory().setItem(9, Item.of("ad_astra:launch_pad"))
                player.startRiding(lander, true)
                landerTeleported = true
                Utils.server.runCommandSilent(`execute in ${toDimension} run forceload remove 0 0`)
            })
            if (!landerTeleported) return

            if (isOrbit(toDimension)) {
                spawnSpaceStation(player, toDimension)
            }
        })

    } catch (e) {
        console.error(`Error in spacestation.js: ${e}`)
    }

}
function isOrbit(dimension) {
    return orbits.includes(dimension)
}
function isPlanet(dimension) {
    return planets.includes(dimension)
}


function spawnSpaceStation(player, dimension) {
    let team = FTBTeamsApi.getPlayerTeam(player.uuid)
    let teamId = team.getId().toString()
    let sPData = player.getServer().persistentData
    if (sPData.spacestation[teamId][dimension]) return

    let kuLevel = new Ku.Level(player.level);
    let blockPos = new BlockPos(player.x + structureOffset.x, structureOffset.y, player.z + structureOffset.z);
    kuLevel.spawnStructure(structure, blockPos);
    sPData.spacestation[teamId][dimension] = true
    console.log(`For Team: ${teamId} Dimension: ${dimension} Spacestation Created!`)
}



