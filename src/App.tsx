import { Header } from './components/header';
import { Footer } from './components/footer';
import { useAppContext } from './providers/app-context';
import { ViewStepsStep1 } from './components/view-steps/step1';
import { ViewStepsStep2 } from './components/view-steps/step2';
import { Steps } from './constants/steps';
import { Button } from './components/button';
import { useCallback, useMemo } from 'react';
import { redirectToTakeCredit } from './libs/utils';

const App = () => {
  const { step, onSetStep, month, amount } = useAppContext();

  const buttonAction = useMemo(() => {
    let buttonLabel = "Start simulation";
    let onClick = () => onSetStep(Steps.step2);

    if (step === Steps.step2) {
      buttonLabel = "back to step 1";
      onClick = () => onSetStep(Steps.step1);
    }
    return { buttonLabel, onClick };
  }, [step]);


  const onClickToTakeCredit = useCallback(() => {
    redirectToTakeCredit({ amount, month });
  }, []);

  return (
    <div className="h-full mx-auto flex flex-col">
      <Header />

      <main className="mx-auto w-full flex-1 max-w-7xl">
        {step === Steps.step1 && (
          <ViewStepsStep1 />
        )}

        {step === Steps.step2 && (
          <ViewStepsStep2 />
        )}

        <div className="w-full flex space-x-2 items-center justify-center mt-4">
          <Button variant={step === Steps.step1 ? "primary" : "secondary"} className="w-52" onClick={buttonAction.onClick}>
            {buttonAction.buttonLabel}
          </Button>

          <Button className="w-80" hidden={step === Steps.step1} onClick={onClickToTakeCredit}>Take a credit</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
