import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./../app.component.scss', './login.page.scss'],
})
export class LoginPage {
  public body_login = {
    shopkeeper: 'admin',
    email: 'admin',
    password: 'admin',
    username: 'admin',
  };

  public toggle_remember_me: boolean = false;
  public errorMessage: string | undefined;
  private minimal_len_token: number = 50; // JWT

  modalCtrl: any;

  constructor(
    private router: Router,
    private dataService: DataService,
    private loadingController: LoadingController
  ) {
    this.loadCredentials();
  }

  current_user = this.dataService.getCurrentUser();

  private loadCredentials() {
    if (localStorage.getItem('shopkeeper')) {
      this.body_login.shopkeeper = localStorage.getItem('shopkeeper')!;
    }
    if (localStorage.getItem('email')) {
      this.body_login.email = localStorage.getItem('email')!;
    }
    if (localStorage.getItem('password')) {
      this.body_login.password = localStorage.getItem('password')!;
    }
    if (localStorage.getItem('username')) {
      this.body_login.username = localStorage.getItem('username')!;
    }
  }

  rememberMe() {
    if (this.toggle_remember_me) {
      console.log('Ricordami le credenziali? ->', this.toggle_remember_me);
      localStorage.setItem('shopkeeper', this.body_login.shopkeeper);
      localStorage.setItem('email', this.body_login.email);
      localStorage.setItem('password', this.body_login.password);
      localStorage.setItem('username', this.body_login.username);
    }
  }

  checkToken(token: string): boolean {
    // filtro del token
    if (token.length > this.minimal_len_token) {
      this.router.navigate(['/']); // Reindirizza alla home
      console.log('Login success | Accesso ad Home | Token |', token);
      return true;
    }
    return false;
  }

  showToast(message: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.color = color;
    toast.duration = 3000;
    toast.classList.add('toast-elemento');
    document.body.appendChild(toast);
    return toast.present();
  }

  async confirmLogin() {
    try {
      const response = await PostRequest(baseURL + 'Login/', this.body_login);
      console.log('Risposta del server:', response);

      if (response) {
        this.handleSuccessfulLogin(response);
      } else {
        this.handleFailedLogin();
      }
    } catch (error) {
      console.error('Si è verificato un errore durante il login: ', error);
      this.errorMessage = 'Si è verificato un errore durante il login.';
      this.showToast('Credenziali Errate', 'error');
    } finally {
      if (!this.toggle_remember_me) {
        this.resetLoginForm();
      }
      console.log(
        'Accesso eseguito -> ',
        this.dataService.getTokenJWTsuccess()
      );
    }
  }

  private handleSuccessfulLogin(response: any) {
    this.current_user = response.user;
    this.dataService.setCurrentUser(this.current_user);
    
    this.dataService.setUsername(response.user.username);
    this.dataService.setUserRole(response.role);
    this.dataService.setTokenJWT(response.token);
    this.dataService.setBodyLogin(this.body_login);

    console.log('Nome utente:', this.dataService.getUsername());

    const parts = response.token ? response.token.split('.') : null;
    if (this.toggle_remember_me) {
      this.rememberMe();
    }

    if (!parts || parts.length !== 3) {
      throw new Error('Token non valido');
    }

    if (this.checkToken(response.token)) {
      this.showToast('Accesso Eseguito', 'success');
      console.log('Login success | Navigazione eseguita');
      this.dataService.setTokenJWTsuccess(true);
      setTimeout(() => {}, 2200);
    } else {
      this.showToast('Accesso Fallito', 'error');
      console.log('Login fallito | Token non definito o non valido');
    }
  }

  private handleFailedLogin() {
    console.warn('Login fallito: Nessuna stringa valida ricevuta.');
    this.dataService.setTokenJWTsuccess(false);
    this.errorMessage = 'Login fallito. Controlla le credenziali.';
  }

  private resetLoginForm() {
    this.body_login = {
      shopkeeper: '',
      email: '',
      password: '',
      username: '',
    };
  }

  getUserRole(): string {
    if (String(this.dataService.getTokenJWT())) {
      return String(this.dataService.getTokenJWT()).includes('admin')
        ? 'admin'
        : 'user';
    }
    return 'token not found';
  }

  exit_login() {
    if (this.toggle_remember_me == false) {
      this.resetLoginForm();
      this.dataService.setUserRole('');
    }
    this.modalCtrl.dismiss(this.body_login, 'confirm');
  }
}
