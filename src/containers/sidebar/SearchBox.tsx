import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
	return (
		<div
			className='search-box-div'
		>
			<input
				type="text"
				className="search-inp"
				placeholder="Search by Invoice No."
				name="search"
			/>
			<button
				className="search-btn"
				type="submit"
			>
				<SearchIcon className='search-icon' />
			</button>
		</div>
	);
};

export default SearchBox;