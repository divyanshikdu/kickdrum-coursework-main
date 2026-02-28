export const addHistoryItem = (type, qty, price) => {
  const list = document.getElementById("historyList");

  const item = document.createElement("li");
  item.classList.add("history__item");

//   item.textContent = `${type} ${qty} stocks at ₹${price}`;
//buy/sell in ho=istory based on colors-
item.innerHTML = `
  <span class="history__action history__action--${type.toLowerCase()}">
    ${type}
  </span>

  <span class="history__text">
    ${qty} stocks at ₹${price}
  </span>
`;


  list.prepend(item);
};
