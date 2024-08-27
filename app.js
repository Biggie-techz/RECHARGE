let amount = document.getElementById("amount");
let provider = document.getElementById("provider");
let pin = document.getElementById("pin");
let generatedPin;

function generatePin() {
  let providerValue = provider.value;
  let amountValue = amount.value;
  generatedPin = "";
  for (let index = 0; index < 15; index++) {
    let randomNum = Math.floor(Math.random() * 10);
    generatedPin = generatedPin + randomNum;
  }
  console.log(generatedPin.length);
  if (amount.value === "0" || provider.value === "0") {
    alert("Please choose amount and provider");
  } else {
    pin.innerHTML = `<p>NETWORK PROVIDER: ${providerValue}</p> <p>AMOUNT: ${amountValue}</p> <p>RECHARGE PIN: ${generatedPin}</p>`;
  }
}

function loadCard() {
  providerValue = provider.value;
  amountValue = amount.value;
  let loadCardInput = document.getElementById("loadCardInput");
  if (loadCardInput.value === `*311*${generatedPin}#`) {
    alert(`Your ${ providerValue} recharge of #${amountValue} was successfully`);
  } else {
    alert("Invalid pin");
  }
}
