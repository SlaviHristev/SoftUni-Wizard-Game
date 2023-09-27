function collision(firstElement, secondElement){
    let firstEl = firstElement.getBoundingClientRect();
    let secondEl = secondElement.getBoundingClientRect();

    const firstTop = firstEl.top + window.scrollY;
    const firstBottom = firstEl.bottom + window.scrollY;
    const firstLeft = firstEl.left + window.scrollX;
    const firstRight = firstEl.right + window.scrollX;
    
    return !(firstTop > secondEl.bottom ||
        firstBottom < secondEl.top ||
        firstRight < secondEl.left ||
        firstLeft > secondEl.right);
}