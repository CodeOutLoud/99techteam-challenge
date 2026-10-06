import { useState, useEffect, useReducer } from "react";
import "./App.css";

function App() {
  const [currencyList, setCurrencyList] = useState([]);

  const [state, dispatch] = useReducer(priceReducer, {
    firstValue: 0,
    firstCurrency: null,
    secondValue: 0,
    secondCurrency: null,
  });

  useEffect(() => {
    // Fetch currency list from API and update the state
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter duplicates based on currency name and keep the first occurrence
        const uniqueCurrencies = data.filter(
          (currency, index, self) =>
            index === self.findIndex((c) => c.currency === currency.currency),
        );
        setCurrencyList(uniqueCurrencies);

        // Set default currencies if available
        if (uniqueCurrencies.length > 0) {
          dispatch({
            type: "SET_DEFAULT_CURRENCY",
            payload: {
              firstCurrency: uniqueCurrencies[0].price,
              secondCurrency:
                uniqueCurrencies[1]?.price || uniqueCurrencies[0].price,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching currency list:", error);
      });
  }, []);

  return (
    <>
      <section id="center">
        <h1>Currency Converter</h1>

        <form>
          <input
            className="counter"
            style={{ marginRight: "12px" }}
            type="number"
            min="0"
            value={state.firstValue}
            onChange={(e) =>
              dispatch({
                type: "SET_FIRST_VALUE",
                payload: parseFloat(e.target.value) || 0,
              })
            }
          />

          <select
            className="counter"
            value={state.firstCurrency || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_FIRST_CURRENCY",
                payload: parseFloat(e.target.value) || 0,
              })
            }
          >
            {currencyList.map((currency) => (
              <option key={currency.currency} value={currency.price}>
                {currency.currency}
              </option>
            ))}
          </select>

          <br />

          <input
            className="counter"
            style={{ marginRight: "12px" }}
            type="number"
            min="0"
            value={state.secondValue}
            onChange={(e) =>
              dispatch({
                type: "SET_SECOND_VALUE",
                payload: parseFloat(e.target.value) || 0,
              })
            }
          />

          <select
            className="counter"
            value={state.secondCurrency || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_SECOND_CURRENCY",
                payload: parseFloat(e.target.value) || 0,
              })
            }
          >
            {currencyList.map((currency) => (
              <option key={currency.currency} value={currency.price}>
                {currency.currency}
              </option>
            ))}
          </select>
        </form>
      </section>
    </>
  );
}

function priceReducer(state, action) {
  switch (action.type) {
    case "SET_DEFAULT_CURRENCY":
      return {
        ...state,
        firstCurrency: action.payload.firstCurrency,
        secondCurrency: action.payload.secondCurrency,
      };

    case "SET_FIRST_VALUE":
      if (state.secondCurrency === 0 || isNaN(state.secondCurrency)) {
        return state; // Prevent division by zero or NaN
      }
      const secondValueByFirst =
        (action.payload * state.firstCurrency) / state.secondCurrency;
      return {
        ...state,
        firstValue: action.payload,
        secondValue: secondValueByFirst,
      };

    case "SET_FIRST_CURRENCY":
      if (state.secondCurrency === 0 || isNaN(state.secondCurrency)) {
        return state; // Prevent division by zero or NaN
      }
      const secondValueByCurrency =
        (state.firstValue * action.payload) / state.secondCurrency;
      return {
        ...state,
        firstCurrency: action.payload,
        secondValue: secondValueByCurrency,
      };

    case "SET_SECOND_VALUE":
      if (state.firstCurrency === 0 || isNaN(state.firstCurrency)) {
        return state; // Prevent division by zero or NaN
      }
      const firstValueBySecond =
        (action.payload * state.secondCurrency) / state.firstCurrency;
      return {
        ...state,
        secondValue: action.payload,
        firstValue: firstValueBySecond,
      };

    case "SET_SECOND_CURRENCY":
      if (state.firstCurrency === 0 || isNaN(state.firstCurrency)) {
        return state; // Prevent division by zero or NaN
      }
      const firstValueByCurrency =
        (state.secondValue * action.payload) / state.firstCurrency;
      return {
        ...state,
        secondCurrency: action.payload,
        firstValue: firstValueByCurrency,
      };

    default:
      return state;
  }
}

export default App;
