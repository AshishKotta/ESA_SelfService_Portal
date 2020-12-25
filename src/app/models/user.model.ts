export class User {
  constructor(
    public id: number,
    public user_id: number,
    public password: string,
    public first_name: string,
    public last_name: string,
    public role: string
  ) {}
}
