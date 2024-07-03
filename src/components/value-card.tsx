import { formatValue } from "../libs/utils";
import { useAppContext } from "../providers/app-context";

type ValueCardProps = {
  label: string;
  value: number | undefined;
  type?: "currency" | "months";
};

export const ValueCard = ({ value = 0, label, type }: ValueCardProps) => {
  const { limit } = useAppContext();
  const currency = limit?.currency || "EUR";
  let renderValue: string | number = value;

  if (type === "currency") {
    renderValue = formatValue(value, currency);
  }

  return (
    <div className="w-full border rounded-md text-center px-2">
      <label className="text-4xl">{label}</label>
      <p className="text-7xl">{renderValue}</p>
    </div>
  );
};