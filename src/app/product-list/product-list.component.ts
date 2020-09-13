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

  // @Input() product;
  // @Output() productIdParent = new EventEmitter<string>();
  //@Output() newItemEvent = new EventEmitter<string>();
  @Output() productIdParent = new EventEmitter();


  // id = this.actRoute.snapshot.params['id'];
  productDetails: any = [];

  constructor(private utilityservice: UtilityService,
    private httpclient: HttpClient,
    public actRoute: ActivatedRoute,
    public router: Router) {

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
