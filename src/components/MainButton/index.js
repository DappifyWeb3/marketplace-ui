import { Button } from '@mui/material';
import { useNavigate } from '@reach/router';

const MainButton = ({ label, to }) => {
    const navigate = useNavigate();

    const handleClick = () => navigate(to);

    return (
        <Button variant="contained" color="primary" onClick={handleClick}>{label}</Button>
    );
};

export default MainButton;