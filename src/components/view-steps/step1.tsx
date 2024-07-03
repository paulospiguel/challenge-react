import { useAppContext } from '../../providers/app-context';
import { InputSlider } from '../input-slider';
import { ValueCard } from '../value-card';

export const ViewStepsStep1 = () => {
  const { amount } = useAppContext();
  return (
    <section className="w-full">
      <div className="bg-white flex gap-2 mx-auto items-center justify-center p-4">
        <ValueCard type="currency" label="Amount" value={amount} />
      </div>
      <div className="p-4 flex items-start space-x-2 bg-gray-800 rounded-md">
        <InputSlider variant="amount" className="" />
      </div>
    </section>
  );
};
