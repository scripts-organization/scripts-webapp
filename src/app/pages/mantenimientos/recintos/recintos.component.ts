import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecintoService } from '../../../services/recinto.service';
import { Recinto } from '../../../models/recinto.model';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recintos',
  templateUrl: './recintos.component.html',
  styleUrls: ['./recintos.component.css'],
})
export class RecintosComponent implements OnInit, OnDestroy {
  public recintos: Recinto[] = [];
  public recinto: Recinto;
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private recintoService: RecintoService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.cargarRecintos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe((img) => this.cargarRecintos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarRecintos() {
    this.cargando = true;
    this.recintoService.cargarRecintos().subscribe((recintos) => {
      this.cargando = false;
      this.recintos = recintos;
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarRecintos();
    }

    this.busquedasService.buscar( 'recintos', termino )
        .subscribe( resp => {

          this.recintos = resp;

        });
  }

  guardarCambios(recinto: Recinto) {
    this.recintoService
      .actualizarRecinto(recinto._id, recinto.nombre)
      .subscribe((resp) => {
        Swal.fire('Actualizado', recinto.nombre, 'success');
      });
  }

  eliminarRecinto(recinto: Recinto) {
    this.recintoService.borrarRecinto(recinto._id).subscribe((resp) => {
      this.cargarRecintos();
      Swal.fire('Borrado', recinto.nombre, 'success');
    });
  }

  async abrirSweetAlert() {
    const { value: formValues } = await Swal.fire({
      title: 'Crear recinto',
      html:
        '<input id="swal-input1" class="swal2-input" Placeholder="Recinto">' +
        '<input id="swal-input2" class="swal2-input" Placeholder="Numero de Mesas">'+
        '<input id="swal-input3" class="swal2-input" Placeholder="Distrito">',
      showCancelButton: true,
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('swal-input1')).value,
          (<HTMLInputElement>document.getElementById('swal-input2')).value,
          (<HTMLInputElement>document.getElementById('swal-input3')).value,
        ];
      },
    });

    if (formValues) {
      // console.log(JSON.stringify(formValues));
      this.recinto = { 'nombre':formValues[0],
                        'cantidadmesas' : formValues[1],
                        'distrito' : formValues[2]
                      };
      this.recintoService.crearRecinto(this.recinto).subscribe((resp: any) => {
        this.recintos.push(resp.recinto);
      });
    }
  }

  abrirModal(recinto: Recinto) {
    this.modalImagenService.abrirModal('recintos', recinto._id, recinto.img);
  }
}
