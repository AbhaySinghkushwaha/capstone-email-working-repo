<<<<<<< HEAD
// import { Component } from "@angular/core";
// import { Validators, FormBuilder } from "@angular/forms";
// import { HttpService } from "../../services/http.service";

// @Component({ selector: 'app-create-products', template: '' })
// export class CreateProductsComponent {

//   products:any[] = [];

// ngOnInit() {
//   let id = Number(localStorage.getItem('userId'));

//   this.http.getProductsByManufacturer(id)
//     .subscribe((res:any)=> this.products = res);
// }

// editProduct(p:any) {
//   this.itemForm.patchValue(p);
// }
// itemForm = this.fb.group({
//   name: [null as any, Validators.required],
//   description: [null as any, Validators.required],
//   price: [null as any, Validators.required],
//   stockQuantity: [null as any, Validators.required]
// });

//   constructor(private fb: FormBuilder,
//               private http: HttpService) {}

//  submit() {
//   if (this.itemForm.invalid) return;

//   let data: any = this.itemForm.value;
//   data.manufacturerId = Number(localStorage.getItem('userId'));

//   this.http.createProduct(data).subscribe();
// }

// onSubmit() {
//   this.submit();   // ✅ REQUIRED
// }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
=======

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  itemForm!: FormGroup;
<<<<<<< HEAD

  userId: number | null = null;

  products: any[] = [];
  filteredProducts: any[] = [];

  editingProductId: number | null = null;

  productSearch = '';

  loading = false;
  submitting = false;

  formMessage = '';
  formMessageError = false;

=======
  userId: number | null = null;
  products: any[] = [];
  filteredProducts: any[] = [];
  editingProductId: number | null = null;
  productSearch = '';
  loading = false;
  submitting = false;
  formMessage = '';
  formMessageError = false;
// Image upload
selectedImage: File | null = null;
imagePreview: string | null = null;
removeExistingImage = false;

