const reelSymbols = [
  "assets/images/mahjong1.png",
  "assets/images/mahjong2.png",
  "assets/images/mahjong3.png",
  "assets/images/mahjong4.png",
  "assets/images/mahjong5.png",
];

const creditsElement = document.getElementById("credits");
const totalBetElement = document.getElementById("totalBet");
const jackpotElement = document.getElementById("jackpot");
const messageElement = document.getElementById("message");
const spinSound = document.getElementById("spinSound");
const winSound = document.getElementById("winSound");
const backgroundMusic = document.getElementById("backgroundMusic");

let credits = 500;
let jackpot = 10000;
let totalBet = 10;
let turboMode = false;

document.getElementById("spinButton").addEventListener("click", spinReels);
document.getElementById("maxBetButton").addEventListener("click", maxBet);
document.getElementById("autoSpinButton").addEventListener("click", autoSpin);
document.getElementById("turboButton").addEventListener("click", toggleTurboMode);
document.getElementById("toggleMusic").addEventListener("click", toggleMusic);

function updateUI() {
  creditsElement.textContent = credits;
  totalBetElement.textContent = totalBet;
  jackpotElement.textContent = jackpot;
}

function spinReels() {
  if (credits < totalBet) {
    messageElement.textContent = "Kredit tidak cukup!";
    return;
  }

  credits -= totalBet;
  updateUI();
  messageElement.textContent = "Gulungan berputar...";
  spinSound.play();

  const results = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  displayReelSymbols(results);

  setTimeout(() => {
    checkWin(results);
  }, turboMode ? 500 : 1500);
}

function getRandomSymbol() {
  return reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
}

function displayReelSymbols(results) {
  const reels = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];
  reels.forEach((reel, index) => {
    reel.innerHTML = `<div><img src="${results[index]}" alt="Symbol"></div>`;
    reel.classList.remove("animate");
    setTimeout(() => reel.classList.add("animate"), 50);
  });
}

function checkWin(results) {
  const uniqueSymbols = new Set(results);
  if (uniqueSymbols.size === 1) {
    const prize = calculatePrize(results[0]);
    credits += prize;
    jackpot += totalBet;
    messageElement.textContent = `Anda menang ${prize} kredit!`;
    winSound.play();
  } else {
    messageElement.textContent = "Coba lagi!";
  }
  updateUI();
}

function calculatePrize(symbol) {
  switch (symbol) {
    case reelSymbols[0]:
      return 100;
    case reelSymbols[1]:
      return 200;
    case reelSymbols[2]:
      return 500;
    case reelSymbols[3]:
      return 1000;
    case reelSymbols[4]:
      return 5000;
    default:
      return 0;
  }
}

function maxBet() {
  totalBet = Math.min(credits, 100);
  totalBetElement.textContent = totalBet;
}

function autoSpin() {
  let spinsLeft = 10;
  const interval = setInterval(() => {
    if (spinsLeft <= 0 || credits < totalBet) {
      clearInterval(interval);
      messageElement.textContent = "Auto Spin selesai.";
    } else {
      spinReels();
      spinsLeft--;
    }
  }, turboMode ? 500 : 1500);
}

function toggleTurboMode() {
  turboMode = !turboMode;
  messageElement.textContent = turboMode ? "Turbo Mode diaktifkan." : "Turbo Mode dimatikan.";
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    document.getElementById("toggleMusic").textContent = "Matikan Musik";
  } else {
    backgroundMusic.pause();
    document.getElementById("toggleMusic").textContent = "Putar Musik";
  }
}

// Inisialisasi UI
updateUI();