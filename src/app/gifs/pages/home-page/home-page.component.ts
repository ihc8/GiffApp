import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from 'src/app/interface/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(public gifService: GifsService) {}

  get gifs(): Gif[] {
    return this.gifService.listadoGifs;
  }
}
