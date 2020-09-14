import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from '../utility.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailComponent } from '../product-detail/product-detail.component';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productLists: Observable<Array<any>>
  data;
  userName;

  @Output() productIdParent = new EventEmitter();

  productDetails: any = [];

  constructor(private utilityservice: UtilityService,
    private httpclient: HttpClient,
    public actRoute: ActivatedRoute,
    public router: Router) {
    this.data = utilityservice.getUserData('userData');
    this.userName = this.data.name;
    console.log('username', this.userName);
  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productLists = this.utilityservice.get('posts/');
    // this.utilityservice.get({})
    //   .subscribe(
    //     (response: any) => {
    //       if (!response.err_code) {
    //         this.productLists = response;
    //         console.log('product Data', this.productLists);
    //         console.log('Product list Title', this.productLists[0].title);
    //         //  this.pollutantsTemp = response.records;
    //       } else {
    //         console.log("Error in API !!");
    //       }
    //     },
    //   );

  }
  displayProductDetails(product) {

    console.log('id to parent:', product);
    this.productIdParent.emit(product.id);

  }



}
