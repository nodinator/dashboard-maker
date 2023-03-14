const rawMaterials = [
  { name: 'Gray Iron', quantity: 100 },
  { name: 'A356 Aluminum', quantity: 250 },
  { name: '1050 Steel', quantity: 75 },
  { name: '4340 Steel', quantity: 15 },
  { name: 'Nylon', quantity: 20 },
];

const manufacturingLines = [
  { name: 'Forge 1', status: 'in use'},
  { name: 'Forge 2', status: 'repairing'},
  { name: 'Forge 3', status: 'standby'},
  { name: 'Machining 1', status: 'in use'},
  { name: 'Machining 2', status: 'in use'},
  { name: 'Machining 3', status: 'in use'},
  { name: 'Rework 1', status: 'in use'},
  { name: 'Assembly 1', status: 'in use'},
  { name: 'Assembly 2', status: 'in use'},
  { name: 'Assembly 3', status: 'in use'},
]

const completedParts = [
  { name: 'Piston 1', partNumber: 'PST4009', quantity: 550 },
  { name: 'Piston 2', partNumber: 'PST7002', quantity: 50 },
  { name: 'ECU 1', partNumber: 'ECU3004', quantity: 150 },
  { name: 'ECU 2', partNumber: 'ECU4005', quantity: 50 },
  { name: 'ECU 3', partNumber: 'ECU7003', quantity: 50 },
  { name: 'Block I3', partNumber: 'BLK3001', quantity: 350 },
  { name: 'Block I4', partNumber: 'BLK4002', quantity: 50 },
]

const completedEngines = [
  { name: 'I3', quantity: 466},
  { name: 'I4', quantity: 2370 },
  { name: 'I6', quantity: 210 },
  { name: 'V6', quantity: 360 },
  { name: 'V8', quantity: 1222 },
  { name: 'V10', quantity: 1 },
]

const shipmentRecords = [
  { product: 'I3', quantity: 500, company: "Citrohm", date: "2021-08-04"},
  { product: 'I4', quantity: 1500, company: "Hyumbai", date: "2021-09-13"},
  { product: 'V6', quantity: 1000, company: "Citrohm", date: "2021-10-19"},
  { product: 'V8', quantity: 500, company: "Citrohm", date: "2021-11-27"},
  { product: 'I3', quantity: 700, company: "BWM", date: "2021-12-12"},
  { product: 'I6', quantity: 400, company: "BWM", date: "2021-12-13"},
  { product: 'V8', quantity: 300, company: "BWM", date: "2022-01-01"},
  { product: 'V6', quantity: 520, company: "Reno", date: "2022-03-23"},
  { product: 'I3', quantity: 500, company: "Reno", date: "2022-03-26"},
  { product: 'V10', quantity: 50, company: "BWM", date: "2022-04-23"},
  { product: 'I3', quantity: 650, company: "Citrohm", date: "2022-05-15"},
  { product: 'I4', quantity: 2000, company: "Hyumbai", date: "2022-05-17"},
  { product: 'I4', quantity: 350, company: "Citrohm", date: "2022-06-24"},
  { product: 'V8', quantity: 500, company: "Citrohm", date: "2022-09-25"},
  { product: 'I3', quantity: 800, company: "Hyumbai", date: "2022-10-01"},
  { product: 'I4', quantity: 2500, company: "Hyumbai", date: "2022-10-02"},
  { product: 'V6', quantity: 900, company: "Citrohm", date: "2022-10-07"},
  { product: 'V6', quantity: 550, company: "Toyodi", date: "2022-11-11"},
  { product: 'I3', quantity: 500, company: "Toyodi", date: "2022-12-20"},
  { product: 'I4', quantity: 1200, company: "Toyodi", date: "2022-12-23"},
  { product: 'V6', quantity: 1100, company: "Citrohm", date: "2023-01-03"},
  { product: 'V8', quantity: 600, company: "BWM", date: "2023-02-22"},
  { product: 'I4', quantity: 750, company: "BWM", date: "2023-03-14"},
]

module.exports = {rawMaterials, manufacturingLines, completedParts, completedEngines, shipmentRecords }