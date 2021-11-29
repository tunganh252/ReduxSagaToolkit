export interface IStudent {
  id?: string | number;
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'female';
  city: string;
  updatedAt?: Date | number;
  createdAt?: Date | number;
}
