export enum TransactionStatus {
  PENDING = 'PENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
}
