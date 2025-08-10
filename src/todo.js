let id = 0

export function getUniqueId()  {
  return id++ + '';
}

export class todoItem {
  constructor(title, description, dueDate, priority, notes) {
    this._id = getUniqueId();
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
  }
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get dueDate() {
    return this._dueDate;
  }
  get priority() {
    return this._priority;
  }
  get notes() {
    return this._notes;
  }

  set title(value) {
    this._title = value;
  }
  set description(value) {
    this._description = value;
  }
  set dueDate(value) {
    this._dueDate = value;
  }
  set priority(value) {
    this._priority = value;
  }
}

export class project {
  constructor(title, items) {
    this._title = title;
    this._items = items;
  }

  get title() {
    return this._title;
  }

  get items() {
    return this._items;
  }

  set items(array) {
    this._items = array;
  }

  addItem(todoItem) {
    this._items.push(todoItem)
  }

}
