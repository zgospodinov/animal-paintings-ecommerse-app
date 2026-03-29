import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';



@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.getTotalPrice();
    });

  }

  getTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe();
    this.cartItems = [];
    this.totalPrice = 0;
  }

  checkout(): void {
    this.cartService.checkout(this.cartItems).subscribe(() => {
      this.clearCart();
      alert('Checkout successful!');
    });
  }
}
