import { Component, OnInit } from '@angular/core';
import { RecintoService } from '../../../services/recinto.service';
import { Recinto } from '../../../models/recinto.model';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit {

  title = 'ControlMapas';

  lat: number;
  lng: number;
  zoom: number;
  mapTypeId: string;
  located: boolean;
  public cargando: boolean = true;

  public recintos: Recinto[] = [];



  constructor(private recintoService: RecintoService) { 
    this.lat = -17.380666680228334;
    this.lng = -66.16052178449881;
    this.zoom = 17;
    // this.mapTypeId = 'hybrid';
    this.mapTypeId = 'roadmap';
    this.located = false;
  }

  ngOnInit(): void {
    this.cargarRecintos(1);

  }

  cargarRecintos(distrito) {
    this.cargando = true;
    this.recintoService.cargarRecintosPorDistrito(distrito).subscribe((recintos) => {
      this.cargando = false;
      this.recintos = recintos;
      // console.log(recintos);
    });
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.zoom = 17;
      this.located = true;
    });
  }

}
