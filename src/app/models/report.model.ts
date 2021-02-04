export class Report {
  constructor(
    public id: number,
    public report_id: number,
    public report_name: string,
    public upld_user_id: number,
    public emp_cnt: number,
    public prjct_cnt: number,
    public status: string,
    public upld_dt: Date,
    public review_dt: Date
  ) {}
}
