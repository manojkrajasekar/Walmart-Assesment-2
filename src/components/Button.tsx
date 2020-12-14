import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: string;
}

const Button: React.FC<IButtonProps> = ({
    icon,
    className,
    onClick,
    children,
    disabled,
    ...props
}) => {
    return (
        <button
            className={`br2 pa3 outline-0 bn-l b flex items-center ${
                !disabled && 'dim pointer'
            } ${disabled && 'o-50'} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {icon && <span data-testid="icon" className="material-icons">{icon}</span>} {children}
        </button>
    );
};

export default Button;
