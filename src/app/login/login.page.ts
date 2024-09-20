import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public body_login = {
    shopkeeper: '',
    email: '',
    password: '',
    username: '',
  };

  public toggle_remember_me: boolean = false;
  public errorMessage: string | undefined;
  private minimal_len_token: number = 50; // JWT
  private token_JWT_success: boolean = false;
  modalCtrl: any;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private dataService: DataService
  ) {}

  rememberMe() {
    if (this.toggle_remember_me) {
      console.log('Ricordami le credenziali', this.toggle_remember_me);
      localStorage.setItem('shopkeeper', this.body_login.shopkeeper);
      localStorage.setItem('email', this.body_login.email);
      localStorage.setItem('password', this.body_login.password);
      localStorage.setItem('username', this.body_login.username);
    } else {
      this.clearLoginData();
    }
  }

  private clearLoginData() {
    this.body_login = {
      shopkeeper: '',
      email: '',
      password: '',
      username: '',
    };
    localStorage.setItem('shopkeeper', '');
    localStorage.setItem('email', '');
    localStorage.setItem('password', '');
    localStorage.setItem('username', '');
  }

  checkToken(token: string): boolean {
    if (token.length > this.minimal_len_token) {
      this.token_JWT_success = true;
      localStorage.setItem('token_JWT', token);
      localStorage.setItem('token_JWT_success', String(this.token_JWT_success));
      this.router.navigate(['/']); // Reindirizza alla home
      console.log('Login success | Token valido, accesso ad Home');
      console.log('Token |', token);
      return true;
    }
    return false;
  }

  showToast(message: string, color: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.color = color;
    toast.duration = 3000;
    document.body.appendChild(toast);
    return toast.present();
  }

  async confirmLogin() {
    try {
      const response = await PostRequest(baseURL + 'Login/', this.body_login);
      console.log('Risposta del server:', response);

      if (response.success) {
        this.handleSuccessfulLogin(response);
      } else {
        this.handleFailedLogin();
      }
    } catch (error) {
      console.error('Si è verificato un errore durante il login: ', error);
      this.errorMessage = 'Si è verificato un errore durante il login.';
    } finally {
      this.resetLoginForm();
      console.log('Accesso eseguito -> ', this.token_JWT_success);
    }
  }

  private handleSuccessfulLogin(response: any) {
    this.dataService.setUsername(response.username);
    this.dataService.setUserRole(response.role);
    this.dataService.setTokenJWT(response.token);
    this.dataService.setBodyLogin(this.body_login);

    console.log('Username impostato:', this.dataService.getUsername());

    const parts = response.token ? response.token.split('.') : null;

    if (!parts || parts.length !== 3) {
      throw new Error('Token non valido');
    }

    if (this.checkToken(response.token)) {
      this.showToast('Accesso Eseguito', 'success');
      console.log('Login success | Navigazione eseguita');
    } else {
      this.showToast('Token non valido', 'error');
      console.log('Login fallito | Token non definito o non valido');
    }
  }

  private handleFailedLogin() {
    console.warn('Login fallito: Nessuna stringa valida ricevuta.');
    this.token_JWT_success = false;
    this.errorMessage = 'Login fallito. Controlla le credenziali.';
  }

  private resetLoginForm() {
    this.body_login = {
      shopkeeper: '',
      email: '',
      password: '',
      username: '',
    };
    this.toggle_remember_me = false;
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
    this.rememberMe();
    this.resetLoginForm();
    this.token_JWT_success = false;
    this.dataService.setUserRole('');
    this.modalCtrl.dismiss(this.body_login, 'confirm');
  }
}
