<<<<<<< HEAD
import { Component, OnInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
=======
import { Component, OnInit, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
<<<<<<< HEAD
export class LoginComponent implements OnInit {
=======
export class LoginComponent implements OnInit, OnDestroy {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

  itemForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  showPassword = false;

  // ===== Captcha =====
  captchaText = '';
  captchaInput = '';
  captchaVerified = false;
  captchaMessage = 'Captcha verification is required.';
  captchaMessageType = '';
  captchaCharsDisplay: any[] = [];

  // ===== OTP =====
  otpDigits: string[] = ['', '', '', '', '', ''];
  loginLoading = false;

<<<<<<< HEAD
=======
  // ===== NEW: OTP View State =====
  showOtpView = false;
  otpEmail = '';
  otpLoading = false;
  otpMessage = '';
  otpMessageType: 'success' | 'error' | 'warning' | '' = '';

  // ===== NEW: OTP Expiry Timer (5 min) =====
  otpExpirySeconds = 0;
  otpExpiryDisplay = '5:00';
  private expiryInterval: any = null;

  // ===== NEW: Resend Cooldown (60s) =====
  resendCooldown = 0;
  private resendInterval: any = null;

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  // ===== messages =====
  formMessage = '';
  formMessageError = false;

  private isTest = window.location.port === '9876';
  private otpRequestedForUsername = '';

  private captchaChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

  private captchaColors = [
    '#312e81',
    '#4f46e5',
    '#06b6d4',
    '#0f172a',
    '#1d4ed8'
  ];

  @ViewChildren('otpBox') otpBoxes!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private auth: AuthService,
    private router: Router,
    private sessionService: SessionService
<<<<<<< HEAD
  ) {}
=======
  ) { }
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

  ngOnInit() {
    this.generateCaptcha();

    this.itemForm.valueChanges.subscribe(() => {
<<<<<<< HEAD
      if (this.captchaVerified) {
=======
      if (this.captchaVerified && !this.showOtpView) {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        this.captchaVerified = false;
        this.otpRequestedForUsername = '';
        this.resetOtp();
        this.captchaMessage = 'Details changed. Please verify captcha again.';
        this.captchaMessageType = 'warning';
      }
    });
  }

<<<<<<< HEAD
=======
  ngOnDestroy() {
    this.clearAllTimers();
  }

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  trackByIndex = (index: number) => index;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  private getErrorMessage(err: any): string {
    if (!err) return 'Something went wrong';

    if (typeof err === 'string') return err;

    if (err.error) {
      if (typeof err.error === 'string') return err.error;
      if (err.error.message) return err.error.message;
    }

    if (err.message) return err.message;

    return 'Something went wrong';
  }

<<<<<<< HEAD
=======
  // ===== CHECK CAPTCHA ONLY (for "Check" button) =====
  checkCaptcha() {
    if (!this.captchaInput) {
      this.captchaMessage = 'Please enter the captcha code.';
      this.captchaMessageType = 'error';
      return;
    }

    if (this.captchaInput.toLowerCase() !== this.captchaText.toLowerCase()) {
      this.generateCaptcha();
      this.captchaMessage = 'Incorrect captcha. Try again.';
      this.captchaMessageType = 'error';
      return;
    }

    // ✅ Captcha matched
    this.captchaVerified = true;
    this.captchaMessage = 'Captcha verified ✅';
    this.captchaMessageType = 'success';
  }

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomFromArray(arr: string[]): string {
    return arr[this.randomNumber(0, arr.length - 1)];
  }

  private createCaptchaText(length: number): string {
    let text = '';
    for (let i = 0; i < length; i++) {
      text += this.captchaChars[this.randomNumber(0, this.captchaChars.length - 1)];
    }
    return text;
  }

  generateCaptcha() {
    this.captchaText = this.createCaptchaText(6);
    this.captchaVerified = false;
    this.captchaInput = '';
    this.otpRequestedForUsername = '';
    this.resetOtp();
<<<<<<< HEAD

    this.captchaMessage = 'Captcha verification is required.';
    this.captchaMessageType = '';
=======
    this.showOtpView = false;
    this.otpEmail = '';
    this.clearAllTimers();

    this.captchaMessage = 'Captcha verification is required.';
    this.captchaMessageType = '';
    this.formMessage = '';
    this.formMessageError = false;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

    this.captchaCharsDisplay = this.captchaText.split('').map((char) => {
      const rotate = this.randomNumber(-22, 22);
      const moveY = this.randomNumber(-6, 6);
      const moveX = this.randomNumber(-2, 2);

      return {
        char,
        style: {
          transform: `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`,
          color: this.randomFromArray(this.captchaColors)
        }
      };
    });
  }

  onCaptchaInputChange() {
    this.captchaVerified = false;
    this.otpRequestedForUsername = '';
    this.resetOtp();

    this.captchaMessage = this.captchaInput
      ? 'Captcha entered. Click Check to verify.'
      : 'Captcha verification is required.';
<<<<<<< HEAD
=======
    this.captchaMessageType = '';
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  }

  // ✅ VERIFY CAPTCHA + SEND OTP
  verifyCaptcha() {
    this.formMessage = '';
    this.formMessageError = false;

    if (this.itemForm.invalid) {
<<<<<<< HEAD
=======
      this.itemForm.markAllAsTouched();
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      this.formMessage = 'Enter username and password';
      this.formMessageError = true;
      return;
    }

    if (this.captchaInput.toLowerCase() !== this.captchaText.toLowerCase()) {
      this.generateCaptcha();
      this.captchaMessage = 'Incorrect captcha';
      this.captchaMessageType = 'error';
      return;
    }

    if (this.isTest) {
      this.captchaVerified = true;
<<<<<<< HEAD
=======
      this.showOtpView = true;
      this.otpEmail = this.itemForm.value.username + '@test.com';
      this.startExpiryTimer();
      this.startResendCooldown();
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      return;
    }

    this.loginLoading = true;

    this.http.requestLoginOtp(this.itemForm.value).subscribe({
      next: () => {
        this.captchaVerified = true;
        this.otpRequestedForUsername = this.itemForm.value.username!;
<<<<<<< HEAD
=======
        this.otpEmail = this.itemForm.value.username!;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

        this.captchaMessage = 'OTP sent ✅';
        this.captchaMessageType = 'success';

<<<<<<< HEAD
        this.resetOtp();
        setTimeout(() => this.focusOtp(0), 0);
=======
        this.showOtpView = true;
        this.otpMessage = 'A 6-digit code has been sent to your registered email.';
        this.otpMessageType = 'success';

        this.resetOtp();
        this.startExpiryTimer();
        this.startResendCooldown();
        setTimeout(() => this.focusOtp(0), 100);
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

        this.loginLoading = false;
      },
      error: (err) => {
        this.formMessage = this.getErrorMessage(err);
        this.formMessageError = true;

        this.generateCaptcha();
        this.loginLoading = false;
      }
    });
  }

  private resetOtp() {
    this.otpDigits = ['', '', '', '', '', ''];
<<<<<<< HEAD
=======
    this.otpMessage = '';
    this.otpMessageType = '';
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  }

  private getOtpValue() {
    return this.otpDigits.join('');
  }

  private focusOtp(i: number) {
<<<<<<< HEAD
    this.otpBoxes.get(i)?.nativeElement.focus();
=======
    const boxes = this.otpBoxes?.toArray();
    if (boxes && boxes[i]) {
      boxes[i].nativeElement.focus();
    }
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  }

  onOtpInput(e: any, i: number) {
    const val = e.target.value.replace(/\D/g, '');
    this.otpDigits[i] = val ? val[val.length - 1] : '';
<<<<<<< HEAD
    if (this.otpDigits[i] && i < 5) this.focusOtp(i + 1);
  }

  onOtpKeyDown(e: KeyboardEvent, i: number) {
    if (e.key === 'Backspace' && !this.otpDigits[i] && i > 0) {
      this.focusOtp(i - 1);
    }
=======
    e.target.value = this.otpDigits[i];
    if (this.otpDigits[i] && i < 5) {
      setTimeout(() => this.focusOtp(i + 1), 0);
    }
    this.otpMessage = '';
    this.otpMessageType = '';
  }

  onOtpKeyDown(e: KeyboardEvent, i: number) {
    if (e.key === 'Backspace') {
      if (this.otpDigits[i]) {
        this.otpDigits[i] = '';
        (e.target as HTMLInputElement).value = '';
        return;
      }
      if (i > 0) {
        this.focusOtp(i - 1);
        setTimeout(() => {
          this.otpDigits[i - 1] = '';
          const boxes = this.otpBoxes?.toArray();
          if (boxes && boxes[i - 1]) boxes[i - 1].nativeElement.value = '';
        }, 0);
      }
      return;
    }
    if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); this.focusOtp(i - 1); }
    if (e.key === 'ArrowRight' && i < 5) { e.preventDefault(); this.focusOtp(i + 1); }
    if (e.key.length === 1 && !/^[0-9]$/.test(e.key)) { e.preventDefault(); }
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  }

  onOtpPaste(e: ClipboardEvent) {
    const data = e.clipboardData?.getData('text') || '';
    const digits = data.replace(/\D/g, '').slice(0, 6);
<<<<<<< HEAD
    this.otpDigits = digits.split('').concat(Array(6).fill('')).slice(0, 6);
  }

  // ✅ FINAL LOGIN
  submit() {
    if (!this.captchaVerified) {
      this.formMessage = 'Verify captcha first';
      this.formMessageError = true;
      return;
    }

    const otp = this.getOtpValue();
    if (otp.length !== 6) {
      this.formMessage = 'Enter OTP';
      this.formMessageError = true;
      return;
    }

    this.loginLoading = true;
=======
    if (!digits) return;
    e.preventDefault();
    this.otpDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < digits.length; i++) this.otpDigits[i] = digits[i];
    setTimeout(() => {
      const boxes = this.otpBoxes?.toArray();
      if (boxes?.length) {
        for (let i = 0; i < 6; i++) boxes[i].nativeElement.value = this.otpDigits[i] || '';
      }
      this.focusOtp(Math.min(digits.length, 5));
    }, 0);
    this.otpMessage = '';
    this.otpMessageType = '';
  }

  // ===== NEW: TIMERS =====
  private startExpiryTimer() {
    this.clearExpiryTimer();
    this.otpExpirySeconds = 300;
    this.updateExpiryDisplay();

    this.expiryInterval = setInterval(() => {
      this.otpExpirySeconds--;
      this.updateExpiryDisplay();
      if (this.otpExpirySeconds <= 0) {
        this.clearExpiryTimer();
      }
    }, 1000);
  }

  private updateExpiryDisplay() {
    const m = Math.floor(this.otpExpirySeconds / 60);
    const s = this.otpExpirySeconds % 60;
    this.otpExpiryDisplay = `${m}:${s.toString().padStart(2, '0')}`;
  }

  private clearExpiryTimer() {
    if (this.expiryInterval) {
      clearInterval(this.expiryInterval);
      this.expiryInterval = null;
    }
  }

  private startResendCooldown() {
    this.clearResendTimer();
    this.resendCooldown = 60;

    this.resendInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        this.clearResendTimer();
      }
    }, 1000);
  }

  private clearResendTimer() {
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
      this.resendInterval = null;
    }
  }

  private clearAllTimers() {
    this.clearExpiryTimer();
    this.clearResendTimer();
  }

  // ===== NEW: VERIFY OTP (FINAL LOGIN) =====
  verifyOtp() {
    this.otpMessage = '';
    this.otpMessageType = '';

    const otp = this.getOtpValue();
    if (otp.length !== 6) {
      this.otpMessage = 'Please enter the complete 6-digit OTP.';
      this.otpMessageType = 'warning';
      return;
    }

    if (this.otpExpirySeconds <= 0) {
      this.otpMessage = 'OTP expired. Please resend a new code.';
      this.otpMessageType = 'error';
      return;
    }

    this.otpLoading = true;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

    this.http.verifyLoginOtp({
      username: this.itemForm.value.username,
      otp: otp
    }).subscribe({
      next: (res: any) => {
<<<<<<< HEAD
=======
        this.otpMessage = 'Verified! Redirecting...';
        this.otpMessageType = 'success';
        this.clearAllTimers();

>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
        this.auth.saveToken(res.token);
        this.auth.SetRole(res.role);
        this.auth.saveUserId(res.userId);

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
<<<<<<< HEAD
        this.formMessage = this.getErrorMessage(err);
        this.formMessageError = true;
        this.resetOtp();
        this.loginLoading = false;
=======
        this.otpMessage = this.getErrorMessage(err);
        this.otpMessageType = 'error';
        this.resetOtp();
        this.otpLoading = false;
        setTimeout(() => this.focusOtp(0), 100);
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      }
    });
  }

