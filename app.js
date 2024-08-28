let amount = document.getElementById("amount");
let provider = document.getElementById("provider");
let pin = document.getElementById("pin");
let generatedPin;
let rechargeCards = JSON.parse(localStorage.getItem("rechargeCards")) || [];

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
    return;
  }
  pin.innerHTML = `<p>NETWORK PROVIDER: ${providerValue}</p> <p>AMOUNT: ${amountValue}</p> <p>RECHARGE PIN: ${generatedPin}</p>`;
  
  let cardObj = {
    provider: providerValue,
    amount: amountValue,
    pin: generatedPin,
    isUsed: false,
  };
  rechargeCards.push(cardObj);
  localStorage.setItem("rechargeCards", JSON.stringify(rechargeCards));
  display();
}

function display() {
  let tableBody = document.getElementById("tbody");
  tableBody.innerHTML = "";
  rechargeCards.forEach((card, index) => {
    tableBody.innerHTML += ` <tr>
        <td> ${index + 1}  </td>
        <td> ${card.pin} </td>
        <td> ${card.provider} </td>
        <td> ₦${card.amount} </td>
        <td> ${card.isUsed} </td>
    </tr>`;
  });
}

display();

function loadCard() {
  let loadCardInput = document.getElementById("loadCardInput");
  if (loadCardInput.value.trim()) {
    let cardValue = loadCardInput.value;
    console.log(cardValue);
    let cardPin = cardValue.slice(5, 20);
    console.log(cardPin);

    let cardToBeFound = rechargeCards.find((cardObj) => {
      return cardObj.pin === cardPin;
    });

    if (!cardToBeFound) {
      alert("invalid Card");
    } else if (cardToBeFound && cardToBeFound.isUsed === true) {
      alert("card has already been used");
    } else if (cardValue === `*311*${cardToBeFound.pin}#`) {
      cardToBeFound.isUsed = true;
      localStorage.setItem("rechargeCards", JSON.stringify(rechargeCards));
      display();
      alert(
        `Your ${cardToBeFound.provider} recharge of ₦${cardToBeFound.amount} is successful `
      );
    } else {
      alert("invalid format");
    }
  } else {
    alert("input a value");
  }
}

function displayLoadedCards() {
  let tableBody = document.getElementById("tbody");
  tableBody.innerHTML = "";
  let loadedCards = rechargeCards.filter((card) => {
    return card.isUsed === true
  });

  loadedCards.forEach((card, index) => {
    tableBody.innerHTML += ` <tr>
        <td> ${index + 1}  </td>
        <td> ${card.pin} </td>
        <td> ${card.provider} </td>
        <td> ₦${card.amount} </td>
        <td> ${card.isUsed} </td>
    </tr>`;
  });
}

function displayUnloadedCards() {
  let tableBody = document.getElementById("tbody");
  tableBody.innerHTML = "";
  let unloadedCards = rechargeCards.filter((card) => {
    return card.isUsed === false
  });

  unloadedCards.forEach((card, index) => {
    tableBody.innerHTML += ` <tr>
        <td> ${index + 1}  </td>
        <td> ${card.pin} </td>
        <td> ${card.provider} </td>
        <td> ₦${card.amount} </td>
        <td> ${card.isUsed} </td>
    </tr>`;
  });

}
// localStorage.clear()
