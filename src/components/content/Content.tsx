import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import Description from '../description/Description';
import './content.scss';

const Content = () => {
  const navigate = useNavigate();
  return (
    <div className="content">
      <Description />
      <Button onClick={() => navigate('/main')}>Start Game</Button>
    </div>
  );
};

export default Content;
