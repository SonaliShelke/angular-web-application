import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { UtilityService } from '../utility.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder, public utilityService: UtilityService, public actRoute: ActivatedRoute,
    public router: Router,
    private route: ActivatedRoute) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      matCheckBox: ['', Validators.required]
    },
      {
        validator: this.MatchPassword
      }
    );
  }

  onSubmit() {
    this.utilityService.setUserData('userData', this.registerForm.value);
    this.router.navigateByUrl('/login');
  }

  getData() {
    this.utilityService.get('')
      .subscribe(
        (response: any) => {
          if (!response.err_code) {
            //  this.pollutants = response.records;
            //  this.pollutantsTemp = response.records;
          } else {
            console.log("Error in API !!");
          }
        },
      );
  }
  postData() {
    this.utilityService.post('', {})
      .subscribe(res => {
        console.log()
      },
        err => { console.log(err); }
      )
  }
  ngOnInit(): void {
  }


  MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    if (AC.get('confirmPassword').touched || AC.get('confirmPassword').dirty) {
      let verifyPassword = AC.get('confirmPassword').value;

      if (password != verifyPassword) {
        AC.get('confirmPassword').setErrors({ MatchPassword: true })
      } else {
        return null
      }
    }
  }

}
