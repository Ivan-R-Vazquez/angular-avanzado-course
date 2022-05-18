import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) { }

    get imagenUrl() {
        // upload/medicos/ffbc3913-f80f-489f-99b0-f85c7d84d6a6.png
        if (this.img.includes('https')) {
            return this.img;
        } else {
            return `${base_url}upload/usuarios/${this.img}`;
        }
    }
}