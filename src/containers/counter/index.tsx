import { incrementByAmount } from "./counterSlice";
import { useAppDispatch } from "../../reduxInit/hooks";
import { useAppSelector } from "../../reduxInit/hooks";
import { getCountValue } from "./counterSelector";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

const Counter = () => {

	const [val, setVal] = useState<number>(0);

	const dispatch = useAppDispatch();
	const count = useAppSelector(getCountValue);


	return (
		<div>
			<h1>This is a counter Application</h1>
			<p>Count value is: {count}</p>


			{/*<input
				value={val}
				onChange={(e) => setVal(Number(e.target.value))}
				style={{ borderRightWidth: 0, outline: 0, }}
			/>
			<button onClick={() => dispatch(incrementByAmount(val))}>Check</button>*/}
		</div>
	);
};

export default Counter;