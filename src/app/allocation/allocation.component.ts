import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { Report } from '../models/report.model';
import { AllocationsService } from '../services/allocations.service';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css'],
})
export class AllocationComponent implements OnInit {
  reports: Report[];
  displayedColumns: string[] = [
    'report_name',
    'emp_cnt',
    'prjct_cnt',
    'upld_user_id',
    'status',
    'upld_dt',
    'review_dt',
  ];
  dataSource: MatTableDataSource<Report>;
  error: string;
  searchKey: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private allocationService: AllocationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.allocationService.getAllocationReportDetails().subscribe(
      (res) => {
        this.reports = res;
        this.dataSource = new MatTableDataSource<Report>(this.reports);
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
    this.dataSource = new MatTableDataSource<Report>(this.reports);
  }
}
