import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productForm: FormGroup;
  productDetails: any = [];
  userDisplayName = ''
  data;
  userName;
  isDisabled: boolean = true;

  constructor(private utilityservice: UtilityService,
    private httpclient: HttpClient,
    public actRoute: ActivatedRoute,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    this.productForm = this.fb.group({
      userId: [''],
      id: [''],
      title: ['', Validators.required],
      body: ['', Validators.required]

    });
    this.data = utilityservice.getUserData('userData');
    this.userName = this.data.name;
  }


  ngOnInit(): void { }

  // Catch the product id from child component(product-list)
  productIdParentChange(proId: string) {
    this.isDisabled = false;
    let params = 'posts/' + proId;
    this.utilityservice.get(params).subscribe(data => {
      this.productDetails = data;
      this.productForm.patchValue(this.productDetails);
    }, error => console.log(error));

  }

  clearField() {
    this.isDisabled = true;
    this.productForm.reset();
  }

  //Save data by using post method
  save() {
    let formObj = this.productForm.value;
    let params = 'posts';

    this.isDisabled = false;
    this.utilityservice.post(params, formObj).subscribe(data => {
      this.productDetails = data;
      //By using angular material Open Snackbar Data Save message shown on screen 
      this.utilityservice.openSnackBar('DATA SAVE SUCESSFULLY !!!!');
    }, error => console.log(error));
  }

  //Update data by using put method
  update() {
    let formObj = this.productForm.value;
    let params = 'posts/' + formObj.id;
    this.utilityservice.put(params, formObj).subscribe(data => {
      this.productDetails = data;
      this.productForm.patchValue(this.productDetails);
      this.utilityservice.openSnackBar('DATA UPDATE SUCESSFULLY !!!!');
    }, error => console.log(error));
  }

  //Delete data by using delete method
  delete() {
    let formObj = this.productForm.value;
    let params = 'posts/' + formObj.id;
    this.utilityservice.delete(params, {}).subscribe(data => {
      this.productDetails = data;
      this.clearField();
      this.utilityservice.openSnackBar('DATA DELETE SUCESSFULLY !!!!');
    }, error => console.log(error));
  }


}
