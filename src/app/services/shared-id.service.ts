import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedIDService {
  private STORAGE_KEY_CODIGO_UNICO = 'id_PPRO_CODIGO_UNICO';
  private STORAGE_KEY_NOMBRE_PROY = 'ppro_NOMBRE_PROY';
  private id_PPRO_CODIGO_UNICO: number | null = null;
  private ppro_NOMBRE_PROY: string | null = null;

  setCodigoUnico(codigoUnico: number) {
    this.id_PPRO_CODIGO_UNICO = codigoUnico;
    localStorage.setItem(this.STORAGE_KEY_CODIGO_UNICO, codigoUnico.toString());
  }

  getCodigoUnico(): number {
    const storedValue = localStorage.getItem(this.STORAGE_KEY_CODIGO_UNICO);
    this.id_PPRO_CODIGO_UNICO = storedValue !== null ? +storedValue : null;
    return this.id_PPRO_CODIGO_UNICO || 0;
  }

  setNombreProyecto(nombreProyecto: string) {
    this.ppro_NOMBRE_PROY = nombreProyecto;
    localStorage.setItem(this.STORAGE_KEY_NOMBRE_PROY, nombreProyecto);
  }

  getNombreProyecto(): string {
    const storedValue = localStorage.getItem(this.STORAGE_KEY_NOMBRE_PROY);
    this.ppro_NOMBRE_PROY = storedValue !== null ? storedValue : null;
    return this.ppro_NOMBRE_PROY || '';
  }
}
