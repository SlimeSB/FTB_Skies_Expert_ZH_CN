//priority: 100
const ftbEvents = [
    amethystEvent,
    lootbeeEvent,
    chestEvent,
    crowEvent,
    endermiteEvent,
    frogEvent,
    slimeEvent,
    stickEvent,
    teaEvent,
    villagerEvent,
    wanderingtraderEvent,
    goatEvent
];

const defaultSettings = {
    timer: 0,  //initial timer
    timerDelay: 1000, //time in ticks for the event to trigger
    debug: false, //debug mode
    maxAttempts: 10, //max attempts to find a spawn location
    chance: 0.4, //chance of no event for the player this time
    timeCooldown: 12000, //time in ticks to check if a player has had an event recently

}
const overrideExistingSettings = false
if (overrideExistingSettings) {
    server.persistentData.eventSettings = defaultSettings;
}

ServerEvents.loaded((event) => {
    let sPData = event.server.persistentData
    sPData.eventSettings = sPData.eventSettings ?? defaultSettings;
    sPData.Statistics = sPData.Statistics ?? {
        totalEvents: 0,
        success: {},
        failure: {},
    };
})

PlayerEvents.tick((event) => {
    //Ticking players timer.
    event.player.persistentData.timer >= 0
        ? event.player.persistentData.timer++
        : (event.player.persistentData.timer = 0);
});
ServerEvents.tick((event) => {
    event.server.persistentData.eventSettings.timer++;
    if (event.server.persistentData.eventSettings.timer > event.server.persistentData.eventSettings.timerDelay) {
        eventSystem(event);
        event.server.persistentData.eventSettings.timer = 0;
    }
});

