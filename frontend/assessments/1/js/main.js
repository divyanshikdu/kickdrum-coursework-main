import { STOCK_CONFIG } from "./constants/uiConstants.js";
import { getRandomPrice } from "./modules/stock.js";
import { addBarToChart } from "./modules/chart.js";
import { addHistoryItem } from "./modules/history.js";

const input = document.getElementById("stockInput");
const buyBtn = document.getElementById("buyBtn");
const sellBtn = document.getElementById("sellBtn");

const arrow = document.getElementById("priceArrow");

let prevPrice = STOCK_CONFIG.INITIAL_PRICE;

setInterval(() => {
  const newPrice = getRandomPrice();

  // ✅ Update Price Text
  document.getElementById("stockPrice").textContent = newPrice;

  // ✅ Arrow Logic (Up/Down)
  arrow.classList.remove("arrow--up", "arrow--down");

  if (newPrice > prevPrice) {
    arrow.textContent = "↑";
    arrow.classList.add("arrow--up");
  } else if (newPrice < prevPrice) {
    arrow.textContent = "↓";
    arrow.classList.add("arrow--down");
  }

  // ✅ Add Bar to Chart
  const isUp = newPrice >= prevPrice;
  addBarToChart(newPrice, isUp);

  // ✅ Update Previous Price
  prevPrice = newPrice;
}, STOCK_CONFIG.UPDATE_INTERVAL);

// ✅ Buy Button
buyBtn.addEventListener("click", () => {
  const qty = input.value;
  if (!qty) return;

  addHistoryItem("Bought", qty, prevPrice);
  input.value = "";
});

// ✅ Sell Button
sellBtn.addEventListener("click", () => {
  const qty = input.value;
  if (!qty) return;

  addHistoryItem("Sold", qty, prevPrice);
  input.value = "";
});
