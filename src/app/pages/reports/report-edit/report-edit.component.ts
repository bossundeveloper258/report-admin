import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore/firestore.service'
import { FirestorageService } from 'app/core/services/firestorage/firestorage.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/core/model/user';
import { CustomvalidationService } from 'app/core/services/customvalidation';
import { AuthService } from 'app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagealertComponent } from 'app/core/components/messagealert/messagealert.component';
import { Report } from 'app/core/model/report';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css']
})
export class ReportEditComponent implements OnInit {

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

  constructor(
      private firestoreService: FirestoreService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private customValidator: CustomvalidationService,
      private authService: AuthService,
      private modal:  NgbModal,
      private router: Router,
      private firestorageService: FirestorageService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.reportForm = this.formBuilder.group({
      agressor: [{value: '', disabled: true} ],
      date: [{value: '', disabled: true} ],
      description: [{value: '', disabled: true} ],
      name: [{value: '', disabled: true} ],
      phone: [{value: '', disabled: true} ],
      placeIncident: [{value: '', disabled: true} ],
     
      code: [{value: '', disabled: true} ],
      date_created: [{value: '', disabled: true} ],
      lastname: [{value: '', disabled: true} ],
      dni: [{value: '', disabled: true} ],
      category: [{value: '', disabled: true} ],
    })

  }

  ngOnInit(): void {
    if( this.id != null) this.getReportInfo(this.id);
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
        
        
        this.firestoreService.getUser(report.userId).subscribe(
          res => {
            
            
            let currentUser = Object.assign({}, res.payload.data() as User);

            console.log(currentUser)
            this.reportForm.patchValue(
              {
                agressor: report.aggressor,
                date: report.date,
                description: report.description,
                name: currentUser.name,
                phone: currentUser.phone,
                placeIncident: report.placeIncident,
                code: report.id,
                category: currentUser.categoryName,
                lastname: currentUser.lastname,
                dni: currentUser.dni,
              }
            );
          }
        )
        
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
    this.firestoreService.putReport( this.id , this.currentReport ).then(
      res => {
        this.router.navigate[('/reports')]

      }
    );
  }

}
