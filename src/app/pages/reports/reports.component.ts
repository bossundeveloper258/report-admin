import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore/firestore.service'
import { FirestorageService } from 'app/core/services/firestorage/firestorage.service'
import { NgbModal,  } from '@ng-bootstrap/ng-bootstrap';
import { Report } from 'app/core/model/report';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'app/core/model/user';
import { report } from 'process';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('reportedit') reportedit: TemplateRef<any>;

  reports: Array<any> = [];

  modalRef: any;

  reportForm: FormGroup;
  public id: string = null;
  categoryList: Array<any> = [
      {id: 1 , name : 'Usuario'}
  ];

  user: User;
  txtsubmit: string = "Nuevo";
  submitted = false;

  save: boolean = true;

  statusName: string;
  status: number;
  imageList: Array<any> = [];
  currentReport: Report;

  reportId: string = "";

  constructor(
    private firestoreService: FirestoreService,
    private modalService:  NgbModal,
    private formBuilder: FormBuilder,
    private firestorageService: FirestorageService
  ) {

    this.reportForm = this.formBuilder.group({
      cod: [{value: '', disabled: true} ],
      agressor: [{value: '', disabled: true} ],
      date: [{value: '', disabled: true} ],
      description: [{value: '', disabled: true} ],
      name: [{value: '', disabled: true} ],
      phone: [{value: '', disabled: true} ],
      placeIncident: [{value: '', disabled: true} ]
      // agressor: [{value: '', disabled: true} ],

    })

   }

  ngOnInit(): void {

    this.firestoreService.getReports().subscribe( 
      response => {
        console.log(this.reports);
        this.reports = [];

        this.firestoreService.getUsers().subscribe(
          responseUsers => {
            let users = [];
            responseUsers.forEach((data: any) => {
              
              users.push( data.payload.doc.data() );
            }); 

            response.forEach((data: any) => {
              console.log(data.payload.doc.data());
              let report = data.payload.doc.data();
              this.reports.push( Object.assign( report, { user: users.find( u => u.uid == report.userId ) })  );
  
            });
            console.log(users);
            console.log(this.reports);
          }
        )
         
      }
    );
  }


  openModal(id){
    this.modalRef  = this.modalService.open(this.reportedit);
    this.reportId = id;
    this.getReportInfo(id);
  }

  get reportFormControl() {
    return this.reportForm.controls;
  }

  private getReportInfo(reportId: string){

    this.txtsubmit = "Editar";
    this.save = false;
    this.firestoreService.getReport(reportId).subscribe(
      response => {
        let report = response.payload.data() as Report;
        this.currentReport = report;
        console.log(report);
        this.reportForm.patchValue(
          {
            cod: reportId,
            agressor: report.aggressor,
            date: report.date,
            description: report.description,
            name: report.name,
            phone: report.phone,
            placeIncident: report.placeIncident,
          }
        );
        this.status = parseInt(report.status);
        this.statusName = report.statusName;
        this.imageList = [];
        this.firestorageService.getFiles(reportId+"/").subscribe(
          res =>{
            console.log(res.items, "@@@@@@@",reportId);
            this.imageList = [];
            let _imageList = [];
            res.items.forEach(item => {
              this.firestorageService.getFileUrl(item.fullPath).subscribe(
                _res => {
                  
                  if(! _imageList.includes(_res) ){
                    _imageList.push(_res);
                    this.imageList.push({
                      url : _res,
                      name: item.name
                    })
                  }
                }
              )
            })
          }
        )

      }
    );

    
  }

  confirm(){
    this.currentReport.status = '2';
    this.currentReport.statusName = 'Recepcionado';
    this.firestoreService.putReport( this.reportId , this.currentReport ).then(
      res => {
        this.modalService.dismissAll();

      }
    );
  }

}
