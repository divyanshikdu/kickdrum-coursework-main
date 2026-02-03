import { STOCK_CONFIG } from "../constants/uiConstants.js";

export const getRandomPrice = () => {
  return Math.floor(Math.random() * STOCK_CONFIG.MAX_PRICE);
};
