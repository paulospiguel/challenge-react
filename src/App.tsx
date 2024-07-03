import { useEffect, useState } from 'react';
import { getLimits } from './actions/getLimits';
import { ResponseLimit as Limit } from './types/limits';
import { useAppContext } from './providers/app-context';

const App = () => {
  const [limit, setLimit] = useState<Limit | null>(null);

  const { onSetAmount, onSetMounth, mounth, amount } = useAppContext();

  useEffect(() => {
    getLimits().then(data => {
      setLimit({
        max: data?.max,
        min: data?.min,
        currency: data?.currency,
      });
    });
  }, []);

  const handleInput = (value: string) => {
    if (!limit?.min || !limit?.max) return;

    const numValue = Number(value);

    if (numValue >= limit?.min && numValue <= limit?.max) {
      onSetAmount(numValue);
    }
  };

  return (
    <div className="bg-gray-800 h-full w-full">
      <div className="bg-white flex gap-2 mx-auto items-center justify-center p-4">
        <div className="w-52 border rounded-md">
          <h4>Mounths</h4>
          <p>{mounth}</p>
        </div>

        <div className="w-52 border rounded-md">
          <h4>Amount</h4>
          <p>
            {amount || limit?.min} {limit?.currency}
          </p>
        </div>
      </div>
      <section className="p-4 flex flex-col items-start">
        <div className="flex space-x-2 px-2">
          <label htmlFor="minMax" className="text-white">
            Amount:{' '}
          </label>
          <input
            onChange={event => handleInput(event?.target.value)}
            type="number"
            placeholder="insert amount"
            name="minMax"
            className="rounded-md border w-52"
            min={limit?.min || 0}
            max={limit?.max || 0}
          />
        </div>

        <div className="text-white">
          <label htmlFor="rangeAmount">Mounths: </label>
          <input
            id="rangeAmount"
            onChange={event => onSetMounth(Number(event.target.value))}
            type="range"
            min="3"
            max="12"
            value={amount}
          />
        </div>
      </section>
    </div>
  );
};

export default App;
