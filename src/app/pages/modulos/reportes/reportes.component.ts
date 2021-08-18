import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  page: number = 1;
  itemsPerPage: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
