export interface ProductFeedbackType {
  id: string;
  name: string;
  email: string;
  feedback?: string;
  errors: {
    name?: string;
    email?: string;
  };
}
