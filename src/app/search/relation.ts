export interface Relation{
    name :string;
    words :Word[];
  }
  export interface Word{
    term : string;
    weight : number;
  }