import { Gif } from 'src/app/interface/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from 'src/app/interface/gifs.interface';



@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historialEtiquetas:string[]=[];
  private apiKey:string='EQGcExiTy8NNOHD75LZ5cyfRnsbqPgYm';
  private serviceUrl:string='https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) { }

  public listadoGifs:Gif[]=[];



  get historialEtiquetas(){
    return [...this._historialEtiquetas];
  }


  EnviarEtiqueta(etiqueta: string): void {
    const minuscula = etiqueta.toLowerCase().trim();
    if (minuscula == null || minuscula.length == 0) {
      // Puedes manejar casos especiales aquí si es necesario
    } else {
      this._historialEtiquetas.unshift(minuscula);
      console.log(this.historialEtiquetas);
    }

    if (this._historialEtiquetas.includes(minuscula)) {
      this._historialEtiquetas = this._historialEtiquetas.filter(busqueda => busqueda !== minuscula);
      this._historialEtiquetas.unshift(minuscula);
      console.log(this._historialEtiquetas);
    }

    this._historialEtiquetas = this._historialEtiquetas.splice(0, 10);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', etiqueta);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe(resp => {
      this.listadoGifs = resp.data;  // Actualiza la lista de GIFs con la respuesta de la API
      console.log(this.listadoGifs);
    });
  }




  }



