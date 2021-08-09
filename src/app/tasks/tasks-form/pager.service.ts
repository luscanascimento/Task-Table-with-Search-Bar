import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagerService {
  getPager(
    totalDeItems: number,
    paginaAtual: number = 1,
    tamanhoDaPagina: number = 10
  ) {
    let totalDePaginas = Math.ceil(totalDeItems / tamanhoDaPagina);

    if (paginaAtual < 1) {
      paginaAtual = 1;
    } else if (paginaAtual > totalDePaginas) {
      paginaAtual = totalDePaginas;
    }

    let paginaInicial: number, paginaFinal: number;

    if (totalDePaginas <= 10) {
      paginaInicial = 1;
      paginaFinal = totalDePaginas;
    } else {
      if (paginaAtual <= 6) {
        paginaInicial = 1;
        paginaFinal = 10;
      } else if (paginaAtual + 4 >= totalDePaginas) {
        paginaInicial = totalDePaginas - 9;
        paginaFinal = totalDePaginas;
      } else {
        paginaInicial = paginaAtual - 5;
        paginaFinal = paginaAtual + 4;
      }
    }

    let indiceInicial = (paginaAtual - 1) * tamanhoDaPagina;

    let indiceFinal = Math.min(
      indiceInicial + tamanhoDaPagina - 1,
      totalDeItems - 1
    );

    let paginas = Array.from(Array(paginaFinal + 1 - paginaInicial).keys()).map(
      (i) => paginaInicial + i
    );

    return {
      totalDeItems: totalDeItems,
      paginaAtual: paginaAtual,
      tamanhoDaPagina: tamanhoDaPagina,
      totalDePaginas: totalDePaginas,
      paginaInicial: paginaInicial,
      paginaFinal: paginaFinal,
      indiceInicial: indiceInicial,
      indiceFinal: indiceFinal,
      paginas: paginas,
    };
  }
  constructor() {}
}
