import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl } from '@angular/forms';
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

    if (this.data && this.form.value.username == this.data.email && this.form.value.password == this.data.password) {
      this.setToken();
      this.router.navigateByUrl('/productdetail');
      console.log('from value', this.form.value);
    }
    else {
      let msg = this.data ? 'Username Password is Incorrect.' : 'Please Register First!!!';
      this.utilityService.openSnackBar(msg);
    }
  }

  setToken() {
    this.utilityService.setUserData('token', 'sshdumytoken')

  }

}
