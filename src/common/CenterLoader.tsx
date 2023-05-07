import { CircularProgress } from "@mui/material";

const CenterLoader = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<CircularProgress />
		</div>
	);
};

export default CenterLoader;