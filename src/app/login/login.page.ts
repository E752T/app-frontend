import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginObject } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  minimal_len_token: number = 50;

  public errorMessage: string | undefined;
  modalCtrl: any;
  remember_me: false | undefined;

  token_JWT: string = '';
  token_JWT_success: boolean = true;
  username: string = '';
  user_role: string = '';

  alertButtons = ['OK'];

  body_login: LoginObject = {
    email: '',
    password: '',
    shopkeeper: '',
    username: '',
  };

  constructor(
    private loadingController: LoadingController,
    private router: Router
  ) {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    localStorage.setItem('token_JWT', '');
    localStorage.setItem('token_JWT_success', '');
  }

  checkToken() {
    // Simulazione di un controllo del token
    if (this.token_JWT.length > this.minimal_len_token) {
      this.token_JWT_success = true;
      localStorage.setItem('token_JWT', this.token_JWT);
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
      if (
        response != null &&
        response !== 404 &&
        response !== 'Empty values.'
      ) {
        this.token_JWT = response;

        // Secure validation method: Check if the token is valid by decoding it
        if (this.checkToken()) {
          this.showToast('Accesso Eseguito', 'success');
          console.log('Login success | JWT token: ', this.token_JWT);

          console.log('Login success | Tentativo di navigazione a /');
          this.router.navigate(['/']);
          console.log('Login success | Navigazione eseguita');

          localStorage.setItem('token', this.token_JWT);
          localStorage.setItem(
            'token_JWT_success',
            String(this.token_JWT_success)
          );

          // Redirect to the root route
        }
      } else {
        console.warn('Login failed: No valid string received.');
        this.token_JWT_success = false;
      }
      this.user_role = this.getUserRole();
      console.log("RUOLO DELL' UTENTE ", this.user_role);
    } catch (error) {
      console.error('An error occurred during login: ', error);
      this.token_JWT_success = false;
    } finally {
      // Clear the login form
      this.body_login.email = '';
      this.body_login.password = '';
      this.body_login.shopkeeper = '';
      this.body_login.username = '';

      console.log('Accesso eseguito -> ', this.token_JWT_success);
    }
  }

  jwt_decode(token: string): any {
    // Verifica se il token è valido
    if (!token) {
      throw new Error('Token non fornito');
    }

    // Divide il token in parti
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token non valido');
    }

    // Decodifica la parte payload
    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload));
    console.log(decodedPayload);
    return decodedPayload;
  }

  getUserRole(): string {
    // Controllo del ruolo dell' utente

    console.log('getUserRole |', this.token_JWT);

    if (this.token_JWT) {
      if (String(this.token_JWT).includes('admin')) {
        return 'admin';
      } else {
        return 'user';
      }
    } else {
      return 'token not found';
    }
  }

  exit_login() {
    this.body_login.email = '';
    this.body_login.username = '';
    this.body_login.password = '';
    this.token_JWT = '';
    this.token_JWT_success = false;
    this.user_role = '';
    this.modalCtrl.dismiss(this.body_login, 'confirm');
  }

  private async showLoadingIndicator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Accesso al servizio',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }

  private handleLoginCallback(url: string) {
    // Logica per gestire il callback di login
    console.log('Gestione del callback di login:', url);
    // Qui si può implementare la logica necessaria per gestire il login
  }
}
