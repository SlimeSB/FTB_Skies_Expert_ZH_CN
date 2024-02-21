NetworkEvents.dataReceived("blacklistSlab", (event) => {
    const { data: { x, y, z, index }, level } = event;
    let block = level.getBlock(x, y, z)
    let inventory = block.inventory
    // console.log(block)
    inventory.setStackInSlot(index, 'minecraft:air')
    // event.player.giveInHand(blacklistedBlock)
    error(event, `These Blocks are to unstable to be used in the feeder!`)
})
