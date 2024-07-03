import { bankUrl } from "../constants/config";
import { Currency, TakeCreditParams } from "../types/limits";

export const formatValue = (value: number, currency: Currency) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency,
  });
};

export const calculeMonthlyPayment = (amount: number, months: number, currency: Currency = "EUR") => {
  return formatValue(amount / months, currency);
};

export const redirectToTakeCredit = (params: TakeCreditParams) => {
  const { amount, month } = params || {};
  const link = new URL(bankUrl);
  link.searchParams.append("montante", String(amount));
  link.searchParams.append("finalidade", "3");
  link.searchParams.append("subfinalidade", "1");
  link.searchParams.append("vista", "isMonthly");
  link.searchParams.append("prazo", String(month));
  const target = "_blank";
  window.open(link.toString(), target);
};
