import {
  Component,
  ViewChildren,
  QueryList,
<<<<<<< HEAD
  ElementRef
=======
  ElementRef,
  OnInit
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
<<<<<<< HEAD
export class RegistrationComponent {
=======
export class RegistrationComponent implements OnInit {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

  @ViewChildren('otpBox') otpBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  itemForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: [null as any, Validators.required]
  });

<<<<<<< HEAD
=======
  // Optional UI fields (your HTML uses these)
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  companyName = '';
  phone = '';
  confirmPassword = '';

  showPassword = false;
  showConfirmPassword = false;

<<<<<<< HEAD
  formMessage = '';
  formMessageError = false;

  // ================= OTP VARIABLES =================

=======
  // ✅ These are used in your HTML (your build error was missing these)
  formMessage = '';
  formMessageError = false;

  // ================= OTP STATE =================
  otpSectionVisible = false; // OTP card should show only after Verify click success
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  otpDigits: string[] = ['', '', '', '', '', ''];
  otpVerified = false;
  verifiedEmail = '';
  otpLoading = false;
  verifyLoading = false;
<<<<<<< HEAD
  otpMessage = '';
  otpMessageType: 'success' | 'error' | 'warning' | '' = '';

=======

  otpMessage = '';
  otpMessageType: 'success' | 'error' | 'warning' | '' = '';

  // ✅ Timer properties used in your HTML
  otpTimer = 60;
  canResendOtp = false;
  private otpInterval: any = null;

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {}

<<<<<<< HEAD
  // ================= PASSWORD TOGGLE =================

=======
  ngOnInit(): void {
    // If email changes after OTP sent/verified, reset OTP state
    this.itemForm.get('email')?.valueChanges.subscribe(() => {
      if (this.otpSectionVisible || this.otpVerified) {
        this.resetOtpState(true);
        this.otpMessage = 'Email changed. Please verify again.';
        this.otpMessageType = 'warning';
      }
    });
  }

  // ================= PASSWORD TOGGLE =================
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  trackByIndex(index: number): number {
    return index;
  }

<<<<<<< HEAD
  // ================= SEND OTP =================

  sendOtp() {
    const email = this.itemForm.get('email')?.value;

=======
  // ================= SEND OTP (Verify button) =================
  sendOtp() {
    const email = this.itemForm.get('email')?.value;

    this.formMessage = '';
    this.formMessageError = false;
    this.otpMessage = '';
    this.otpMessageType = '';

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    if (!email || this.itemForm.get('email')?.invalid) {
      this.formMessage = 'Please enter a valid email address first.';
      this.formMessageError = true;
      return;
    }

    this.verifyLoading = true;
<<<<<<< HEAD
=======

    // Reset OTP verification state (new OTP)
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    this.otpVerified = false;
    this.verifiedEmail = '';
    this.resetOtpInputs();

    this.http.sendOtp({ email }).subscribe({
      next: (res: any) => {
        this.verifyLoading = false;

<<<<<<< HEAD
        this.otpMessage = res?.message || 'OTP sent successfully. Please check your email.';
        this.otpMessageType = 'success';

        this.formMessage = '';
        this.formMessageError = false;

=======
        // ✅ Show OTP UI only after OTP is successfully sent
        this.otpSectionVisible = true;

        this.otpMessage = res?.message || 'OTP sent successfully. Please check your email.';
        this.otpMessageType = 'success';

        // Start resend cooldown timer
        this.startOtpTimer();

        // Focus first OTP box
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        this.focusOtpBox(0);
      },
      error: (err) => {
        this.verifyLoading = false;

<<<<<<< HEAD
=======
        this.otpSectionVisible = false;

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        this.otpMessage = err?.error?.message || 'Failed to send OTP. Please try again.';
        this.otpMessageType = 'error';

        this.formMessage = this.otpMessage;
        this.formMessageError = true;
      }
    });
  }

<<<<<<< HEAD
  // ================= OTP INPUT HELPERS =================

  private focusOtpBox(index: number) {
    queueMicrotask(() => {
      const boxes = this.otpBoxes?.toArray();

=======
  // ================= TIMER =================
  private startOtpTimer() {
    this.otpTimer = 60;
    this.canResendOtp = false;

    if (this.otpInterval) {
      clearInterval(this.otpInterval);
    }

    this.otpInterval = setInterval(() => {
      this.otpTimer--;
      if (this.otpTimer <= 0) {
        clearInterval(this.otpInterval);
        this.otpInterval = null;
        this.canResendOtp = true;
      }
    }, 1000);
  }

  // ================= OTP INPUT HELPERS =================
  private focusOtpBox(index: number) {
    queueMicrotask(() => {
      const boxes = this.otpBoxes?.toArray();
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      if (boxes && boxes[index]) {
        boxes[index].nativeElement.focus();
      }
    });
  }

  private resetOtpInputs() {
    this.otpDigits = ['', '', '', '', '', ''];
<<<<<<< HEAD
    this.otpMessage = '';
    this.otpMessageType = '';

    queueMicrotask(() => {
      const boxes = this.otpBoxes?.toArray();

      if (boxes?.length) {
        boxes.forEach(b => b.nativeElement.value = '');
      }
    });
  }

  getOtpCode(): string {
    return this.otpDigits.join('');
  }

  isOtpComplete(): boolean {
=======
    queueMicrotask(() => {
      const boxes = this.otpBoxes?.toArray();
      if (boxes?.length) boxes.forEach(b => (b.nativeElement.value = ''));
    });
  }

  private getOtpCode(): string {
    return this.otpDigits.join('');
  }

  private isOtpComplete(): boolean {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    return this.otpDigits.every(d => /^[0-9]$/.test(d));
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const raw = (input.value || '').replace(/\D/g, '');
    const digit = raw ? raw[raw.length - 1] : '';

    this.otpDigits[index] = digit;
    input.value = digit;

<<<<<<< HEAD
    if (digit && index < 5) {
      this.focusOtpBox(index + 1);
    }
=======
    if (digit && index < 5) this.focusOtpBox(index + 1);
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

    this.otpMessage = '';
    this.otpMessageType = '';
  }

  onOtpKeyDown(event: KeyboardEvent, index: number) {
    const key = event.key;

    if (key === 'Backspace') {
      if (this.otpDigits[index]) {
        this.otpDigits[index] = '';
        (event.target as HTMLInputElement).value = '';
        return;
      }

      if (index > 0) {
<<<<<<< HEAD
        this.otpDigits[index - 1] = '';
        this.focusOtpBox(index - 1);

        queueMicrotask(() => {
          const boxes = this.otpBoxes?.toArray();

          if (boxes && boxes[index - 1]) {
            boxes[index - 1].nativeElement.value = '';
          }
        });
      }

=======
        this.focusOtpBox(index - 1);
        queueMicrotask(() => {
          const boxes = this.otpBoxes?.toArray();
          if (boxes && boxes[index - 1]) boxes[index - 1].nativeElement.value = '';
        });
      }
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      return;
    }

    if (key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusOtpBox(index - 1);
<<<<<<< HEAD
      return;
=======
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    }

    if (key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      this.focusOtpBox(index + 1);
<<<<<<< HEAD
      return;
=======
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    }

    if (key.length === 1 && !/^[0-9]$/.test(key)) {
      event.preventDefault();
    }
  }

  onOtpPaste(event: ClipboardEvent) {
<<<<<<< HEAD
    const text = (event.clipboardData?.getData('text') || '')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (!text) {
      return;
    }
=======
    const text = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!text) return;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

    event.preventDefault();

    this.otpDigits = ['', '', '', '', '', ''];
<<<<<<< HEAD

    for (let i = 0; i < text.length; i++) {
      this.otpDigits[i] = text[i];
    }

    queueMicrotask(() => {
      const boxes = this.otpBoxes?.toArray();

      if (boxes?.length) {
        for (let i = 0; i < 6; i++) {
          boxes[i].nativeElement.value = this.otpDigits[i] || '';
        }
      }

=======
    for (let i = 0; i < text.length; i++) this.otpDigits[i] = text[i];

    queueMicrotask(() => {
      const boxes = this.otpBoxes?.toArray();
      if (boxes?.length) {
        for (let i = 0; i < 6; i++) boxes[i].nativeElement.value = this.otpDigits[i] || '';
      }
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      this.focusOtpBox(Math.min(text.length, 5));
    });

    this.otpMessage = '';
    this.otpMessageType = '';
  }

  // ================= VERIFY OTP =================
<<<<<<< HEAD

=======
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  verifyOtp() {
    const email = this.itemForm.get('email')?.value;

    if (!email || this.itemForm.get('email')?.invalid) {
      this.otpMessage = 'Please enter a valid email first.';
      this.otpMessageType = 'error';
      return;
    }

    if (!this.isOtpComplete()) {
      this.otpMessage = 'Please enter the complete 6-digit OTP.';
      this.otpMessageType = 'warning';
      return;
    }

    this.otpLoading = true;
    this.otpMessage = '';
    this.otpMessageType = '';

<<<<<<< HEAD
    this.http.verifyOtp({
      email,
      otp: this.getOtpCode()
    }).subscribe({
=======
    this.http.verifyOtp({ email, otp: this.getOtpCode() }).subscribe({
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      next: (res: any) => {
        this.otpLoading = false;

        this.otpVerified = true;
        this.verifiedEmail = email;

        this.otpMessage = res?.message || 'Email verified successfully!';
        this.otpMessageType = 'success';

<<<<<<< HEAD
        this.formMessage = '';
        this.formMessageError = false;
=======
        // Stop timer once verified
        if (this.otpInterval) {
          clearInterval(this.otpInterval);
          this.otpInterval = null;
        }
        this.canResendOtp = false;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      },
      error: (err) => {
        this.otpLoading = false;

<<<<<<< HEAD
=======
        // Keep OTP section visible for retry
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        this.otpVerified = false;
        this.verifiedEmail = '';

        this.otpMessage = err?.error?.message || 'Invalid or expired OTP.';
        this.otpMessageType = 'error';

        this.resetOtpInputs();
        this.focusOtpBox(0);
      }
    });
  }

<<<<<<< HEAD
  // ================= REGISTER =================

=======
  private resetOtpState(hideSection: boolean) {
    this.otpVerified = false;
    this.verifiedEmail = '';
    this.otpLoading = false;
    this.verifyLoading = false;

    if (this.otpInterval) {
      clearInterval(this.otpInterval);
      this.otpInterval = null;
    }

    this.canResendOtp = false;
    this.otpTimer = 60;

    if (hideSection) this.otpSectionVisible = false;
    this.resetOtpInputs();
  }

  // ================= REGISTER =================
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  submit() {
    this.formMessage = '';
    this.formMessageError = false;

    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.formMessage = 'Please fill all required fields correctly.';
      this.formMessageError = true;
      return;
    }

<<<<<<< HEAD
    const email = this.itemForm.value.email;
    const password = this.itemForm.value.password;
=======
    const email = this.itemForm.value.email as string;
    const password = this.itemForm.value.password as string;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

    if (this.confirmPassword && password !== this.confirmPassword) {
      this.formMessage = 'Password and confirm password do not match.';
      this.formMessageError = true;
      return;
    }

<<<<<<< HEAD
    if (!this.isOtpComplete()) {
      this.formMessage = 'Please enter the 6-digit OTP.';
      this.formMessageError = true;
      return;
    }

=======
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    if (!this.otpVerified || this.verifiedEmail !== email) {
      this.formMessage = 'Please verify your email OTP before registration.';
      this.formMessageError = true;
      return;
    }

<<<<<<< HEAD
    const payload = {
      ...this.itemForm.value,
      phone: this.phone,
      otp: this.getOtpCode()
    };

    this.http.registerUser(payload).subscribe({
=======
    // Send only what backend expects (User fields)
    this.http.registerUser(this.itemForm.value).subscribe({
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      next: () => {
        alert('Registration Successful ✅ Check your email');
        this.router.navigate(['/login']);
      },
      error: (err) => {
<<<<<<< HEAD
        console.error(err);
        this.formMessage = err?.error?.message || 'Registration failed. Username or email may already exist.';
        this.formMessageError = true;
        alert('Registration failed ❌');
=======
        this.formMessage = err?.error?.message || 'Registration failed. Username or email may already exist.';
        this.formMessageError = true;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      }
    });
  }

  onSubmit() {
    this.submit();
  }

  goToLogin() {
<<<<<<< HEAD
    this.router.navigate(['/login']);
=======
    this.router.navigate(['/login']);  
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  }
}