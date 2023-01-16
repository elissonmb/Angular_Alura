import { Router } from '@angular/router';
import { Transferencia } from './../../models/transferencia.model';
import { TransferenciaService } from './../services/transferencia.service';
import { Component, EventEmitter, Output, ɵɵqueryRefresh } from '@angular/core';


@Component({
  selector: 'app-nova-transferencia',
  templateUrl: './nova-transferencia.component.html',
  styleUrls: ['./nova-transferencia.component.scss']
})
export class NovaTransferenciaComponent {

  @Output() aoTransferir = new EventEmitter<any>();

  valor: number;
  destino: number;

  constructor(private service: TransferenciaService, private router: Router){

  }

  transferir(){
    console.log('Solicitado Nova Transferencia');
    const valorEmitir: Transferencia = {valor: this.valor, destino: this.destino};

    if (this.valor <= 0 || null || " " || NaN){
      alert('Não é possivel registrar valor nulo, 0 ou negativo');
      this.limparCampos();
    }
        else if(this.destino == null || NaN || ""){
        alert('Não é possivel registrar um destino vazio');
        this.limparCampos();

    }
            else{
            this.aoTransferir.emit(valorEmitir);
            this.limparCampos();
            this.service.adicionar(valorEmitir).subscribe(resultado =>{
            console.log(resultado);
            this.limparCampos;
            this.router.navigateByUrl('extrato');
      });
    }
  }
  limparCampos(){
    this.valor = null;
    this.destino = null;
  }
}
