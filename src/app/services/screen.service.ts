import { Injectable, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private screenWidth: number;
  private screenWidthSubject: Subject<number> = new Subject<number>();

  constructor() {
    this.screenWidth = window.innerWidth;
    this.screenWidthSubject.next(this.screenWidth); // Inizializza il valore
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.screenWidthSubject.next(this.screenWidth); // Emissione del nuovo valore
  }

  isScreenWide(): boolean {
    return this.screenWidth > 700;
  }

  getScreenWidthObservable() {
    return this.screenWidthSubject.asObservable(); // Restituisce l'osservabile
  }
}
