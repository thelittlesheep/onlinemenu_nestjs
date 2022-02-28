export interface Imenu<T> {
  //   Respository: Repository<T>;
  getall(): Promise<T[]>;

  getone(p: number): Promise<T>;
}

// export interface ImenuDetail extends type_adjustitem {}
