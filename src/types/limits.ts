export type Currency = "EUR" | "USD"

export type ResponseLimit = {
  min: number;
  max: number;
  currency: Currency;
};

export type TakeCreditParams = {
  amount: number | undefined;
  month: number | undefined;
};
