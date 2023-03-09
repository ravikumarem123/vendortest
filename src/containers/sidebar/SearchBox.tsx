import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../reduxInit/hooks';
import SearchIcon from '@mui/icons-material/Search';
import { sagaActions } from '../../reduxInit/sagaActions';

const SearchBox = () => {

	const [searchText, setSearchText] = useState<string>('');
	const dispatch = useAppDispatch();

	const handleSearchByInvoice = () => {
		if (searchText.length > 0) {
			dispatch({
				type: sagaActions.FETCH_POD_DETAILS, payload: {
					searchText,
					searchClicked: true
				}
			});
		} else {
			toast.error("Invalid Invoice number", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		}
	};

	return (
		<div
			className='search-box-div'
		>
			<input
				type="text"
				className="search-inp"
				placeholder="Search by Invoice No."
				name="search"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<button
				className="search-btn"
				type="submit"
				onClick={handleSearchByInvoice}
			>
				<SearchIcon className='search-icon' />
			</button>
		</div>
	);
};

export default SearchBox;