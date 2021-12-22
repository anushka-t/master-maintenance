import { Department } from "./department";

export interface Employee {
  id: number;
  nameFurigana: string;
  nameKanji: string;
  email: string;
  joiningDate: Date;
  department: Department
}