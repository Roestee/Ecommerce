window.onload = async function () {
  let originalData = await fetch("assets/data/data.json");
  let transferedData = await originalData.json();

  function renderProducts(dataArray, container) {
    container.innerHTML = "";
    dataArray.forEach((item) => {
      let productItem = createProductItem(item);
      container.appendChild(productItem);
    });
  }

  const countOfShowingOnePage = 8;

  function createProductItem(item) {
    let productItem = document.createElement("div");
    productItem.classList.add("product__item");

    let productBanner = createProductBanner(item);
    let productContent = createProductContent(item);

    productItem.appendChild(productBanner);
    productItem.appendChild(productContent);

    return productItem;
  }

  function createProductBanner(item) {
    let productBanner = document.createElement("div");
    productBanner.classList.add("product__banner");

    let productImages = document.createElement("a");
    productImages.href = `details.html?id=${item.id}`;
    productImages.classList.add("product__images");

    let defaultImage = document.createElement("img");
    defaultImage.src = item.srcImgFront;
    defaultImage.classList.add("product__img", "default");

    let hoverImage = document.createElement("img");
    hoverImage.src = item.srcImgBack;
    hoverImage.classList.add("product__img", "hover");

    let productActions = createProductActions();
    let discount = item.discount;

    productImages.appendChild(defaultImage);
    productImages.appendChild(hoverImage);
    productBanner.appendChild(productImages);
    productBanner.appendChild(productActions);

    if (discount > 0) {
      let productBadge = document.createElement("div");
      productBadge.classList.add("product__badge", "light-green");
      productBadge.innerHTML = `-${discount}%`;
      productBanner.appendChild(productBadge);
    }

    return productBanner;
  }

  function createProductActions() {
    let productActions = document.createElement("div");
    productActions.classList.add("product__actions");

    let quickView = document.createElement("a");
    quickView.href = "#";
    quickView.classList.add("action__btn");
    quickView.setAttribute("aria-label", "Quick View");
    quickView.innerHTML = `<i class="fi fi-rs-eye"></i>`;

    let addToWishlist = document.createElement("a");
    addToWishlist.href = "#";
    addToWishlist.classList.add("action__btn");
    addToWishlist.setAttribute("aria-label", "Add To Wishlist");
    addToWishlist.innerHTML = `<i class="fi fi-rs-heart"></i>`;

    let compare = document.createElement("a");
    compare.href = "#";
    compare.classList.add("action__btn");
    compare.setAttribute("aria-label", "Compare");
    compare.innerHTML = `<i class="fi fi-rs-shuffle"></i>`;

    productActions.appendChild(quickView);
    productActions.appendChild(addToWishlist);
    productActions.appendChild(compare);

    return productActions;
  }

  function createProductContent(item) {
    let productContent = document.createElement("div");
    productContent.classList.add("product__content");

    let category = document.createElement("span");
    category.classList.add("product__category");
    category.innerHTML = item.category;

    let detailLink = document.createElement("a");
    let title = document.createElement("h3");
    title.classList.add("product__title");
    title.innerHTML = item.title;
    detailLink.appendChild(title);

    let rating = document.createElement("div");
    rating.classList.add("product__rating");

    for (let i = 0; i < 5; i++) {
      let star = document.createElement("i");
      star.classList.add("fi", "fi-rs-star");
      rating.appendChild(star);
    }

    let priceParent = document.createElement("div");
    priceParent.classList.add("product__price", "flex");

    let discount = item.discount;
    if (discount != 0) {
      let newPrice = document.createElement("span");
      newPrice.classList.add("new__price");
      let calcPrice = item.price * ((100 - discount) / 100);
      newPrice.innerHTML = "$" + calcPrice.toFixed(2);
      priceParent.appendChild(newPrice);

      let oldPrice = document.createElement("span");
      oldPrice.classList.add("old__price");
      oldPrice.innerHTML = "$" + item.price;
      priceParent.appendChild(oldPrice);
    } else {
      let price = document.createElement("span");
      price.classList.add("new__price");
      price.innerHTML = "$" + item.price;
      priceParent.appendChild(price);
    }

    let cartBtn = createCartBtn();

    productContent.appendChild(category);
    productContent.appendChild(detailLink);
    productContent.appendChild(rating);
    productContent.appendChild(priceParent);
    productContent.appendChild(cartBtn);

    return productContent;
  }

  function createCartBtn() {
    let cartBtn = document.createElement("a");
    cartBtn.href = "#";
    cartBtn.classList.add("action__btn", "cart__btn");
    cartBtn.setAttribute("aria-label", "Add To Cart");
    cartBtn.innerHTML = `<i class="fi fi-rs-shopping-bag-add"></i>`;

    return cartBtn;
  }

  let pagination = document.querySelector(".pagination");

  function createPagination() {
    pagination.innerHTML = "";

    var totalCount = transferedData.length;
    var paginationCount = totalCount / countOfShowingOnePage;

    for (let i = 0; i < paginationCount; i++) {
      let paginationLink = createSinglePaginationLink(i + 1);
      pagination.appendChild(paginationLink);
    }

    let lastPaginationLink = createLastPaginationLink(paginationCount);
    pagination.appendChild(lastPaginationLink);

    openPage(1);
  }

  function createSinglePaginationLink(value) {
    let paginationLink = document.createElement("li");
    let link = document.createElement("a");
    link.href = "#";
    link.addEventListener("click", () => {
      openPage(value);
    });
    link.classList.add("pagination__link");
    if (value === 1) {
      link.classList.add("active");
    }
    link.innerHTML = value < 10 ? "0" + value : value;

    paginationLink.appendChild(link);

    return paginationLink;
  }

  function createLastPaginationLink(paginationCount) {
    let paginationLink = document.createElement("li");
    let link = document.createElement("a");
    link.href = "#";
    link.classList.add("pagination__link", "icon");
    link.innerHTML = `<i class="fi-rs-angle-double-small-right"></i>`;
    link.addEventListener("click", () => {
      openPage(paginationCount);
    });

    paginationLink.appendChild(link);

    return paginationLink;
  }

  function openPage(value) {
    renderProducts(
      transferedData.filter(
        (p) =>
          p.id >= (value - 1) * countOfShowingOnePage &&
          p.id < countOfShowingOnePage * value
      ),
      totalContainer
    );

    let links = document.querySelectorAll(".pagination__link");
    links.forEach((p) => p.classList.remove("active"));
    links[value - 1].classList.add("active");
  }

  /*=========== Render Shop Products =========*/
  let totalProductCount = document.querySelector("#totalProductCount");
  let totalContainer = document.querySelector("#totalContainer");
  totalProductCount.innerHTML = transferedData.length;

  createPagination();
};
