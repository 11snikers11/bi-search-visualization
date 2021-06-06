import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const array = [
    1, 5, 9, 8, 11, 13, 14, 15, 22, 50, 59, 60, 61, 62, 80, 81, 82, 1000, 1200,
  ];
  const inputTarget = useRef<HTMLInputElement>(null);
  const [target, setTarget] = useState(0);
  const [iters, setIters] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [leftPointer, setLeftPointer] = useState(0);
  const [rightPointer, setRightPointer] = useState(array.length - 1);
  let mid = Math.floor((rightPointer + leftPointer) / 2);
  function biSearch() {
    mid = Math.floor((rightPointer + leftPointer) / 2);
    if (target === array[mid]) setTargetIndex(mid);
    if (target < array[mid]) setRightPointer(mid - 1);
    if (target > array[mid]) setLeftPointer(mid + 1);
    setIters(prev => prev + 1);
  }
  useEffect(() => {
    if (target === 0) return;
    setTimeout(() => {
      biSearch();
    }, 2000);
  }, [target, mid]);

  return (
    <>
      <div className="main-container">
        <span>[</span>
        {array.map((el, index) => {
          const spanClasses: Array<string> = [];
          if (el === target) spanClasses.push('target');
          if (index === leftPointer) spanClasses.push('left-pointer');
          if (index === rightPointer) spanClasses.push('right-pointer');
          if (index === mid) spanClasses.push('mid');
          return (
            <span className={spanClasses.join(' ')} key={index}>
              {el}
            </span>
          );
        })}
        <span>]</span>
      </div>
      <div className="controls">
        <input ref={inputTarget} placeholder="set target..." />
        <button
          onClick={() => {
            const target = inputTarget.current!;
            setTarget(+target.value);
          }}
        >
          Find target
        </button>
        <p>Target index: {targetIndex}</p>
        <p>Iters: {iters}</p>
      </div>
    </>
  );
}

export default App;
