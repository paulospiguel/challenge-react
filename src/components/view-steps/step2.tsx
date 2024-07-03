import { calculeMonthlyPayment } from "../../libs/utils";
import { useAppContext } from "../../providers/app-context";
import { InputSlider } from "../input-slider";
import { ValueCard } from "../value-card";

export const ViewStepsStep2 = () => {
  const { amount, month, limit } = useAppContext();

  return (
    <>
      <section className="w-full">
        <div className="bg-white flex flex-col md:flex-row gap-2 mx-auto items-center justify-center p-4">
          <ValueCard label="Months" value={month} />
          <span>=</span>
          <ValueCard type="currency" label="Amount" value={amount} />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-start gap-2 bg-gray-800 rounded-md">
          <InputSlider variant="month" className="" />
          <InputSlider variant="amount" className="" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-md mt-4 text-center p-4 text-yellow-500 bg-slate-500">
        <p className="text-xl">Monthly payment</p>
        <pre className="text-7xl">{calculeMonthlyPayment(amount!, month!, limit?.currency)}</pre>
      </section>
    </>
  )
};