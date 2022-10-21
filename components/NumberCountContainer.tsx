import { useStoreNumber } from "../core/config/store/number";

const NumberCountContainer = () => {
  const { count, increase, decrease } = useStoreNumber((state) => state);
  return (
    <div>
      <span>Count : {count}</span>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
};

export default NumberCountContainer;
