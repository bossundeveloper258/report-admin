import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messagealert',
  templateUrl: './messagealert.component.html',
  styleUrls: ['./messagealert.component.css']
})
export class MessagealertComponent implements OnInit {

  @Input() type: string = 'success';
  
  alerts: Array<any> = [
    { type: 'success' , icon: "nc-check-2", mesanje: "Se proceso correctamente"}
  ];

  classNameIcon: string;
  message: string;
  
  constructor() {

   }

  ngOnInit(): void {
    let alert = this.alerts.filter( t => t.type == this.type );
    if( alert.length > 0){
      this.classNameIcon = alert[0].icon;
      this.message = alert[0].mesanje;
    }
  }

}
