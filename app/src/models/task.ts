export class Task {
  id          : number;
  title       : string;
  content     : string;
  taskStatusId: number;
  startDate   : Date|null;
  endDate     : Date|null;

  constructor (params: any) {
    this.id           = params.id;
    this.title        = params.title;
    this.content      = params.content;
    this.taskStatusId = params.taskStatusId;
    this.startDate    = params.startDate;
    this.endDate      = params.endDate;
  }
}