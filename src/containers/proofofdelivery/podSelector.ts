import type { RootState } from '../../reduxInit/store';

const isSearchClicked = (state: RootState) => {
    return state.pod.searchClicked;
};

export { isSearchClicked };
