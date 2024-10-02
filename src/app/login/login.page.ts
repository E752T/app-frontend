import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { PostRequest } from '../services/request.service';
import { baseURL } from '../enviroenment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./../app.component.scss', './login.page.scss'],
})
export class LoginPage {
  // credenziali di accesso
  // impostare tutti i valori come 'admin' in fase di sviluppo
  // al fine di sviluppare più velocemente
  public body_login = {
    shopkeeper: 'admin',
    email: 'admin',
    password: 'admin',
    username: 'admin',
  };

  // ricordati di me
  public toggle_remember_me: boolean = false;

  // messaggio di errore di credenziali errate
  public errorMessage: string | undefined;

  // lunghezza minima del token JWT
  private minimal_len_token: number = 50; // JWT

  // prendi i dati dell'utente e mettile dentro questo oggetto
  current_user = this.dataService.getCurrentUser();

  constructor(
    private router: Router,
    private dataService: DataService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.loadCredentials();
  }

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
    // controlla il token che abbia la lunghezza minima
    if (token.length > this.minimal_len_token) {
      // naviga su Home se ha successo
      this.router.navigate(['/']);
      console.log('Login success | Accesso ad Home | Token |', token);
      return true;
    }
    return false;
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 3000,
      cssClass: 'toast-elemento', // Mantieni questa classe per la personalizzazione
    });
    await toast.present();
  }

  async confirmLogin() {
    try {
      const response = await PostRequest(baseURL + 'Login/', this.body_login);
      console.log('Risposta del server:', response);

      if (response) {
        this.handleSuccessfulLogin(response);
      }
    } catch (error) {
      this.handleFailedLogin();
      this.showToast('Credenziali Errate', 'danger');
      //console.log('Si è verificato un errore durante il login: ', error);
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

    // salva i dati di login nella variabile current user
    this.dataService.setCurrentUser(this.current_user);

    // salva i dati di login nel LocalStorage
    this.dataService.setUsername(response.user.username);
    this.dataService.setUserRole(response.role);
    this.dataService.setTokenJWT(response.token);
    this.dataService.setBodyLogin(this.body_login);

    console.log('Nome utente:', this.dataService.getUsername());

    // dividi il token ricevuto splittandolo in 3 parti
    const parts = response.token ? response.token.split('.') : null;

    // se il token JWT non è corretto emetti un errore
    // il token JWT deve poter essere diviso in 3 parti, separate da un punto
    if (!parts || parts.length !== 3) {
      throw new Error('Token non valido');
    }

    // se hai premuto "Ricordami" salva le credenziali per rientrare senza doverle reinserire
    if (this.toggle_remember_me) {
      this.rememberMe();
    }

    // contolla il token JWT
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

  // gestisci il login fallito
  private handleFailedLogin() {
    console.warn('Login fallito: Nessuna stringa valida ricevuta.');
    this.showToast('Credenziali Errate', 'error');
    this.dataService.setTokenJWTsuccess(false);
    this.errorMessage = 'Login fallito. Controlla le credenziali.';
  }

  // resetta le credenziali di login
  private resetLoginForm() {
    this.body_login = {
      shopkeeper: '',
      email: '',
      password: '',
      username: '',
    };
  }
}
