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

  // registerForm: FormGroup;
  productDetails: any = [];
  productIdChanged
  constructor(private utilityservice: UtilityService,
    private httpclient: HttpClient,
    public actRoute: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder) {
  }

  ngOnInit(): void { }


  productIdParentChange(newItem: string) {
    console.log('Id', newItem);
    this.utilityservice.get('posts/' + newItem).subscribe(data => {

      this.productDetails = data;
      console.log('prod details', this.productDetails);
    }, error => console.log(error));

  }


}
