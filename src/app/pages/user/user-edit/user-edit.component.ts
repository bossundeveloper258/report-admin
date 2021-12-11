import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'app/core/services/firestore/firestore.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/core/model/user';
import { CustomvalidationService } from 'app/core/services/customvalidation';
import { AuthService } from 'app/core/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagealertComponent } from 'app/core/components/messagealert/messagealert.component';
import { categories } from 'app/core/interfaces/categories';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  public id: string = null;
  categoryList = categories;

  user: User;
  txtsubmit: string = "Nuevo";
  submitted = false;

  save: boolean = true;

  constructor(
      private firestoreService: FirestoreService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private customValidator: CustomvalidationService,
      private authService: AuthService,
      private modal:  NgbModal,
      private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.userForm = this.formBuilder.group({
      username: [{value: '', disabled: this.id != null ? true : false} , [Validators.required, Validators.email]],
      // usernameconfirm: ['' , [Validators.required]],
      password: [{value: '', disabled: this.id != null ? true : false} , [Validators.required, this.customValidator.patternValidator() ]],
      passwordconfirm: [{value: '', disabled: this.id != null ? true : false} , [Validators.required , this.customValidator.patternValidator()]],
      name: ['' , [Validators.required]],
      lastname: ['' , [Validators.required]],
      dni: ['' , [Validators.required , Validators.maxLength(8), Validators.pattern('^[0-9]{8}$')]],
      phone: ['' , [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      category: [null, [Validators.required]],

    },{
      validators: this.customValidator.MatchPassword('password','passwordconfirm')
    });
   }
  get userFormControl() {
    return this.userForm.controls;
  }
  ngOnInit(): void {
    if( this.id != null) this.getUserInfo(this.id);
  }

  private getUserInfo(userId: string){
    this.txtsubmit = "Editar";
    this.save = false;
    this.firestoreService.getUser(userId).subscribe(
      response => {
        this.user = response.payload.data() as User;

        this.userForm.patchValue(
          {
            username: this.user.username,
            password: this.user.password,
            passwordconfirm: this.user.password,
            name: this.user.name,
            lastname: this.user.lastname,
            dni: this.user.dni,
            phone: this.user.phone,
            category: this.user.category,
          }
        );

      }
    );
  }

  saveUser(){
    this.submitted = true;
    console.log(this.userForm)
    if (this.userForm.valid) {
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.log(this.parseUserForm());
      if(this.save){
        this.authService.SignUp( this.parseUserForm() ).then(
          res =>{
              this.openModalAlert('success');
              this.router.navigate(['/user'])
          }
        ).catch(
          error=>{

          }
        )
      }else{
        this.firestoreService.putUser( this.id , this.parseUserForm() ).then(
          res => {
            this.openModalAlert('success');

          }
        );
      }
    }
  }

  private parseUserForm(): User{
    console.log(this.userForm.value, "#######")
    let user = new User();
    user.uid = this.id == null ? '' : this.id;
    user.date = new Date().toJSON("yyyy/MM/dd HH:mm");
    user.username = this.id == null ? this.userForm.value.username : this.user.username;
    user.password = this.id == null ? this.userForm.value.password : this.user.password;
    user.name = this.userForm.value.name;
    user.lastname = this.userForm.value.lastname;
    user.dni = this.userForm.value.dni;
    user.phone = this.userForm.value.phone;
    user.category = this.userForm.value.category;
    user.categoryName = this.categoryList.find( c => c.categoryId == this.userForm.value.category )?.categoryName;
    return user;
  }

  openModalAlert(type){
    const modalRef = this.modal.open(MessagealertComponent);
    modalRef.componentInstance.type = type;
  }
}
