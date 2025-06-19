export interface ProductFeedbackType {
  id: string;
  name: string;
  email: string;
  feedback?: string;
  error: {
    name?: string;
    email?: string;
  };
}
