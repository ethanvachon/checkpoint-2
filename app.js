let instances = 0 
let clickMultiplier= 1
let autoClick = 0
let shopDisplay = true

let upgradeLibrary = {
  phishing: {
    auto: 2,
    price: 50,
    quantity: 0
  },
  hacker: {
    auto: 20,
    price: 500,
    quantity: 0
  },
  nsatech: {
    auto: 500,
    price: 10000,
    quantity: 0
  }
}
let upgradeClick = {
  upgrade1: {
    click: 1,
    price: 5,
    quantity: 0
  },
  upgrade2: {
    click: 5,
    price: 300,
    quantity: 0
  },
  upgrade3: {
    click: 50,
    price: 2000,
    quantity: 0
  }
}


function addInstance (){
  instances += clickMultiplier
  drawInstances()
}
function drawInstances (){
  document.getElementById('instances').innerText = instances.toString()
}
function switchMenus (){
  if(shopDisplay == true){
    document.getElementById('shop').classList.add('hidden')
    document.getElementById('inventory').classList.remove('hidden')
    shopDisplay = false
  } else{
    document.getElementById('shop').classList.remove('hidden')
    document.getElementById('inventory').classList.add('hidden')
    shopDisplay = true
  }
}
function clickUpgrade(upgrade, upgradenum){
  if(instances >= upgradeClick[upgrade].price){
    instances -= upgradeClick[upgrade].price
    upgradeClick[upgrade].quantity++
    drawQuantity(upgrade, upgradenum, upgradeClick)
    drawInstances()
    upgradeClick[upgrade].price += Math.floor(upgradeClick[upgrade].price * 1.5)
    clickMultiplier += upgradeClick[upgrade].click
    drawPrices(upgrade, upgradeClick)
  }
}
function addUpgrade (upgrade, upgradenum){
  if(instances >= upgradeLibrary[upgrade].price){
    instances -= upgradeLibrary[upgrade].price
    upgradeLibrary[upgrade].quantity++
    drawQuantity(upgrade, upgradenum, upgradeLibrary)
    drawInstances()
    upgradeLibrary[upgrade].price += Math.floor(upgradeLibrary[upgrade].price * 0.2)
    autoClick += upgradeLibrary[upgrade].auto
    drawPrices(upgrade, upgradeLibrary)
  } else {
    return
  }
}
function drawPrices(upgrade, object){
  document.getElementById(upgrade).innerText = object[upgrade].price
}
function drawQuantity (upgrade, upgradenum, object){
  document.getElementById(upgradenum).innerText = object[upgrade].quantity
}
function autoCheckInstances (upgradeid, upgrade){
  if (instances > upgradeLibrary[upgrade].price){
    document.getElementById(upgradeid).classList.remove('hidden')
  }
}
function clickCheckInstances (upgradeid, upgrade){
  if (instances > upgradeClick[upgrade].price){
    document.getElementById(upgradeid).classList.remove('hidden')
  }
}
function savePlayer() {
  window.localStorage.setItem("instances", JSON.stringify(instances))
  window.localStorage.setItem("autoClick", JSON.stringify(autoClick))
  window.localStorage.setItem("clickMultiplier", JSON.stringify(clickMultiplier))
  window.localStorage.setItem("upgradeLibrary", JSON.stringify(upgradeLibrary))
  window.localStorage.setItem("upgradeClick", JSON.stringify(upgradeClick))
}
function loadPlayer(){
  instances = JSON.parse(window.localStorage.getItem('instances'))
  autoClick = JSON.parse(window.localStorage.getItem('autoClick'))
  clickMultiplier = JSON.parse(window.localStorage.getItem('clickMultiplier'))
  // upgradeLibrary = JSON.parse(window.localStorage.getItem('upgradeLibrary'))
  // upgradeClick = JSON.parse(window.localStorage.getItem('upgradeClick'))
}
loadPlayer()


setInterval(() => {
  instances += Math.ceil(autoClick / 2)
  drawInstances()
}, 500);

setInterval(() => {
  autoCheckInstances('hackerid', 'hacker')
  autoCheckInstances('nsatechid', 'nsatech')
  clickCheckInstances('upgrade2id', 'upgrade2')
  clickCheckInstances('upgrade3id', 'upgrade3')
  savePlayer()
}, 5000);