function eventSystem(event, forceEvent) {
    forceEvent = forceEvent ?? false;
    const { server } = event;
    const { Statistics, eventSettings } = server.persistentData;
    var debug = eventSettings.debug ?? false;
    var ran = Math.random();

    let maxAttempts = eventSettings.maxAttempts ?? 10;
    let timeCooldown = eventSettings.timeCooldown ?? 10000;
    // console.log(statistics)

    //Get all player

    var players = server.players;
    if (debug) console.log("Events Triggered");
    //If no players return
    if (players.length === 0) {
        if (debug) console.log("No players found for events");
        return;
    }

    //Choose a player to do the event for
    var chosenPlayer = players[Math.floor(Math.random() * players.length)];
    if (debug) console.log("Chose player for event " + chosenPlayer.username);

    //Check players gamemode, so we only do this on players in survival.
    if (chosenPlayer.isCreative() || chosenPlayer.isSpectator()) {
        if (debug) console.log("Player is create or spectator, exiting");
        return;
    }

    //Check if player is alive.
    if (!chosenPlayer.alive) {
        if (debug) console.log("Player is dead");
        return;
    }

    //Check persistent data is available
    if (!chosenPlayer.persistentData) {
        if (debug) console.log("Player missing persistent Data");
        return;
    }
    //If no timer exist on player make it and return
    if (!chosenPlayer.persistentData.timer) {
        if (debug) console.log("player has no timer data");
        chosenPlayer.persistentData.timer = 0;
        return;
    }

    //If player had an event happen within the last 15min do nothing
    if (chosenPlayer.persistentData.timer < timeCooldown && !forceEvent) {
        if (debug) console.log("Player has had an event recently, skipping");
        return;
    }

    Statistics.totalEvents++;

    //Creates a list of events the user player has disabled.
    var disabledEvents = [];
    if (chosenPlayer.persistentData.disabledEvents) {
        for (let i = 0; i < chosenPlayer.persistentData.disabledEvents.length; i++) {
            disabledEvents.push(chosenPlayer.persistentData.disabledEvents[i]);
        }
    }

    //Filter event based on their chance, disabled events
    var filteredEvents = ftbEvents.filter((e) => ran <= e.chance && !disabledEvents.includes(e.name));

    //Choose an event from the filtered list
    var chosenEvent = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];

    // If no event return 
    if (!chosenEvent) {
        if (debug) console.log("no event was chosen, returning");
        Statistics.failure['No Event'] = Statistics.failure['No Event'] ? Statistics.failure['No Event'] + 1 : 1;
        return;
    }

    //Check for required biomes
    if (chosenEvent.requiredBiomes && chosenEvent.requiredBiomes.length > 0) {
        let biomeHolder = chosenPlayer.level.minecraftLevel.getBiome(chosenPlayer.getBlock().getPos());
        let foundBiome = chosenEvent.requiredBiomes.find((e) => biomeHolder.is(e));

        if (!foundBiome) {
            if (debug) console.log("Required biome not found, returning");
            Statistics.failure['Required Biome'] = Statistics.failure['Required Biome'] ? Statistics.failure['Required Biome'] + 1 : 1;
            return;
        }
    }

    //40% chance of no event for the player this time.
    if (ran > eventSettings.chance) {
        if (debug) console.log(eventSettings.chance * 100 + "% chance triggered, no event for this player at this time");
        chosenPlayer.persistentData.timer = timeCooldown / players.length; //try again but faster if more players are online
        Statistics.failure['Fail Chance'] = Statistics.failure['Fail Chance'] ? Statistics.failure['Fail Chance'] + 1 : 1;
        return;
    }

    if (chosenEvent.stage && !chosenPlayer.stages.has(chosenEvent.stage)) {
        if (debug) console.log("Player does not have required stage for event, returning");
        chosenPlayer.persistentData.timer = timeCooldown; //reset their event timer since no event was able to trigger
        Statistics.failure['Missing Stage'] = Statistics.failure['Missing Stage'] ? Statistics.failure['Missing Stage'] + 1 : 1;
        return;
    }

    if (chosenEvent.size >= 0 && chosenEvent.minDistance && chosenEvent.maxDistance) {
        //10 Tries to find random location for the event to happen.
        let tries = 0;
        let spawnFound;
        let playerPos = new BlockPos(chosenPlayer.x, chosenPlayer.y, chosenPlayer.z);

        while (tries < maxAttempts && !spawnFound) {
            let randomLoc = new Ku.Level(chosenPlayer.getLevel()).getRandomLocation(
                playerPos,
                chosenEvent.minDistance,
                chosenEvent.maxDistance
            );

            if (debug && !spawnFound) console.log("Checking spawn location for event:" + chosenEvent.name);

            let spawnCheck = checkSpawnLocation(
                chosenPlayer.getLevel(),
                randomLoc,
                chosenEvent.size,
                chosenEvent.checkBlocks,
                chosenEvent.requireBlockBelow
            );
            if (spawnCheck.okay) {
                spawnFound = { pos: randomLoc, locationInfo: spawnCheck };
            } else {
                tries++;
            }
        }

        if (debug && !spawnFound) {
            console.log("Spawn not found for event");
            Statistics.failure['Spawn not found'] = Statistics.failure['Spawn not found'] ? Statistics.failure['Spawn not found'] + 1 : 1;
        }

        //If event and player has been chosen, start the event and restart players timer
        if (chosenEvent && chosenPlayer && spawnFound) {
            chosenEvent.execute(event, chosenPlayer, spawnFound);
            chosenPlayer.persistentData.timer = 0;
            Statistics.success[chosenEvent.name] = Statistics.success[chosenEvent.name] ? Statistics.success[chosenEvent.name] + 1 : 1;
        }
    } else {
        //If event and player has been chosen, start the event and restart players timer
        if (chosenEvent && chosenPlayer) {
            chosenEvent.execute(event, chosenPlayer, null);
            chosenPlayer.persistentData.timer = 0;
            Statistics.success[chosenEvent.name] = Statistics.success[chosenEvent.name] ? Statistics.success[chosenEvent.name] + 1 : 1;
        }
    }
}


// Temporary for existing Teams to create their spaceStation data
const FTBTeamsApi = Java.loadClass("dev.ftb.mods.ftbteams.FTBTeamsAPI")
PlayerEvents.loggedIn(event => {
    let sPData = event.server.persistentData
    sPData.spacestation = sPData.spacestation ?? {}
    let player = event.player;
    if (!player) return
    let team = FTBTeamsApi.getPlayerTeam(player.uuid)
    if (!team) {
        console.log(`Player: ${event.player.username} is not in a team`)
        return
    }
    let teamId = team.getId().toString()
    sPData.spacestation[teamId] = sPData.spacestation[teamId] ?? {
        "ad_astra:earth_orbit": false,
        "ad_astra:glacio_orbit": false,
        "ad_astra:mars_orbit": false,
        "ad_astra:mercury_orbit": false,
        "ad_astra:moon_orbit": false,
        "ad_astra:venus_orbit": false
    }
})