import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  data;

  constructor(private fb: FormBuilder,
    public actRoute: ActivatedRoute,
    public router: Router,
    private route: ActivatedRoute, private utilityService: UtilityService) {

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.data = this.utilityService.getUserData('userData');

    //Check whether local storage value(this.data.email)  and form value(this.form.value.username) username is correct or not
    if (this.data && this.form.value.username == this.data.email && this.form.value.password == this.data.password) {
      this.setToken();
      this.router.navigateByUrl('/productdetail');
    }
    else {
      let msg = this.data ? 'Username Password is Incorrect.' : 'Please Register First!!!';
      this.utilityService.openSnackBar(msg);
    }
  }

  //Set the static token in Local Storage 
  setToken() {
    this.utilityService.setUserData('token', 'sshdumytoken')

  }

}
