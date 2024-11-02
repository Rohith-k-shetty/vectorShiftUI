import { BaseNode } from "./BaseNode";

export const CurrencyConverterNode = ({ id }) => (
  <BaseNode
    label="Currency Converter"
    fields={[
      { type: "number", name: "amount", default: 1 },
      {
        type: "select",
        name: "baseCurrency",
        options: ["USD", "EUR", "JPY", "INR"],
        default: "USD",
      },
      {
        type: "select",
        name: "targetCurrency",
        options: ["USD", "EUR", "JPY", "INR"],
        default: "EUR",
      },
    ]}
    handles={[
      { id: `${id}-input`, type: "target", position: "Left" },
      { id: `${id}-output`, type: "source", position: "Right" },
    ]}
    id={id}
  />
);
