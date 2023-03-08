import type { RootState } from '../../reduxInit/store';

// Other code such as selectors can use the imported `RootState` type
const getCountValue = (state: RootState) => state.counter.value;

export { getCountValue };
