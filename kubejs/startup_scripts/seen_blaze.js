ForgeEvents.onEvent('net.minecraftforge.event.entity.EntityTravelToDimensionEvent', event => {
  const {entity, dimension} = event

  if (entity.isPlayer()) {
    const player = entity.self()
    
    if (dimension === 'minecraft:the_nether' && !player.stages.has('seen_blaze')) {
      player.sendSystemMessage({text: 'You need to summon a blaze first!', color: 'red'}, true)
      event.setCanceled(true)
    }
  }
})