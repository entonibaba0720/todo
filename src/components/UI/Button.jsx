import Button from 'react-bootstrap/Button';

const CustomButton = ({ variant, onClick, size, text, style }) => {
  return (
    <Button variant={variant} onClick={onClick} size={size} style={style}>
      {text}
    </Button>
  );
};

export default CustomButton;
