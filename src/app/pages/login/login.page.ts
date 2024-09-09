import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public errorMessage: string | undefined;

  constructor(private loadingController: LoadingController) {}

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
      message: 'Apertura della finestra di login...',
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
