"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.cards_cat');
    const cards = Array.from(document.querySelectorAll('.cat_card'));
    const leftArrow = document.querySelector('.slider__arrow.left');
    const rightArrow = document.querySelector('.slider__arrow.right');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 68; // Ширина карточки + отступ
    const visibleCards = 4; // Количество видимых карточек
    
    // клонируем карточки для бесконечной прокрутки
    function setupInfiniteScroll() {
        // клонируем первые 4 карточки и добавляем их в конец
        cards.slice(0, visibleCards).forEach(card => {
            const clone = card.cloneNode(true);
            content.appendChild(clone);
        });
        
        // клонируем последние 4 карточки и добавляем их в начало
        cards.slice(-visibleCards).forEach(card => {
            const clone = card.cloneNode(true);
            content.insertBefore(clone, content.firstChild);
        });
        
        // сдвигаем слайдер на 4 карточки вправо, чтобы начать с оригинальных карточек
        currentIndex = visibleCards;
        content.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    // обновление позиции слайдера
    function updateSliderPosition(withAnimation = true) {
        if (!withAnimation) {
            content.style.transition = 'none';
        } else {
            content.style.transition = 'transform 0.3s ease-in-out';
        }
        
        content.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    // обработка бесконечной прокрутки
    function handleInfiniteScroll() {
        if (currentIndex >= cards.length + visibleCards) {
            currentIndex = visibleCards;
            updateSliderPosition(false);
        }
        else if (currentIndex <= 0) {
            currentIndex = cards.length;
            updateSliderPosition(false);
        }
    }
    
    leftArrow.addEventListener('click', () => {
        currentIndex--;
        updateSliderPosition();
        
        setTimeout(() => {
            handleInfiniteScroll();
        }, 300);
    });
    
    rightArrow.addEventListener('click', () => {
        currentIndex++;
        updateSliderPosition();
        
        setTimeout(() => {
            handleInfiniteScroll();
        }, 300);
    });
    
    content.addEventListener('transitionend', () => {
        if (content.style.transition === 'none') {
            content.style.transition = 'transform 0.3s ease-in-out';
        }
    });
    
    setupInfiniteScroll();
});