<<<<<<< HEAD
  onSubmit() {
    this.submit();
  }
}
=======
  // ===== NEW: RESEND OTP =====
  resendOtp() {
    if (this.resendCooldown > 0 || this.otpLoading) return;

    this.otpMessage = '';
    this.otpMessageType = '';
    this.otpLoading = true;

    this.http.requestLoginOtp(this.itemForm.value).subscribe({
      next: () => {
        this.otpMessage = 'New OTP sent successfully ✅';
        this.otpMessageType = 'success';
        this.resetOtp();
        this.startExpiryTimer();
        this.startResendCooldown();
        this.otpLoading = false;
        setTimeout(() => this.focusOtp(0), 100);
      },
      error: (err) => {
        this.otpMessage = this.getErrorMessage(err);
        this.otpMessageType = 'error';
        this.otpLoading = false;
      }
    });
  }

  // ===== NEW: BACK TO LOGIN =====
  backToLogin() {
    this.showOtpView = false;
    this.captchaVerified = false;
    this.otpRequestedForUsername = '';
    this.otpEmail = '';
    this.resetOtp();
    this.clearAllTimers();
    this.otpLoading = false;
    this.loginLoading = false;
    this.formMessage = '';
    this.formMessageError = false;
    this.generateCaptcha();
  }

  // ✅ FINAL SUBMIT
  submit() {
    if (this.showOtpView) {
      this.verifyOtp();
    } else {
      this.verifyCaptcha();
    }
  }

  onSubmit() {
    this.submit();
  }
}
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
