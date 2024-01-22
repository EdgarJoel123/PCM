import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
 /* private stompClient: Stomp.Client;

  constructor() {
    this.initializeWebSocketConnection();
  }

  private initializeWebSocketConnection(): void {
    const serverUrl = 'http://localhost:8080/ejecucionProyecto';
    const socket = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    
    this.stompClient.connect({}, () => {
      console.log('Conectado al servidor WebSocket');
      
      // Puedes suscribirte a un topic aquí si es necesario
      const topic = '/topic/actualizacionEjecucionProyectos';
      this.stompClient.subscribe(topic, (message: Stomp.Message) => {
        console.log('Mensaje recibido del topic:', message.body);
      });
    }, (error: string) => {
      console.error('Error de conexión al servidor WebSocket: ', error);
    });
  }

  // Método para enviar mensajes al servidor
  public sendMessage(message: string): void {
    const destination = '/app/your-endpoint'; // Puedes ajustar esto según tu configuración
    this.stompClient.send(destination, {}, message);
  }

  // Método para desconectar el WebSocket cuando ya no sea necesario
  public disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }*/
}
