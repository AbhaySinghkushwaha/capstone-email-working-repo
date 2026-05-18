import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
=======
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

<<<<<<< HEAD
  IsLoggin: boolean = false;
  roleName: string | null = null;
  showGlobalNavbar: boolean = false;

  private fullScreenDashboardRoutes: string[] = [
    '/manufacturer-dashboard',
    '/wholesaler-dashboard',
    '/consumer-dashboard'
=======
  IsLoggin = false;
  roleName: string | null = null;
  showGlobalNavbar = false;

  private fullScreenRoutes: string[] = [
    '/manufacturer-dashboard',
    '/wholesaler-dashboard',
    '/consumer-dashboard',
    '/consumer-get-orders',
    '/consumer-place-order',
    '/create-product'
  ];

  private publicRoutes: string[] = [
    '/',
    '/login',
    '/registration'
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

<<<<<<< HEAD
  ngOnInit() {
=======
  ngOnInit(): void {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    this.loadUserData();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadUserData();
      });
  }

<<<<<<< HEAD
  loadUserData() {
=======
  loadUserData(): void {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    this.IsLoggin = this.authService.getLoginStatus;
    this.roleName = this.authService.getRole;

    const currentUrl = this.router.url.split('?')[0];

<<<<<<< HEAD
    const publicRoutes = ['/login', '/registration'];

    if (!this.IsLoggin && !publicRoutes.includes(currentUrl)) {
=======
    const isPublicRoute = this.publicRoutes.includes(currentUrl);

    const isFullScreenRoute = this.fullScreenRoutes.some(route =>
      currentUrl.startsWith(route)
    );

    if (!this.IsLoggin && !isPublicRoute) {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
      this.showGlobalNavbar = false;
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.IsLoggin) {
      this.sessionService.startSessionWatcher();
    }

<<<<<<< HEAD
    // ✅ Hide global navbar on full-screen dashboards
    this.showGlobalNavbar =
      this.IsLoggin &&
      !publicRoutes.includes(currentUrl) &&
      !this.fullScreenDashboardRoutes.includes(currentUrl);
  }

  logout() {
=======
    this.showGlobalNavbar =
      this.IsLoggin &&
      !isPublicRoute &&
      !isFullScreenRoute;
  }

  logout(): void {
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
    this.sessionService.logoutManually();
    this.IsLoggin = false;
    this.roleName = null;
    this.showGlobalNavbar = false;
  }
}