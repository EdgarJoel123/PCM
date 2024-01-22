
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContactoService } from 'src/app/services/contacto.service';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {


  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  @ViewChild('contactForm', { static: false }) contactForm: ElementRef;

  constructor(private contactFormService: ContactoService) { }

  onSubmit() {
    this.contactFormService.sendContactForm(this.formData)
      .subscribe(
        response => {
          alert('Formulario enviado con éxito');
          
          // Restablece los valores del formulario manualmente
          this.formData = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: ''
          };

          // Resetea el formulario nativo del DOM
          if (this.contactForm && this.contactForm.nativeElement) {
            this.contactForm.nativeElement.reset();
          }
        },
        error => {
          alert('Error al enviar el formulario');
          // Puedes manejar el error según tus necesidades (por ejemplo, mostrar un mensaje de error)
        }
      );
  }
}
