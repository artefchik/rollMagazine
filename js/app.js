(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const wrapperCards = document.querySelector(".wrapper-basket");
    const cardsRow = document.querySelector(".cards-home__row");
    window.addEventListener("click", (function(event) {
        let counter;
        if (event.target.dataset.action === "plus" || event.target.dataset.action === "minus") {
            const wrapperDetails = event.target.closest(".counter-details");
            counter = wrapperDetails.querySelector("[data-counter]");
        }
        if (event.target.dataset.action === "plus") counter.textContent = ++counter.textContent;
        if (event.target.dataset.action === "minus") if (parseInt(counter.textContent) > 1) counter.textContent = --counter.textContent; else if (event.target.closest(".wrapper-basket") && parseInt(counter.textContent) === 1) {
            event.target.closest(".wrapper-basket__item").remove();
            culcSum();
        }
        if (event.target.closest(".wrapper-basket__item") && event.target.closest(".counter-details__control_basket")) culcSum();
        if (event.target.closest(".cards-home__button")) {
            const cardItem = event.target.closest(".cards-home__item");
            const itemInfo = {
                id: cardItem.dataset.id,
                img: cardItem.querySelector(".cards-home__img").getAttribute("src"),
                title: cardItem.querySelector(".cards-home__title").textContent,
                counter: cardItem.querySelector(".counter-details__current").textContent,
                price: cardItem.querySelector(".price-details__currency").textContent,
                weight: cardItem.querySelector(".price-details__weight").textContent,
                quantity: cardItem.querySelector(".cards-home__quantity").textContent
            };
            const itemInCart = document.querySelector(`[data-card-id="${itemInfo.id}"]`);
            if (itemInCart) {
                const currentElem = itemInCart.querySelector(".counter-details__current_basket");
                currentElem.textContent = parseInt(currentElem.textContent) + parseInt(itemInfo.counter);
            } else {
                const itemHTML = `<div data-card-id='${itemInfo.id}' class="wrapper-basket__item">\n            <a href="" class="wrapper-basket__image"><img src="${itemInfo.img}" alt=""></a>\n            <div class="wrapper-basket__content">\n                <div class="wrapper-basket__title">${itemInfo.title}</div>\n                <div class="wrapper-basket__text">${itemInfo.quantity}/ ${itemInfo.weight}.</div>\n                <div class="wrapper-basket__row">\n                <div data-wrapper class="wrapper-basket__details counter-details counter-details_basket">\n                <button type='button' data-action="minus" class="counter-details__control counter-details__control_basket" >-</button>\n                <div data-counter class="counter-details__current counter-details__current_basket" >${itemInfo.counter}</div>\n                <button type='button' data-action="plus" class="counter-details__control counter-details__control_basket" >+</button>\n            </div>\n                    <div class="wrapper-basket__price">${itemInfo.price}</div>\n                </div>\n                \n            </div>\n        </div>`;
                wrapperCards.insertAdjacentHTML("beforeend", itemHTML);
            }
            culcSum();
            toggleTextbasket();
            const counterItems = document.querySelectorAll(".counter-details__current_null");
            counterItems.forEach((elem => {
                console.log(elem);
                elem.textContent = "1";
            }));
        }
    }));
    function toggleTextbasket() {
        const cardsInWrapper = document.querySelector(".wrapper-basket");
        if (cardsInWrapper.children.length > 0) document.querySelector(".basket-home__text").classList.add("_remove"); else document.querySelector(".basket-home__text").classList.remove("_remove");
    }
    function culcSum() {
        const basketWrapper = document.querySelector(".wrapper-basket");
        const basketPrice = basketWrapper.querySelectorAll(".wrapper-basket__price");
        let totalPrice = 0;
        basketPrice.forEach((elem => {
            const itemCounter = elem.closest(".wrapper-basket__item").querySelector(".counter-details__current_basket");
            totalPrice += parseInt(elem.textContent) * parseInt(itemCounter.textContent);
        }));
        console.log(totalPrice);
        document.querySelector(".price-basket-home__number").textContent = totalPrice + " ₽";
    }
    const arrayProducts = [ {
        id: 1,
        title: "Филадельфия хит ролл",
        itemsInBox: 6,
        weight: 180,
        price: 300,
        imgSrc: "philadelphia.jpg"
    }, {
        id: 2,
        title: "Калифорния темпура",
        itemsInBox: 6,
        weight: 205,
        price: 250,
        imgSrc: "california-tempura.jpg"
    }, {
        id: 3,
        title: "Запеченый ролл «Калифорния»",
        itemsInBox: 6,
        weight: 182,
        price: 230,
        imgSrc: "zapech-california.jpg"
    }, {
        id: 4,
        title: "Филадельфия",
        itemsInBox: 6,
        weight: 230,
        price: 320,
        imgSrc: "philadelphia.jpg"
    } ];
    function renderCards(arrayCards) {
        arrayCards.forEach((elemCard => {
            const elemCardHTML = `<div data-id="${elemCard.id}" class="cards-home__item">\n        <a href="" class="cards-home__image"><img class="cards-home__img" src="img/roll/${elemCard.imgSrc}" alt=""></a>\n        <div class="cards-home__content">\n            <div class="cards-home__title">${elemCard.title}</div>\n            <div class="cards-home__quantity">${elemCard.itemsInBox} шт.</div>\n            <div class="cards-home__details details-cards-home">\n                <div data-wrapper class="details-cards-home__counter counter-details">\n                    <button type='button' data-action="minus" class="counter-details__control">-</button>\n                    <div data-counter class="counter-details__current counter-details__current_null">1</div>\n                    <button type='button'data-action="plus" class="counter-details__control">+</button>\n                </div>\n                <div class="details-cards-home__price price-details">\n                    <div class="price-details__weight">${elemCard.weight}</div>\n                    <div class="price-details__currency">${elemCard.price} ₽</div>\n                </div>\n            </div>\n            <button type="button" class="cards-home__button">в корзину</button>\n        </div>\n    </div>`;
            cardsRow.insertAdjacentHTML("beforeend", elemCardHTML);
        }));
    }
    renderCards(arrayProducts);
    window["FLS"] = true;
    isWebp();
})();