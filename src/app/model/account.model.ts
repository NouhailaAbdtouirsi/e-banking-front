export interface AccountDetails {
  accountId:   string;
  balance:     number;
  currentPage: number;
  totalPages:  number;
  size:        number;
  operations:  Operation[];
}
export interface Account {
  id:      String;
  balance: number;
  creationDate:    Date;
  type:    string;
}
export interface Operation {
  id:            number;
  operationDate: Date;
  amount:        number;
  operationType: string;
  description:   string;
}
