import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ProductsDataService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.scss"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;
  searchText;
  categories: any;
  direction: number;
  isDesc = false;
  column;
  productsArray;

  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
    this.categories = ["Price", "Name"];
  }
  sort(property){
    this.productsService.getProductsArray().subscribe(
      (products) => {
      this.productsArray = products
      });
    console.log(this.productsArray);
    this.direction = this.isDesc ? 1 : -1;
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    this.sortProducts();
  }

  sortProducts(){
    var that = this;
    // this.productsService.all()
    // .subscribe(products => {
    //     this.products = products as productsArray[]
    // })
    // this.products = this.products.sort(function(a, b){
    //   if(a[that.column] && b[that.column]) {
    //   if(a[that.column] < b[that.column]){
    //       return -1 * that.direction;
    //   }
    //   else if( a[that.column] > b[that.column]){
    //       return 1 * that.direction;
    //   }
    //   else{
    //       return 0;
    //   }
    // }
    // });
  }

}