// Used when coming from manufacturer dashboard edit button
pendingEditProductId: number | null = null;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpService,
<<<<<<< HEAD
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();

    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]]
    });

    this.loadProducts();

    this.route.queryParams.subscribe(params => {
      const editId = params['editProductId'];

      if (editId) {
        const numericId = Number(editId);

        setTimeout(() => {
          const product = this.products.find(item => Number(item.id) === numericId);

          if (product) {
            this.editProduct(product);
          }
        }, 600);
      }
    });
  }

  // =========================
  // LOAD PRODUCTS
  // =========================

  loadProducts(): void {
    if (!this.userId) {
      this.setMessage('User session not found. Please login again.', true);
      return;
    }

    this.loading = true;

    this.http.getProductsByManufacturer(this.userId).subscribe({
      next: (res: any) => {
        this.products = Array.isArray(res) ? res : [];
        this.filteredProducts = [...this.products];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load manufacturer products', err);
        this.products = [];
        this.filteredProducts = [];
        this.loading = false;
        this.setMessage('Unable to load products from backend.', true);
      }
    });
  }

  // =========================
  // CREATE / UPDATE PRODUCT
  // =========================

  onSubmit(): void {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.setMessage('Please fill all required fields correctly.', true);
      return;
    }

    if (!this.userId) {
      this.setMessage('User session not found. Please login again.', true);
      return;
    }

    const payload = {
      manufacturerId: this.userId,
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      price: Number(this.itemForm.value.price),
      stockQuantity: Number(this.itemForm.value.stockQuantity)
    };

    this.submitting = true;

    if (this.editingProductId) {
      this.http.updateProduct(payload, this.editingProductId).subscribe({
        next: () => {
          this.submitting = false;
          this.setMessage('Product updated successfully.', false);
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Product update failed', err);
          this.submitting = false;
          this.setMessage('Failed to update product.', true);
        }
      });

      return;
    }

    this.http.createProduct(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.setMessage('Product created successfully.', false);
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => {
        console.error('Product creation failed', err);
        this.submitting = false;
        this.setMessage('Failed to create product.', true);
      }
    });
  }

  editProduct(product: any): void {
    this.editingProductId = product.id;

    this.itemForm.patchValue({
      name: product.name || '',
      description: product.description || '',
      price: product.price || null,
      stockQuantity: product.stockQuantity ?? 0
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    this.setMessage(`Editing product #${product.id}. Update details and submit.`, false);
  }

  resetForm(): void {
    this.editingProductId = null;

    this.itemForm.reset({
      name: '',
      description: '',
      price: null,
      stockQuantity: null
    });
  }

  cancelEdit(): void {
    this.resetForm();
    this.setMessage('Edit cancelled.', false);
  }

  // =========================
  // SEARCH
  // =========================

  onProductSearch(value: string): void {
    this.productSearch = value;
    this.applyProductSearch();
  }

  clearSearch(): void {
    this.productSearch = '';
    this.applyProductSearch();
  }

  applyProductSearch(): void {
    const query = this.productSearch.trim().toLowerCase();

    if (!query) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter(product => {
      return [
        product.id,
        product.name,
        product.description,
        product.price,
        product.stockQuantity
      ]
        .map(value => String(value ?? '').toLowerCase())
        .join(' ')
        .includes(query);
    });
  }

  // =========================
  // STATS
  // =========================

  get productCount(): number {
    return this.products.length;
  }

  get totalStock(): number {
    return this.products.reduce((sum, product) => {
      return sum + Number(product.stockQuantity || 0);
    }, 0);
  }

  get inventoryValue(): number {
    return this.products.reduce((sum, product) => {
      return sum + Number(product.price || 0) * Number(product.stockQuantity || 0);
    }, 0);
  }

  // =========================
  // HELPERS
  // =========================

  isInvalid(controlName: string): boolean {
    const control = this.itemForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  setMessage(message: string, isError: boolean): void {
    this.formMessage = message;
    this.formMessageError = isError;
  }

  formatCurrency(value: any): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(Number(value || 0));
  }
}
=======
    private route: ActivatedRoute,
    private router: Router
  ) {}

 ngOnInit(): void {
  this.userId = this.auth.getUserId();

  this.itemForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(1)]],
    stockQuantity: [null, [Validators.required, Validators.min(0)]]
  });

  this.route.queryParams.subscribe(params => {
    const editId = params['editProductId'];
    this.pendingEditProductId = editId ? Number(editId) : null;
  });

  this.loadProducts();
}
loadProducts(): void {
  if (!this.userId) {
    this.setMessage('User session not found.', true);
    return;
  }

  this.loading = true;

  this.http.getProductsByManufacturer(this.userId).subscribe({
    next: (res: any) => {
      this.products = Array.isArray(res) ? res : [];
      this.filteredProducts = [...this.products];
      this.loading = false;

      if (this.pendingEditProductId !== null) {
        const product = this.products.find(
          item => Number(item.id) === Number(this.pendingEditProductId)
        );

        if (product) {
          this.editProduct(product);
        }

        this.pendingEditProductId = null;
      }
    },
    error: () => {
      this.products = [];
      this.filteredProducts = [];
      this.loading = false;
      this.setMessage('Unable to load products.', true);
    }
  });
}
onSubmit(): void {
  if (this.itemForm.invalid) {
    this.itemForm.markAllAsTouched();
    this.setMessage('Please fill all required fields correctly.', true);
    return;
  }

  if (!this.userId) {
    this.setMessage('Session not found.', true);
    return;
  }

  const payload = {
    manufacturerId: this.userId,
    name: this.itemForm.value.name,
    description: this.itemForm.value.description,
    price: Number(this.itemForm.value.price),
    stockQuantity: Number(this.itemForm.value.stockQuantity)
  };

  this.submitting = true;

  if (this.editingProductId) {
    this.http.updateProduct(payload, this.editingProductId).subscribe({
      next: (updatedProduct: any) => {
        const productId = Number(updatedProduct?.id || this.editingProductId);

        this.afterProductSaved(
          productId,
          'Product updated successfully.'
        );
      },
      error: () => {
        this.submitting = false;
        this.setMessage('Failed to update product.', true);
      }
    });

    return;
  }

  this.http.createProduct(payload).subscribe({
    next: (createdProduct: any) => {
      const productId = Number(createdProduct?.id);

      if (!productId) {
        this.submitting = false;
        this.setMessage('Product created but image upload failed because product id was missing.', true);
        this.loadProducts();
        return;
      }

      this.afterProductSaved(
        productId,
        'Product created successfully.'
      );
    },
    error: () => {
      this.submitting = false;
      this.setMessage('Failed to create product.', true);
    }
  });
}

