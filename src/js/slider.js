export class MySlider {
  constructor(data) {
    this.data = data;
  }

  getUsers(arg) {
    return arg ? this.data.filter((obj) => obj.followed) : this.data;
  }

  createSliderBullets(container, count) {
    if (count) {
      container.innerHTML = '';
    }
    for (let i = 0; i < count; i++) {
      const $node = `
      <button class="glide__bullet slider__bullets-bullet" data-glide-dir="=${i}"></button>
    `;
      container.insertAdjacentHTML('beforeend', $node);
    }
  }

  createSliderItems(arg, container, bulletsContainer) {
    if (container.children.length) {
      container.innerHTML = '';
    }
    const data = this.getUsers(arg);
    data.forEach((obj) => {
      const $node = `
          <li class="slider__list-item item">
            <img class="item__bg" src="./images/content/LItemBg${obj.id}.png" alt="bg-img">
            <img class="item__photo" src="./images/content/LItemUser${obj.id}.png" alt="user-photo">
            <p class="item__name">${obj.name}</p>
            <p class="item__count">${obj.price}<span> Artwork</span></p>
            <button class="item__btn button ${obj.followed ? 'item__btn-bordered' : ''}">${
        obj.followed ? 'Followed' : 'Follow'
      }</button>
          </li>
        `;
      container.insertAdjacentHTML('beforeend', $node);
    });
    this.createSliderBullets(bulletsContainer, container.children.length);
  }
}
