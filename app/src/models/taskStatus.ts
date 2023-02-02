export class TaskStatus {
  id  : number;
  name: string;

  constructor (params: any) {
    this.id   = params.id;
    this.name = params.name;
  }
  public static ID: taskStatusIds = {
    OUT_STANDING: 1,
    DURING      : 2,
    PENDING     : 3,
    CLOSED      : 4
  } as const;
}

type taskStatusIds = {
  OUT_STANDING: number;
  DURING      : number;
  PENDING     : number;
  CLOSED      : number;
}