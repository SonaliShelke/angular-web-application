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
  }

  ngOnInit(): void { }

  productIdParentChange(newItem: string) {
    console.log('Id', newItem);
    let params = 'posts/' + newItem;
    this.utilityservice.get(params).subscribe(data => {
      this.productDetails = data;
      console.log('prod details', this.productDetails);
      this.productForm.patchValue(this.productDetails);
    }, error => console.log(error));
  }
  clearField() {
    this.productForm.reset();
  }

  save() {
    let formObj = this.productForm.value;
    let params = 'posts';
    this.utilityservice.post(params, formObj).subscribe(data => {

      this.productDetails = data;
      console.log('prod details', this.productDetails);
      this.utilityservice.openSnackBar('save  sucessfully');
    }, error => console.log(error));
  }

  update() {
    let formObj = this.productForm.value;
    let params = 'posts/' + formObj.id;
    this.utilityservice.put(params, formObj).subscribe(data => {
      this.productDetails = data;
      console.log('prod details', this.productDetails);
      this.productForm.patchValue(this.productDetails);
      this.utilityservice.openSnackBar('update sucessfully');
    }, error => console.log(error));
  }

  delete() {
    let formObj = this.productForm.value;
    let params = 'posts/' + formObj.id;
    this.utilityservice.delete(params, {}).subscribe(data => {
      this.productDetails = data;
      console.log('prod details', this.productDetails);
      this.utilityservice.openSnackBar('delete sucessfully');

    }, error => console.log(error));
  }


  onSubmit() { }


}
