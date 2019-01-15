export interface Relation{
    entrante:Boolean;
    name :string;
    word :string;
    words :Word[];
  }
  export interface Word{
    nom : string;
    poids : number;
    noeud: {
      nom:string;
      id : number;
      type: number;
      poids: number;
      motFormate:string;
    }
  }