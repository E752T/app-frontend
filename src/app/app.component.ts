import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    const isFirstLoad = localStorage.getItem('isFirstLoad');
    if (!isFirstLoad) {
      localStorage.setItem('isFirstLoad', 'true');
      //localStorage.setItem('token_JWT', '');
      //localStorage.setItem('token_JWT_success', '');

      this.router.navigate(['/login']); // Reindirizza alla pagina di login
    }
  }
}
