import { FaCalculator } from "react-icons/fa";
import { BaseNode } from "./BaseNode";

export const CurrencyConverterNode = ({ id }) => (
  <BaseNode
    label="Currency Converter"
    fields={[
      { type: "number", name: "amount", default: 1 },
      {
        type: "select",
        name: "baseCurrency",
        options: [
          { value: "USD", label: "USD" },
          { value: "EUR", label: "EUR" },
          { value: "JPY", label: "JPY" },
          { value: "INR", label: "INR" },
        ],
        default: "USD",
      },
      {
        type: "select",
        name: "targetCurrency",
        options: [
          { value: "USD", label: "USD" },
          { value: "EUR", label: "EUR" },
          { value: "JPY", label: "JPY" },
          { value: "INR", label: "INR" },
        ],
        default: "EUR",
      },
    ]}
    handles={[
      { id: `${id}-input`, type: "target", position: "Left" },
      { id: `${id}-output`, type: "source", position: "Right" },
    ]}
    id={id}
    infoText={"Node Designed for the Currency conversion"}
    icon={<FaCalculator sx={{ fontSize: 20, color: "#5b6e91" }} />}
  />
);