afterProductSaved(productId: number, successMessage: string): void {
  if (this.selectedImage) {
    this.http.uploadProductImage(productId, this.selectedImage).subscribe({
      next: () => {
        this.submitting = false;
        this.setMessage(`${successMessage} Image uploaded successfully.`, false);
        this.resetForm();
        this.loadProducts();
      },
      error: () => {
        this.submitting = false;
        this.setMessage(`${successMessage} But image upload failed.`, true);
        this.resetForm();
        this.loadProducts();
      }
    });

    return;
  }

  if (this.editingProductId && this.removeExistingImage) {
    this.http.deleteProductImage(productId).subscribe({
      next: () => {
        this.submitting = false;
        this.setMessage(`${successMessage} Image removed successfully.`, false);
        this.resetForm();
        this.loadProducts();
      },
      error: () => {
        this.submitting = false;
        this.setMessage(`${successMessage} But image removal failed.`, true);
        this.resetForm();
        this.loadProducts();
      }
    });

    return;
  }

  this.submitting = false;
  this.setMessage(successMessage, false);
  this.resetForm();
  this.loadProducts();
}
  // Image handling
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.setMessage('Please select a valid image file.', true);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        this.setMessage('Image must be under 5MB.', true);
        return;
      }
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }
  removeImage(): void {
  this.selectedImage = null;
  this.imagePreview = null;

  const input = document.getElementById('productImageInput') as HTMLInputElement;
  if (input) {
    input.value = '';
  }

  if (this.editingProductId) {
    this.removeExistingImage = true;
  }
}


getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return '';
  }

  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `${window.location.origin}/project/3689/proxy/3000${imageUrl}`;
}

  triggerFileInput(): void {
    const el = document.getElementById('productImageInput') as HTMLInputElement;
    if (el) el.click();
  }

  editProduct(product: any): void {
    this.editingProductId = product.id;
    this.itemForm.patchValue({
      name: product.name || '',
      description: product.description || '',
      price: product.price || null,
      stockQuantity: product.stockQuantity ?? 0
    });
    // If product has existing image URL
   this.imagePreview = product.imageUrl
  ? this.getImageUrl(product.imageUrl)
  : null;

this.selectedImage = null;
this.removeExistingImage = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setMessage(`Editing product #${product.id}. Update and submit.`, false);
  }
resetForm(): void {
  this.editingProductId = null;

  this.itemForm.reset({
    name: '',
    description: '',
    price: null,
    stockQuantity: null
  });

  this.selectedImage = null;
  this.imagePreview = null;
  this.removeExistingImage = false;

  const input = document.getElementById('productImageInput') as HTMLInputElement;
  if (input) {
    input.value = '';
  }
}
  cancelEdit(): void { this.resetForm(); this.setMessage('Edit cancelled.', false); }

  goBack(): void { this.router.navigate(['/manufacturer-dashboard']); }

  // Search
  onProductSearch(value: string): void { this.productSearch = value; this.applyProductSearch(); }
  clearSearch(): void { this.productSearch = ''; this.applyProductSearch(); }
  applyProductSearch(): void {
    const q = this.productSearch.trim().toLowerCase();
    if (!q) { this.filteredProducts = [...this.products]; return; }
    this.filteredProducts = this.products.filter(p =>
      [p.id, p.name, p.description, p.price, p.stockQuantity].map(v => String(v ?? '').toLowerCase()).join(' ').includes(q)
    );
  }

  // Stats
  get productCount(): number { return this.products.length; }
  get totalStock(): number { return this.products.reduce((s, p) => s + Number(p.stockQuantity || 0), 0); }
  get inventoryValue(): number { return this.products.reduce((s, p) => s + Number(p.price || 0) * Number(p.stockQuantity || 0), 0); }

  // Helpers
  isInvalid(controlName: string): boolean {
    const c = this.itemForm.get(controlName);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
  setMessage(msg: string, isError: boolean): void { this.formMessage = msg; this.formMessageError = isError; }
  formatCurrency(v: any): string {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(v || 0));
  }
  getStockStatusLabel(qty: number): string { return qty === 0 ? 'Out of Stock' : qty < 10 ? 'Low Stock' : 'In Stock'; }
  getStockPercent(p: any): number {
    const s = Number(p?.stockQuantity ?? 0);
    const avg = this.totalStock > 0 && this.productCount > 0 ? (this.totalStock / this.productCount) : 100;
    return Math.min(Math.round((s / Math.max(avg, 1)) * 100), 100);
  }
}
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
