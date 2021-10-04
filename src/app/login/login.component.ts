import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder} from "@angular/forms";
import { StorageService} from "../core/services/storage.service";
import { Router} from "@angular/router";
import { AuthenticationService } from 'app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public submitted: Boolean = false;

  errorSession: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    if( this.storageService.isAuthenticated() ){
      console.log("cdssdsd")
      this.router.navigate(['/reports'])
    }
  }

  ngOnInit(): void {
    
  }

  get userFormControl() {
    return this.loginForm.controls;
  }

  onLogin(){
    this.submitted = true;
    if (this.loginForm.valid){
      let login = this.authenticationService.login( this.loginForm.get('username').value , this.loginForm.get('password').value );
      console.log( login )
      if( login ){
        this.router.navigate(['/reports'])
      }else{
        this.errorSession = true;
        setTimeout(() => {
          this.errorSession = false;
        }, 2000);
      }
    }
  }

}
