const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  className = ''
}) => {
  const baseClass = variant === 'primary' ? 'btn-3d-primary' :
                    variant === 'secondary' ? 'btn-3d-secondary' :
                    variant === 'success' ? 'btn-3d-success' :
                    variant === 'danger' ? 'btn-3d-danger' : 'btn-3d-primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
