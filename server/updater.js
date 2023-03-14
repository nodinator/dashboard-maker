// each variant has unique block, cylinder heads, and crankshaft
// valve springs match ecu as a proxy for performance?
// I3 - 1.5t   piston1, ecu1, 
// I4 - 2.0t  piston1, ecu1, ecu2
// I6 - 3.2na piston 2, ecu3    
// V6 - 3.0t piston 1, ecu1, ecu2
// V8 - 4.0t piston 1, ecu2
// V10 - 5.4na piston 2, ecu3      limited qty
const { rawMaterials, manufacturingLines, completedParts, completedEngines, shipmentRecords } = require('./data');

const targetEngineNumbers = { I3: 600, I4: 3000}

const buildManager = () => {
  const piston1 = completedParts.find(part => part.name === 'Piston 1')
  const ecu1 = completedParts.find(part => part.name === 'ECU 1')
  const blockI3 = completedParts.find(part => part.name === 'Block I3')
  const engineI3 = completedEngines.find(engine => engine.name === 'I3')

  //ordering
  if (ecu1.quantity < 20) {
    buildEcu1()
  }    
  //machining line
  if ( piston1.quantity < 100) {
    buildPiston1()
  } else if (blockI3.quantity < 20) {
    buildBlockI3()
  } 
  //assembly line
  if (piston1.quantity > 20 && blockI3.quantity > 0 && engineI3.quantity < targetEngineNumbers.I3 ) {
    buildI3()
  }
}


const buildI3 = () => {
  const piston = completedParts.find(part => part.name === 'Piston 1')
  const ecu = completedParts.find(part => part.name === 'ECU 1')
  const block = completedParts.find(part => part.name === 'Block I3')
  piston.quantity -= 3
  ecu.quantity --
  block.quantity --

  const engine = completedEngines.find(engine => engine.name === 'I3')
  engine.quantity ++
}

const buildEcu1 = () => {
  //order from supplier
  const ecu = completedParts.find(part => part.name === 'ECU 1')
  ecu.quantity += 50
}

const buildPiston1 = () => {
  const steel = rawMaterials.find(material => material.name === '1050 Steel')
  steel.quantity --
  const piston = completedParts.find(part => part.name === 'Piston 1')
  piston.quantity += 100
}

const buildBlockI3 = () => {
  const iron = rawMaterials.find(material => material.name === 'Gray Iron')
  iron.quantity --
  const block = completedParts.find(part => part.name === 'Block I3')
  block.quantity += 10
}

module.exports = { buildManager }