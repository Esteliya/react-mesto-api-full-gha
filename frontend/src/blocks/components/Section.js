export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;//массив данных, которы добавляем на страницу
    this._renderer = renderer;// создание и отрисовка данных на странице
    this._container = document.querySelector(containerSelector);//куда добавляем элемент
  }

  //вставляем в разметку
  addItem(element) {
    this._container.append(element);//вставляем в конец
  }
  addItemStart(element) {
    this._container.prepend(element);//вставляем в начало
  }

  rendererItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}


