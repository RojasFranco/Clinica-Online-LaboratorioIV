import { Component, Input, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-encuesta-resenia',
  templateUrl: './encuesta-resenia.component.html',
  styleUrls: ['./encuesta-resenia.component.css']
})
export class EncuestaReseniaComponent implements OnInit {

  resenia: string;
  guardadoExitoso: boolean = false;
  califLugar: string;
  @Input() turno: Turno;
  constructor() { }

  ngOnInit(){
  }

  GuardarEncuesta(){
    
  }
}
