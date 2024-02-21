// priority: 800
const wanderingtraderEvent = {
  name: "ftbskies:wandering_trader",
  displayName: "Wandering Trader",
  description: "Toggles the Villager Event. Has a random chance of spawning a Wanderer Trader.",
  chance: 0.15,
  minDistance: 2,
  maxDistance: 15,
  size: 0,
  checkBlocks: ["minecraft:air"],
  requireBlockBelow: true,
  no_solicitors: Block.id("cyclic:no_soliciting").blockState,
  stage: null,
  disableStage: null,

  execute(event, player, location) {
    const level = player.getLevel();
    const checkForNoSolicitors = new Ku.Level(level).findBlockWithinRadius(this.no_solicitors, location.pos, 32, false);
    const checkAmountOfTraders = new Ku.Level(level).findEntitiesWithinRadius(
      "minecraft:wandering_trader",
      location.pos,
      64
    );

    if (checkForNoSolicitors.length === 0 && checkAmountOfTraders.length < 2) {
      player.tell([`Wandering Trader has spawned at X: ${location.pos.x}, Y: ${location.pos.y}, Z: ${location.pos.z}`]);

      let entityWandering = level.createEntity("minecraft:wandering_trader");
      entityWandering.setPosition(location.pos.x + 0.5, location.pos.y + 0.5, location.pos.z + 0.5);

      entityWandering.spawn();
    }
  },
};

const heads = [
  "kSunekaer",
  "Loneztar",
  "slowpoke101",
  "Jake_Evans",
  "ErrorMikey",
  "Everlipse",
  "Squidgyface1478",
  "1aaron5",
  "CodexAdrian",
  "desht",
  "DinnerBeef",
  "UnRealDinnerbone",
  "NMX_R3GEN",
  "OfficialyAwsome",
  "manmaed",
  "Gaz492",
  "TheonlyTazz",
  "Saereth",
  "Artpoke_",
  "pikminman13",
];

EntityEvents.spawned((event) => {
  const { entity, server } = event;
  if (entity.type === "minecraft:wandering_trader") {
    //Grabbing traders current NBT
    let nbt = entity.nbt;
    let elytra = "minecraft:elytra";

    //Check if the trader doesn't have an elytra for sale, if not, add it.
    if (!nbt.Offers.Recipes.some((recipe) => recipe.sell.id === elytra)) {
      nbt.Offers.Recipes.add(
        NBT.compoundTag({
          maxUses: 3,
          buy: Item.of("1x hexerei:moon_dust").toNBT(),
          sell: Item.of(elytra).toNBT(),
        })
      );
      entity.nbt = nbt;
    }

    //coins
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 10,
        buy: Item.of("thermal:invar_ingot").toNBT(),
        sell: Item.of("3x thermal:invar_coin").toNBT(),
      })
    );
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 10,
        buy: Item.of("thermal:electrum_ingot").toNBT(),
        sell: Item.of("3x thermal:electrum_coin").toNBT(),
      })
    );
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 10,
        buy: Item.of("thermal:signalum_ingot").toNBT(),
        sell: Item.of("3x thermal:signalum_coin").toNBT(),
      })
    );
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 10,
        buy: Item.of("thermal:lumium_ingot").toNBT(),
        sell: Item.of("3x thermal:lumium_coin").toNBT(),
      })
    );
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 10,
        buy: Item.of("thermal:enderium_ingot").toNBT(),
        sell: Item.of("3x thermal:enderium_coin").toNBT(),
      })
    );

    //Feed
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 1,
        buy: Item.of("9x thermal:invar_coin").toNBT(),
        sell: Item.of("mob_grinding_utils:nutritious_chicken_feed").toNBT(),
      })
    );
    nbt.Offers.Recipes.add(
      NBT.compoundTag({
        maxUses: 1,
        buy: Item.of("6x thermal:electrum_coin").toNBT(),
        sell: Item.of("mob_grinding_utils:gm_chicken_feed_cursed").toNBT(),
      })
    );

    //Check if the trader already has heads for sale, if so stop here.
    if (nbt.Offers.Recipes.some((recipe) => recipe.sell.id === "minecraft:player_head")) {
      return;
    }

    //Create copy of the FTB Staff heads
    let headsCopy = [];
    headsCopy = Array.from(heads);

    //Get all players on the server
    server.players.forEach((name) => {
      //Add the players that isn't in the array all to the array
      if (!headsCopy.some((n) => n === name.toString())) {
        headsCopy.push(name);
      }
    });

    //Shuffling the heads array a lot
    headsCopy = headsCopy
      .sort(() => Math.random() - 0.6)
      .sort(() => Math.random() - 0.2)
      .sort(() => Math.random() - 0.1);

    //Taking the first 3 names from the shuffled array
    headsCopy.slice(0, 6).forEach((name) => {
      //Get random price between 1 and 3
      let price = Math.round(Math.random() * 3 + 1);

      //Adding the trade to the NBT data
      nbt.Offers.Recipes.add(
        NBT.compoundTag({
          maxUses: 3,
          buy: Item.of(`${price}x minecraft:emerald`).toNBT(),
          sell: Item.of("minecraft:player_head", {
            SkullOwner: name,
          }).toNBT(),
        })
      );
    });

    // make sure the trader despawns after the regular amount of time as well
    nbt.DespawnDelay = NBT.i(48000);

    //Merging the NBT data back on to the trader
    entity.nbt = nbt;
  }
});
