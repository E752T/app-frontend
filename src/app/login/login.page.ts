import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoginObject } from '../services/interfaces.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public errorMessage: string | undefined;

  modalCtrl: any;

  constructor(private loadingController: LoadingController) {}

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
  async ngOnInit() {
    // Controllo se ci sono parametri nella URL
    if (window.location.hash) {
      const loadingIndicator = await this.showLoadingIndicator();
      try {
        // Simulazione di gestione del callback di login
        this.handleLoginCallback(window.location.href);
      } catch (error) {
        // Controllo del tipo di errore
        if (error instanceof Error) {
          this.errorMessage = error.message; // Accesso sicuro alla proprietà message
        } else {
          this.errorMessage = 'Si è verificato un errore sconosciuto'; // Messaggio generico
        }
      } finally {
        loadingIndicator.dismiss();
      }
    }
  }

  body_login: LoginObject = {
    email: '',
    password: '',
    shopkeeper: '',
    username: '',
  };

  token_JWT: string = '';
  token_JWT_success: boolean = false;
  username: string = '';
  user_role: string = 'test';

  alertButtons = ['OK'];

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

      if (response != null && response != 404 && response != 'Empty values.') {
        console.log('Login SUCCESS, JWT token: ', response);
        this.token_JWT = response;

        /// CHANGE THIS VALIDATION METHOD, I need to check the DB
        // (this method is easy but unsecure)
        if (this.token_JWT.length > 50) {
          this.token_JWT_success = true;
          console.log('LOGIN SUCCESS ', this.token_JWT_success);
          this.modalCtrl.dismiss(this.body_login.email, 'confirm');

          this.showToast('Accesso Eseguito', 'success');
          this.username = this.body_login.email;
        }
      } else {
        console.warn('Login failed: No valid string received.');
        this.token_JWT_success = false;
        //this.showToast('Credenziali Errate', 'danger');
      }
      this.user_role = this.getUserRole();
      console.log("RUOLO DELL' UTENTE ", this.user_role);
    } catch (error) {
      console.error('An error occurred during login: ', error);
      this.token_JWT_success = false;
      //this.showToast('Credenziali Errate', 'danger');
    } finally {
      this.body_login.email = '';
      this.body_login.password = '';
      this.body_login.shopkeeper = '';

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
    const token = this.token_JWT;

    if (token) {
      if (token.includes('admin')) {
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

  async login() {
    const loadingIndicator = await this.showLoadingIndicator();
    try {
      // Simulazione di un processo di login
      await this.simulateLogin();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
        this.errorMessage = 'Login fallito. Riprova.';
      } else {
        console.error('Errore sconosciuto', e);
        this.errorMessage = 'Si è verificato un errore. Riprova.';
      }
    } finally {
      loadingIndicator.dismiss();
    }
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

  private async simulateLogin() {
    // Simulazione di un processo di login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simuliamo un successo di login
        resolve(true);
      }, 2000);
    });
  }
}
