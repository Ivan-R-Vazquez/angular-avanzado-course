import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  profileForm: FormGroup;
  usuario: Usuario;
  imagenSubir: File;
  imgTemp: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil() {
    if (this.profileForm.invalid) {
      return;
    }
    this.usuarioService.updateUser(this.profileForm.value).subscribe({
      next: (res: any) => {
        const { nombre, email } = this.profileForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Cambios guardados', 'success');
      },
      error: err => {
        Swal.fire('Guardado', err.error.msg, 'error');
      }
    });
  }

  cambiarImagen(event: any) {
    const file = event.target.files[0];
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    // Este método debe de ir para que el reader pueda leer el archivo y cargarlo en el onloadend
    // Se puede guardar en variable en caso de ser necesario
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        this.imgTemp = null;
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Guardado', 'Error al subir la imagen', 'error');
      });
  }

}
