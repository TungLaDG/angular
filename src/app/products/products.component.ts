import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  updateProduct: any = null;
  newProduct: any = { name: '', price: 0, stock_quantity: 0, description: '' };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response.data;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe(
      response => {
        this.loadProducts();
        this.newProduct = { name: '', price: 0, stock_quantity: 0, description: '' };
      },
      error => {
        console.error('Error adding product', error);
      }
    );
  }

  prepareUpdate(product: any): void {
    this.updateProduct = { ...product };
  }

  updateProductAction(): void {
    if (this.updateProduct) {
      const { id, ...updatePayload } = this.updateProduct;
      this.productService.updateProduct(id, updatePayload).subscribe(
        response => {
          this.loadProducts();
          this.updateProduct = null;
        },
        error => {
          console.error('Error updating product', error);
        }
      );
    }
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(
      response => {
        this.loadProducts();
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }

  cancelUpdate(): void {
    this.updateProduct = null;
  }
}
