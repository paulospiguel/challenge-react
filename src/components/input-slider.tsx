import { ComponentProps, useMemo } from 'react';
import { useAppContext } from '../providers/app-context';


type InputSliderProps = {
  variant: "amount" | "month";
  className?: ComponentProps<'input'>['className'];
};


export const InputSlider = ({ variant, className }: InputSliderProps) => {
  const { onSetMonth, onSetAmount, amount, month, limit, MAX_MONTHS, MIN_MONTHS } = useAppContext();

  const slider = useMemo(() => ({
    amount: {
      id: "amount",
      label: "Amount",
      value: amount,
      action: onSetAmount,
      min: limit?.min || 0,
      max: limit?.max || 0,
    },
    month: {
      id: "month",
      label: "Months",
      value: month,
      action: onSetMonth,
      min: MIN_MONTHS,
      max: MAX_MONTHS,
    },
  }), [amount, month, limit?.min, limit?.max, onSetAmount, onSetMonth]);


  const currentSlider = slider[variant];

  return (
    <div className={`flex flex-col items-center space-x-2 px-2 w-full border-2 rounded-md p-4 ${className}`}>
      <label className="text-white text-4xl mb-2" htmlFor={currentSlider.id}>{currentSlider.label} </label>
      <input
        id={currentSlider.id}
        type="range"
        className="w-full"
        onChange={event => currentSlider.action(Number(event.target.value))}
        defaultValue={currentSlider.value}
        min={currentSlider.min}
        max={currentSlider.max}
      />

      <div className="flex space-x-4 text-white">
        <p>Min: {currentSlider.min}</p>
        <p>Max: {currentSlider.max}</p>
      </div>
    </div>
  );
};
