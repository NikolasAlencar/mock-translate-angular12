import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: String = 'Traduza a frase:' 
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase!: Frase;

  public progresso: number = 0

  public tentativas: number = 3

  @Output()
  public encerrarJogo: EventEmitter<string> =  new EventEmitter() 

  constructor() {
    this.atualizaRodada()
  }
  ngOnDestroy() {
    console.log('Foi destruido!')
  }

  ngOnInit(): void {
  }

  atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  verificarResposta(): void{
    if(this.rodadaFrase.frasePtBr.toUpperCase().trim() == this.resposta.toUpperCase().trim()){

      //troca a pergunta da rodada
      this.rodada++

      //barra de progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      //verifica se acabaram as frases e rodadas
      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()
    }else{

      //diminuir as tentativas
      this.tentativas--

      if(this.tentativas === -1){
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  atualizaRodada(): void{
    this.rodadaFrase = this.frases[this.rodada]
    this.resposta = ''
  }
}
