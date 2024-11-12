import { Groupe } from "./groupe.model";
import { Image } from "./image.model";
export class Etudiant {
  idEtudiant!: number;
  nom! : string;
  prenom! : string;
  classe!: string;
  email!: string;
  dateNaiss! : Date ;
  groupe!:Groupe;
  image! : Image;
  imageStr!:string;
  images!: Image[];
  }
