import _ from "lodash";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { OPERATOR } from "../../../constant";
import { IInputCurrency } from "./propsState";

const InputCalculatorComponent = (props: IInputCurrency) => {
  const { option, statusModal } = props;
  const [value, setValue] = useState(0);
  const calculator = option.calculator?.split(" ");
  const control = useWatch({
    control: option.control,
  });
  useEffect(() => {
    if (!statusModal) {
      setValue(0);
    }
  }, [statusModal]);

  useEffect(() => {
    if (control && option.calculator) {
      const arMatch = calculator?.map((c: string) => {
        if (OPERATOR.indexOf(c) !== -1) return c;
        return isNaN(parseFloat(c)) ? (control[c] ? control[c] : 0) : c;
      });
      if (!arMatch) return;
      try {
        /* eslint no-eval: 0 */
        const value = eval(arMatch.join(" "));

        if (!isNaN(value)) {
          setValue(_.round(value, 2));
        } else {
          setValue(0);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  }, [control, option.calculator, calculator]);

  return (
    <div>
      <input value={`${value}%`} disabled className={`form-control`} />
      {/* <CurrencyInput
        id="input-example"
        name="input-name"
        className={`form-control`}
        value={value}
        decimalsLimit={2}
        disabled
      /> */}
    </div>
  );
};

export default InputCalculatorComponent;
