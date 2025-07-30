export class todo_item {
  constructor(title, description, dueDate, priority, notes) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._priority = priority;
    this._notes = notes;
  }
  get dueDate() {
    return this._dueDate;
  }
}

export class project {
  constructor(title, items) {
    this.title = title;
    this.items = items;
  }

}
