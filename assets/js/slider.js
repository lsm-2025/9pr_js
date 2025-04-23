"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector(".cards_cat");
    const cards = Array.from(document.querySelectorAll(".cat_card"));
    const leftArrow = document.querySelector(".slider__arrow.left");
    const rightArrow = document.querySelector(".slider__arrow.right");

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 68;
    const visibleCards = 4;

    function setupInfiniteScroll() {
        // клонируем первые и последние карточки
        cards.slice(0, visibleCards).forEach(card => content.appendChild(card.cloneNode(true)));
        cards.slice(-visibleCards).forEach(card => content.insertBefore(card.cloneNode(true), content.firstChild));

        // начинаем с оригинальных карточек
        currentIndex = visibleCards;
        content.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // обновляем позицию слайдера
    function updateSliderPosition() {
        content.style.transition = "transform 0.3s ease-in-out";
        content.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    // обрабатываем кнопки
    leftArrow.addEventListener("click", () => {
        currentIndex--;
        updateSliderPosition();
        setTimeout(() => checkBounds(), 300);
    });

    rightArrow.addEventListener("click", () => {
        currentIndex++;
        updateSliderPosition();
        setTimeout(() => checkBounds(), 300);
    });

    // проверяем границы для бесконечной прокрутки
    function checkBounds() {
        if (currentIndex >= cards.length + visibleCards) {
            currentIndex = visibleCards;
        } else if (currentIndex < visibleCards) {
            currentIndex = cards.length;
        }
        content.style.transition = "none"; // отключаем анимацию при перепрыгивании
        content.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    setupInfiniteScroll();
});
