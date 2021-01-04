import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { AdminService } from '../services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = [
    'User ID',
    'First Name',
    'Last Name',
    'Role',
    'Created Date',
    'Action',
  ];
  dataSource: MatTableDataSource<User>;
  error: string;
  searchKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(
      (res) => {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClearSearch() {
    this.searchKey = null;
    this.dataSource = new MatTableDataSource(this.users);
  }

  onDelete(event: string) {
    console.log(event);
  }
}
