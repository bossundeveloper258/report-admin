import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore/firestore.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reports: Array<any> = [];
  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {

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
