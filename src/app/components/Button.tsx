import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-['Poppins'] font-medium transition-colors focus:outline-none cursor-pointer";
  
  const variants = {
    primary: "bg-[#FF9B6F] text-[#1F2F2D] hover:bg-[#ff8552]",
    secondary: "bg-[#225C4B] text-white hover:bg-[#1c4b3d]",
    outline: "border border-[#D7C7A9] text-[#D7C7A9] hover:bg-[#D7C7A9]/10",
    ghost: "text-[#D7C7A9] hover:bg-[#D7C7A9]/10 hover:text-white"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
