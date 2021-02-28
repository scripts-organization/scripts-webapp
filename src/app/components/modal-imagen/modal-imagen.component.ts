import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;
  public imgTemp2: any = null;
  public imgTemp3: any = null;


  constructor( public modalImagenService: ModalImagenService,
               public fileUploadService: FileUploadService  ) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file[0] );

    const reader2 = new FileReader();
    reader2.readAsDataURL( file[1] );

    const reader3 = new FileReader();
    reader3.readAsDataURL( file[2] );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    reader2.onloadend = () => {
      this.imgTemp2 = reader2.result;
    }
    reader3.onloadend = () => {
      this.imgTemp3 = reader3.result;
    }

    

  }

  subirImagen() {
    const id   = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .subscribe((response) => {
          const img = response['MesaAlcalde'].img_1;
          console.log('response received is ', response);
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(response['MesaAlcalde'].img_1);
          this.cerrarModal();
      })
      // .then( img => {
      //   Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

      //   //this.modalImagenService.nuevaImagen.emit(img);

      //   this.cerrarModal();
      // }).catch( err => {
      //   console.log(err);
      //   Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      // })

  }

}
