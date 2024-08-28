export interface IContactDetail {
    name: string;
    contactDetails: string;
    type: string;
    description?: string | null;
    priorityIndex: number;
    deletedAt?: Date | null;
}
  