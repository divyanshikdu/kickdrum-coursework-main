import { STOCK_CONFIG } from "../constants/uiConstants.js";

export const addBarToChart = (price, isUp) => {
  const chart = document.getElementById("chartContainer");

  const bar = document.createElement("div");
  bar.classList.add("bar");

  if (!isUp) {
    bar.classList.add("bar--down");
  }

  bar.style.height = `${price}px`;

  chart.appendChild(bar);

  //max bar limit to 500
  const maxBars = Math.floor(chart.offsetWidth / STOCK_CONFIG.BAR_WIDTH);

  if (chart.children.length > maxBars) {
    chart.removeChild(chart.firstChild);
  }
};
