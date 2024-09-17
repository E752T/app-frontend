import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { PostRequest } from '../services/request.service';
import { body_login, user_role } from '../services/data.service';
import { baseURL } from '../enviroenment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public errorMessage: string | undefined;
  body_login = body_login;
  token_JWT: string = '';
  username: string = '';
  user_role = user_role;
  token_JWT_success: boolean = false;

  minimal_len_token: number = 50;

  alertButtons = ['OK'];

  // body_login: LoginObject = {
  //   shopkeeper: localStorage.getItem('shopkeeper'),
  //   email: localStorage.getItem('email'),
  //   password: localStorage.getItem('password'),
  //   username: localStorage.getItem('username'),
  // };

  modalCtrl: any;
  toggle_remember_me: boolean = false;

  constructor(
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.setItem('token_JWT', '');
    localStorage.setItem('token_JWT_success', '');
  }

  rememberMe() {
    if (this.toggle_remember_me == true) {
      console.log('ricordami le credenziali ', this.toggle_remember_me);

      localStorage.setItem('shopkeeper', String(body_login.shopkeeper));
      localStorage.setItem('email', String(body_login.email));
      localStorage.setItem('password', String(body_login.password));
      localStorage.setItem('username', String(body_login.username));
    } else {
      body_login.email = '';
      body_login.password = '';
      body_login.username = '';
      body_login.shopkeeper = '';

      localStorage.setItem('shopkeeper', '');
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
      localStorage.setItem('username', '');
    }
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
      const response = await PostRequest(baseURL + 'Login/', body_login);
      if (response && response.token) {
        this.token_JWT = response.token;
        this.user_role = response.message;

        localStorage.setItem('user_role ', this.user_role);

        console.log('token JWT arrivato ', response);

        const parts = this.token_JWT.split('.');
        if (parts.length !== 3) {
          throw new Error('Token non valido');
        }

        if (this.checkToken(this.token_JWT)) {
          this.showToast('Accesso Eseguito', 'success');

          localStorage.setItem('token_JWT', this.token_JWT);
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

      console.log("Ruolo dell' utente ", user_role);
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
    if (this.toggle_remember_me == true) {
      console.log('SAVE login credentials');
      localStorage.setItem('shopkeeper', String(body_login.shopkeeper));
      localStorage.setItem('username', String(body_login.username));
      localStorage.setItem('password', String(body_login.password));
      localStorage.setItem('email', String(body_login.email));
    } else {
      console.log('NOT SAVE login credentials');

      body_login.shopkeeper = '';
      body_login.username = '';
      body_login.password = '';
      body_login.email = '';

      localStorage.setItem('shopkeeper', '');
      localStorage.setItem('username', '');
      localStorage.setItem('password', '');
      localStorage.setItem('email', '');
    }
  }

  getUserRole(): string {
    if (String(this.token_JWT)) {
      return String(this.token_JWT).includes('admin') ? 'admin' : 'user';
    }
    return 'token not found';
  }

  exit_login() {
    this.rememberMe();
    this.resetLoginForm();
    this.token_JWT_success = false;
    this.user_role = '';
    this.modalCtrl.dismiss(body_login, 'confirm');
  }
}
