interface ButtonProps {
    children: React.ReactNode,
    className: string,
    onClick: () => void
}

function Button({ children, className, onClick }: ButtonProps) {
    return (
        <div
            className={className}
            onClick={() => onClick()}
        >{children}</div>
    )
}

export default Button;