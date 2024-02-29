export class Rol {
  id_ROL: number;
  descripcion_ROL: string;
  nombre_ROL: string;

  constructor(descripcion?: string, nombre?: string) {
    if (descripcion && nombre) {
      this.descripcion_ROL = descripcion;
      this.nombre_ROL = nombre;
    } else {
      // Valores predeterminados para el constructor vacío
      this.id_ROL = 0;
      this.descripcion_ROL = '';
      this.nombre_ROL = '';
    }
  }
}
