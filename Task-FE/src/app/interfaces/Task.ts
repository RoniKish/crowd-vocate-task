export class Task {
  _id: Object;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;

  constructor(id, name, description, status, startDate, endDate) {
    this._id = id
    this.name = name;
    this.description = description;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}