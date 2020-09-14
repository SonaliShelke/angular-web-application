import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilityService } from '../utility.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



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

  //Get the Product List by using post method
  getProductList() {
    this.productLists = this.utilityservice.get('posts/');
  }

  setProductDetails(product) {
    //Passing data from child(Product-list) to Parent(Product-detais)
    this.productIdParent.emit(product.id);
  }



}
