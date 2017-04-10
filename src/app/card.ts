export class Card {
  public id: number;
  public front: string;
  public front_sup: string;
  public back: string;
  public back_sup: string;
  public level: number;
  public learntime: Date;

  constructor(arg: any) {
    this.id = arg.id;
    this.front = arg.front;
    this.front_sup = arg.front_sup;
    this.back = arg.back;
    this.back_sup = arg.back_sup;
    this.level = arg.level;
    this.learntime = arg.learntime;
  }
}
