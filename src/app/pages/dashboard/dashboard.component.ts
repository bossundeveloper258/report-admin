import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { FirestoreService } from 'app/core/services/firestore/firestore.service'

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  reports: Array<any> = [];

  constructor(
    private firestoreService: FirestoreService
  ){

  }
    ngOnInit(){
      this.firestoreService.getReports().subscribe( 
        response => {
          console.log(this.reports);
          this.reports = [];
          response.forEach((data: any) => {
              console.log(data.payload.doc.data());
              this.reports.push( data.payload.doc.data() );

          }); 
        }
      );
      
    }
}
