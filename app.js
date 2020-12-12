let instances = 0 
let clickMultiplier= 1
let autoClick = 0
let shopDisplay = true

let upgradeLibrary = {
  phishing: {
    auto: 1,
    price: 20,
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
    click: 20,
    price: 300,
    quantity: 0
  },
  upgrade3: {
    click: 100,
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
    drawQuantity()
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
  document.getElementById('upgradenum').innerText = object[upgrade].quantity
}



setInterval(() => {
  instances += autoClick
  drawInstances()
}, 1000);