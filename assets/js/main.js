/*=============== DATA FETCH ===============*/
window.onload = async function () {
  let originalData = await fetch("assets/data/data.json");
  let categoryData = await fetch("assets/data/categoryData.json");
  let transferedData = await originalData.json();
  let transferedCategoryData = await categoryData.json();

  /*=============== SHOW MENU ===============*/

  /*===== Menu Show =====*/
  /* Validate if constant exists */

  /*===== Hide Show =====*/
  /* Validate if constant exists */

  /*=============== CATEGORY ===============*/

  let categoryContainer = document.querySelector("#categoryContainer");
  function renderCategories(dataArray) {
    categoryContainer.innerHTML = "";
    dataArray.forEach((item) => {
      let categoryItem = createCategoryItem(item);
      categoryContainer.appendChild(categoryItem);
    });
  }

  function createCategoryItem(item) {
    let categoryItem = document.createElement("a");
    categoryItem.classList.add("category__item", "swiper-slide");
    categoryItem.href = "shop.html";

    let categoryImg = document.createElement("img");
    categoryImg.src = item.srcImg;
    categoryImg.classList.add("category__img");

    let categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category__title");
    categoryTitle.innerHTML = item.categoryName;

    categoryItem.appendChild(categoryImg);
    categoryItem.appendChild(categoryTitle);

    return categoryItem;
  }

  /*=============== PRODUCTS ===============*/

  let featuredContainer = document.querySelector("#featuredContainer");
  let popularContainer = document.querySelector("#popularContainer");
  let newContainer = document.querySelector("#newContainer");
  let newArrivalContainer = document.querySelector("#newArrivalContainer");

  function renderProducts(
    dataArray,
    container,
    isPopular = false,
    isNew = false,
    isNewArrivals = false
  ) {
    container.innerHTML = "";
    dataArray.forEach((item) => {
      let productItem = createProductItem(item, isPopular, isNew);
      if (isNewArrivals) {
        productItem.classList.add("swiper-slide");
      }
      container.appendChild(productItem);
    });
  }

  function createProductItem(item, isPopular, isNew) {
    let productItem = document.createElement("div");
    productItem.classList.add("product__item");

    let productBanner = createProductBanner(item, isPopular, isNew);
    let productContent = createProductContent(item);

    productItem.appendChild(productBanner);
    productItem.appendChild(productContent);

    return productItem;
  }

  function createProductBanner(item, isPopular, isNew) {
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

    if (isPopular) {
      let productBadge = document.createElement("div");
      productBadge.classList.add("product__badge", "light-orange");
      productBadge.innerHTML = "Hot";
      productBanner.appendChild(productBadge);
    } else if (isNew) {
      let productBadge = document.createElement("div");
      productBadge.classList.add("product__badge", "light-blue");
      productBadge.innerHTML = "New";
      productBanner.appendChild(productBadge);
    } else {
      if (discount > 0) {
        let productBadge = document.createElement("div");
        productBadge.classList.add("product__badge", "light-green");
        productBadge.innerHTML = `-${discount}%`;
        productBanner.appendChild(productBadge);
      }
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
    var categoryName = transferedCategoryData.find(
      (p) => p.id === item.category
    ).categoryName;

    category.innerHTML = categoryName;

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

    let cartBtn = createCartBtn(item);

    productContent.appendChild(category);
    productContent.appendChild(detailLink);
    productContent.appendChild(rating);
    productContent.appendChild(priceParent);
    productContent.appendChild(cartBtn);

    return productContent;
  }

  function createCartBtn(item) {
    let cartBtn = document.createElement("a");
    cartBtn.classList.add("action__btn", "cart__btn");
    cartBtn.setAttribute("data-id", item.id);
    cartBtn.setAttribute("aria-label", "Add To Cart");
    let i = document.createElement("i");
    i.classList.add("fi", "fi-rs-shopping-bag-add");
    cartBtn.appendChild(i);
    cartBtn.addEventListener("click", addToCart);

    return cartBtn;
  }

  function addToCart(event) {
    const itemId = event.target.getAttribute("data-id");
    console.log(event.target);
    const itemInfo = {
      id: itemId,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cart.findIndex((p) => p.id == itemId);
    if (itemIndex === -1) {
      cart.push(itemInfo);
    } else {
      cart[itemIndex].quantity++;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  /*=============== RENDER ===============*/

  /*=========== Render Categories =========*/
  renderCategories(transferedCategoryData, categoryContainer);

  /*=========== Render Products =========*/
  renderProducts(transferedData, featuredContainer);
  renderProducts(
    transferedData.filter((p) => p.isPopular === true),
    popularContainer,
    true
  );
  renderProducts(
    transferedData.filter((p) => p.isNew === true),
    newContainer,
    false,
    true
  );

  /*=========== Render New Arrival =========*/
  renderProducts(
    transferedData.filter((p) => p.isNew === true),
    newArrivalContainer,
    false,
    true,
    true
  );
};

/*=============== SWIPER CATEGORIES ===============*/
var swiperCategories = new Swiper(".categories__container", {
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1300: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
var swiperProducts = new Swiper(".new__container", {
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1300: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active-tab");
    });

    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });
    tab.classList.add("active-tab");
  });
});
