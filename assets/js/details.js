window.onload = async function () {
  let originalData = await fetch("assets/data/data.json");
  let transferedData = await originalData.json();

  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const itemID = getURLParameter("id");
  console.log(itemID);
  function fetchItemDetails(itemID) {
    // Find the item with the specified ID
    const selectedItem = transferedData.find((item) => item.id == itemID);

    return selectedItem;
  }

  const itemDetails = fetchItemDetails(itemID);

  let detailsContainer = document.querySelector("#detailsContainer");
  let breadcrumbTitle = document.querySelector("#breadcrumbTitle");

  function createItemDetails() {
    breadcrumbTitle.innerHTML = itemDetails.title;
    let imageDetailGroup = document.createElement("div");
    let detailGroup = createDetailsGroup();
    imageDetailGroup.classList.add("details__group");

    let mainImg = document.createElement("img");
    mainImg.src = itemDetails.srcImgFront;
    mainImg.classList.add("details__img");

    let smallImageContainer = createSmallDetailImage();
    imageDetailGroup.appendChild(mainImg);
    imageDetailGroup.appendChild(smallImageContainer);

    detailsContainer.appendChild(imageDetailGroup);
    detailsContainer.appendChild(detailGroup);
  }

  function createSmallDetailImage() {
    let smallImageContainer = document.createElement("div");
    smallImageContainer.classList.add("details__small-images", "grid");
    let firstSmallImage = document.createElement("img");
    let secondSmallImage = document.createElement("img");
    firstSmallImage.src = itemDetails.srcImgBack;
    secondSmallImage.src = itemDetails.srcImgFront;
    firstSmallImage.classList.add("details__small-img");
    secondSmallImage.classList.add("details__small-img");
    smallImageContainer.appendChild(firstSmallImage);
    smallImageContainer.appendChild(secondSmallImage);

    return smallImageContainer;
  }

  function createDetailsGroup() {
    let detailGroup = document.createElement("div");
    detailGroup.classList.add("details__group");

    let detailsTitle = document.createElement("h3");
    detailsTitle.classList.add("details__title");
    detailsTitle.innerHTML = itemDetails.title;

    let detailsBrand = document.createElement("p");
    detailsBrand.classList.add("details__brand");
    detailsBrand.innerHTML = `Brands: <span>${itemDetails.brand}</span>`;

    let detailPrice = createDetailsPrice();

    let shortDescription = document.createElement("p");
    shortDescription.classList.add("short__description");
    shortDescription.innerHTML = itemDetails.description;

    let productList = createProductList();

    let colorOptions = createColorOptions();

    let sizeOptions = createSizeOptions();

    let detailsAction = createDetailsAction();

    let detailsMeta = createDetailsMeta();

    detailGroup.appendChild(detailsTitle);
    detailGroup.appendChild(detailsBrand);
    detailGroup.appendChild(detailPrice);
    detailGroup.appendChild(shortDescription);
    detailGroup.appendChild(productList);
    detailGroup.appendChild(colorOptions);
    detailGroup.appendChild(sizeOptions);
    detailGroup.appendChild(detailsAction);
    detailGroup.appendChild(detailsMeta);

    return detailGroup;
  }

  function createDetailsPrice() {
    let priceParent = document.createElement("div");
    priceParent.classList.add("details__price", "flex");

    let discount = itemDetails.discount;
    if (discount != 0) {
      let newPrice = document.createElement("span");
      newPrice.classList.add("new__price");
      let calcPrice = itemDetails.price * ((100 - discount) / 100);
      newPrice.innerHTML = "$" + calcPrice.toFixed(2);
      priceParent.appendChild(newPrice);

      let oldPrice = document.createElement("span");
      oldPrice.classList.add("old__price");
      oldPrice.innerHTML = "$" + itemDetails.price;
      priceParent.appendChild(oldPrice);

      let savePrice = document.createElement("span");
      savePrice.classList.add("save__price");
      savePrice.innerHTML = `${discount}% Off`;
      priceParent.appendChild(savePrice);
    } else {
      let price = document.createElement("span");
      price.classList.add("new__price");
      price.innerHTML = "$" + itemDetails.price;
      priceParent.appendChild(price);
    }

    return priceParent;
  }

  function createProductList() {
    let productList = document.createElement("ul");
    productList.classList.add("product__list");
    productList.innerHTML = `
              <li class="list__item flex">
                <i class="fi-rs-crown"></i> 1 Year AL Jazeera Brand Warranty
              </li>

              <li class="list__item flex">
                <i class="fi-rs-refresh"></i> 30 Day Return Policy
              </li>

              <li class="list__item flex">
                <i class="fi-rs-credit-card"></i> Cash on Delivery available
              </li>
    `;
    return productList;
  }

  function createColorOptions() {
    let detailsColor = document.createElement("div");
    detailsColor.classList.add("details__color", "flex");
    detailsColor.innerHTML = `<span class="details__color-title">Color</span>
    <ul class="color__list">
      <li>
        <a
          href="#"
          class="color__link"
          style="background-color: hsl(37, 100%, 65%)"
        ></a>
      </li>

      <li>
        <a
          href="#"
          class="color__link"
          style="background-color: hsl(353, 100%, 67%)"
        ></a>
      </li>

      <li>
        <a
          href="#"
          class="color__link"
          style="background-color: hsl(49, 100%, 60%)"
        ></a>
      </li>

      <li>
        <a
          href="#"
          class="color__link"
          style="background-color: hsl(304, 100%, 78%)"
        ></a>
      </li>

      <li>
        <a
          href="#"
          class="color__link"
          style="background-color: 126 (37, 61%, 52%)"
        ></a>
      </li>
    </ul>`;

    return detailsColor;
  }

  function createSizeOptions() {
    let detailsSize = document.createElement("div");
    detailsSize.classList.add("details__size", "flex");

    let sizeTitle = document.createElement("span");
    sizeTitle.classList.add("details__size-title");
    sizeTitle.innerText = "Size";

    let sizeList = document.createElement("ul");
    sizeList.classList.add("size__list");

    let sizeArray = ["S", "M", "L", "XL", "XXL"];
    let isFirstChild = true;
    sizeArray.forEach((s) => {
      let li = document.createElement("li");
      let link = document.createElement("a");
      link.href = "#";
      link.classList.add("size__link");
      if (isFirstChild) {
        isFirstChild = false;
        link.classList.add("size-active");
      }

      link.innerHTML = s;
      link.addEventListener("click", () => {
        clearAllActiveSize();
        link.classList.add("size-active");
      });

      li.appendChild(link);
      sizeList.appendChild(li);
    });

    detailsSize.appendChild(sizeTitle);
    detailsSize.appendChild(sizeList);

    return detailsSize;
  }

  function createDetailsAction() {
    let detailsAction = document.createElement("div");
    detailsAction.classList.add("details__action");

    let quantity = document.createElement("input");
    quantity.type = "number";
    quantity.value = 1;
    quantity.classList.add("quantity");

    let addToCartBtn = document.createElement("a");
    addToCartBtn.href = "#";
    addToCartBtn.classList.add("btn", "btn--sm");
    addToCartBtn.innerText = "Add to Cart";

    let addToFavoriteBtn = document.createElement("a");
    addToFavoriteBtn.href = "#";
    addToFavoriteBtn.classList.add("details__action-btn");
    addToFavoriteBtn.innerHTML = `<i class="fi fi-rs-heart"></i>`;

    detailsAction.appendChild(quantity);
    detailsAction.appendChild(addToCartBtn);
    detailsAction.appendChild(addToFavoriteBtn);

    return detailsAction;
  }

  function createDetailsMeta() {
    let detailsMeta = document.createElement("ul");
    detailsMeta.classList.add("details__meta");
    detailsMeta.innerHTML = `             
    <li class="meta__list flex"><span>SKU:</span> ${itemDetails.Sku}</li>
    <li class="meta__list flex">
      <span>Tags:</span> Cloth, Women, Dress
    </li>
    <li class="meta__list flex">
      <span>Availability:</span> ${itemDetails.Stock} Items In Stock
    </li>`;

    return detailsMeta;
  }

  function clearAllActiveSize() {
    let sizeLinks = document.querySelectorAll(".size__link");
    sizeLinks.forEach((p) => p.classList.remove("size-active"));
  }

  function renderDetails() {
    detailsContainer.innerHTML = "";

    createItemDetails();
  }

  renderDetails();

  /*=============== IMAGE GALLERY ===============*/
  function imgGallery() {
    const mainImg = document.querySelector(".details__img"),
      smallImg = document.querySelectorAll(".details__small-img");

    smallImg.forEach((img) => {
      img.addEventListener("click", () => {
        console.log(this);
        mainImg.src = img.src;
      });
    });
  }

  imgGallery();
};
