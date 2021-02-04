import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project.model';
import { AllocationsService } from 'src/app/services/allocations.service';

@Component({
  selector: 'app-edit-allocation',
  templateUrl: './edit-allocation.component.html',
  styleUrls: ['./edit-allocation.component.css'],
})
export class EditAllocationComponent implements OnInit {
  projects: Project[];
  displayedColumns: string[] = [
    'project_id',
    'emp_id',
    'alloc_percent',
    'alloc_type',
    'alloc_start',
    'alloc_end',
    'Action',
  ];
  dataSource: MatTableDataSource<Project>;
  error: string;
  searchKey: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private toastr: ToastrService,
    private allocationService: AllocationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEmpReport();
  }

  getEmpReport() {
    this.allocationService
      .getEmpAllocationDetails(this.route.snapshot.paramMap.get('report_name'))
      .subscribe(
        (res) => {
          this.projects = res;
          this.dataSource = new MatTableDataSource<Project>(this.projects);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        (err) => {
          this.toastr.error(err);
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClearSearch() {
    this.searchKey = null;
    this.dataSource = new MatTableDataSource<Project>(this.projects);
  }
}
