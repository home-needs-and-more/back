export class CreateWorkRequestDto {
  jobId: number;
  email: string;
  phoneNumber: string;
  description: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
}
