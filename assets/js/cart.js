/*=============== DATA FETCH ===============*/
window.onload = async function () {
  let originalData = await fetch("assets/data/data.json");
  let transferedData = await originalData.json();

  let table = document.querySelector(".table");

  function displayCart() {
    table.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      let tr = document.createElement("tr");
      tr.innerHTML = `<p>Your cart is empty</p>`;
      table.appendChild(tr);
    } else {
      table.appendChild(createTableTitle());
      cart.forEach((cartItem) => {
        let item = transferedData.find((p) => p.id == cartItem.id);
        if (item != null) {
          let tr = createCartItem(item, cartItem.quantity);
          table.appendChild(tr);
        }
      });
    }
  }

  function createTableTitle() {
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <th>Image</th>
    <th>Name</th>
    <th>Price</th>
    <th>Quatity</th>
    <th>Subtotal</th>
    <th>Remove</th>
  `;

    return tr;
  }

  function createCartItem(item, quantity) {
    let mainTr = document.createElement("tr");
    mainTr.id = `mainTr${item.id}`;

    let tableImgTd = document.createElement("td");
    let tableImage = document.createElement("img");
    tableImage.classList.add("table__img");
    tableImage.src = item.srcImgFront;
    tableImgTd.appendChild(tableImage);

    let tableTitleAndDescriptionTd = document.createElement("td");
    let tableTitle = document.createElement("h3");
    tableTitle.classList.add("table__title");
    tableTitle.innerHTML = item.title;

    let tableDescription = document.createElement("p");
    tableDescription.classList.add("table__description");
    tableDescription.innerHTML = item.description;

    tableTitleAndDescriptionTd.appendChild(tableTitle);
    tableTitleAndDescriptionTd.appendChild(tableDescription);

    let priceTd = document.createElement("td");
    let tablePrice = document.createElement("span");
    tablePrice.classList.add("table__price");
    let price = item.price * ((100 - item.discount) / 100);
    tablePrice.innerHTML = price.toFixed(1);

    priceTd.appendChild(tablePrice);

    let quantityTd = document.createElement("td");
    let quantityInput = document.createElement("input");
    quantityInput.classList.add("quantity");
    quantityInput.type = "number";
    quantityInput.value = quantity;
    quantityInput.setAttribute("data-id", item.id);
    quantityInput.addEventListener("change", changeQuantity);

    quantityTd.appendChild(quantityInput);

    let subtotalTd = document.createElement("td");
    subtotalTd.innerHTML = `<span class="table__subtotal">$${(
      price * quantity
    ).toFixed(1)}</span>`;

    let removeTd = document.createElement("td");
    removeTd.innerHTML = `<i class="fi fi-rs-trash table__trash"></i>`;
    removeTd.addEventListener("click", () => removeItem(item.id));

    mainTr.appendChild(tableImgTd);
    mainTr.appendChild(tableTitleAndDescriptionTd);
    mainTr.appendChild(priceTd);
    mainTr.appendChild(quantityTd);
    mainTr.appendChild(subtotalTd);
    mainTr.appendChild(removeTd);

    return mainTr;
  }

  function removeItem(id) {
    let tr = document.querySelector(`#mainTr${id}`);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let newCart = cart.filter((p) => p.id != id);

    localStorage.setItem("cart", JSON.stringify(newCart));
    tr.remove();
  }

  function changeQuantity(event) {
    console.log(event.target.value);
    const itemId = event.target.getAttribute("data-id");
    // let tr = document.querySelector(`#mainTr${id}`);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let itemIndex = cart.findIndex((p) => p.id == itemId);
    if (itemIndex !== -1) {
      cart[itemIndex].quantity = event.target.value;

      if (event.target.value == 0) {
        removeItem(itemId);
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      }
    }
  }

  displayCart();
};
