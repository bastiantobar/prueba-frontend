import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { URLS } from '../constants/constants/urls';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly URL_API: string;

  constructor(private readonly httpClient: HttpClient) {
    this.URL_API = 'https://pokeapi.co/api/v2';
  }
  getPokemon(limit: any, offset: any): Observable<any[]> {
    return this.httpClient
      .get<any[]>(this.URL_API + URLS.URL.getAllPokemon, {
        params: {
          limit: limit,
          offset: offset,
        },
      })
      .pipe(
        map((res: any) => {
          return res.results.map((pokemon: any) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return { ...pokemon, id };
          });
        })
      );
  }
}
