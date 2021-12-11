import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore/firestore.service';
import { NgbModal,  } from '@ng-bootstrap/ng-bootstrap';
import { categories } from 'app/core/interfaces/categories';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/core/services/auth.service';
import { User } from 'app/core/model/user';
import { MessagealertComponent } from 'app/core/components/messagealert/messagealert.component';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    users: Array<any> = [];
    userForm: FormGroup;

    categoryList = categories;

    constructor(
        private firestoreService: FirestoreService,
        private modal:  NgbModal,
        private formBuilder: FormBuilder,
        private authService: AuthService
      ){

        this.userForm = this.formBuilder.group({
            username: ['' , [Validators.required]],
            // usernameconfirm: ['' , [Validators.required]],
            password: ['' , [Validators.required]],
            passwordconfirm: ['' , [Validators.required]],
            name: ['' , [Validators.required]],
            lastname: ['' , [Validators.required]],
            dni: ['' , [Validators.required , Validators.max(9)]],
            phone: ['' , [Validators.required]],
            category: [0 , [Validators.required]],

          });
    }

    ngOnInit(){
        
        this.listUsers();
    }

    listUsers(){
        this.users = [];
        this.firestoreService.getUsers().subscribe(
            response => {
                this.users = [];
                response.forEach((data: any) => {
                    console.log(data.payload.doc.data());
                    this.users.push( data.payload.doc.data() );

                }); 

            }
        );
    }

    openModalAlert(type){
        const modalRef = this.modal.open(MessagealertComponent);
        modalRef.componentInstance.type = type;
    }

    onSave(){

        console.log(this.userForm.errors);
        
        // let user = new User();

        // user.uid = '';
        // user.date = new Date().toJSON("yyyy/MM/dd HH:mm");
        // user.username = this.userForm.value.username;
        // user.password = this.userForm.value.password;
        // user.name = this.userForm.value.name;
        // user.lastname = this.userForm.value.lastname;
        // user.dni = this.userForm.value.dni;
        // user.phone = this.userForm.value.phone;
        // user.category = this.userForm.value.category;
        // user.categoryName = this.categoryList.find( c => c.categoryId == this.userForm.value.category )?.categoryName;

        // this.authService.SignUp(user).then(
        //     res =>{
        //         console.log(res);
        //         this.modal.dismissAll();
        //     }
        // )
    }
}
