export class Project {
  constructor(
    public id: number,
    public report_name: string,
    public project_id: string,
    public emp_id: number,
    public alloc_percent: number,
    public alloc_start: Date,
    public alloc_end: Date,
    public alloc_type: string
  ) {}
}
