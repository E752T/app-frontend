import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginObject } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  minimal_len_token: number = 50;
  public errorMessage: string | undefined;
  remember_me: boolean = false;

  token_JWT: string = '';
  username: string = '';
  user_role: string = '';
  token_JWT_success: boolean = false;

  alertButtons = ['OK'];

  body_login: LoginObject = {
    email: '',
    password: '',
    shopkeeper: '',
    username: '',
  };
  modalCtrl: any;

  constructor(
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.setItem('token_JWT', '');
    localStorage.setItem('token_JWT_success', '');
  }

  checkToken(token: string): boolean {
    if (token.length > this.minimal_len_token) {
      this.token_JWT_success = true;


      localStorage.setItem('token_JWT', token);
      localStorage.setItem('token_JWT_success', String(this.token_JWT_success));

      this.router.navigate(['/']); // Reindirizza alla home

      console.log('Login success | Token valido, accesso ad Home');
      
      return true;
    } else {
      return false;
    }
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
      if (response && response.token) {
        this.token_JWT = response.token;

        if (this.checkToken(this.token_JWT)) {
          this.showToast('Accesso Eseguito', 'success');
          localStorage.setItem('token', this.token_JWT);
          localStorage.setItem(
            'token_JWT_success',
            String(this.token_JWT_success)
          );
          console.log('Login success | Navigazione eseguita');
          
        }
      } else {
        console.warn('Login failed: No valid string received.');
        this.token_JWT_success = false;
        this.errorMessage = 'Login fallito. Controlla le credenziali.';
      }
      this.user_role = this.getUserRole();
      console.log("RUOLO DELL' UTENTE ", this.user_role);
    } catch (error) {
      console.error('An error occurred during login: ', error);
      this.token_JWT_success = false;
      this.errorMessage = 'Si è verificato un errore durante il login.';
    } finally {
      this.resetLoginForm();
      console.log('Accesso eseguito -> ', this.token_JWT_success);
    }
  }

  resetLoginForm() {
    this.body_login.email = '';
    this.body_login.password = '';
    this.body_login.shopkeeper = '';
    this.body_login.username = '';
  }

  jwt_decode(token: string): any {
    if (!token) {
      throw new Error('Token non fornito');
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token non valido');
    }

    try {
      const payload = parts[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      throw new Error('Errore nella decodifica del token');
    }
  }

  getUserRole(): string {
    if (this.token_JWT) {
      return this.token_JWT.includes('admin') ? 'admin' : 'user';
    }
    return 'token not found';
  }

  exit_login() {
    this.resetLoginForm();
    this.token_JWT_success = false;
    this.user_role = '';
    this.modalCtrl.dismiss(this.body_login, 'confirm');
  }
}
