import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  /*constructor(private socket: Socket){

  }

  subcribeToUpdate(){
    return this.socket.fromEvent<any>('actualizacionEjecucionProyectos');
  }


  senMessage(msg: string){
    this.socket.emit('mesasge', msg);
  }

  getMessage(){
    return this.socket.fromEvent<any>('message');
  } */
}
