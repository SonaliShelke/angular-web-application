import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, public utilityservice: UtilityService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validator: this.MatchPassword
      }

    );
  }
  onSubmit() {
    console.log('formData', this.registerForm.value);

  }

  getData() {

    this.utilityservice.get('')
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
    this.utilityservice.post({})
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
