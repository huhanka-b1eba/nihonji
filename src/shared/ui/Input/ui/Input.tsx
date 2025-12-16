import React from "react";
import cls from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({ label, className, ...rest }) => (
  <div className={`${cls.field} ${className ?? ""}`}>
    {label && <label>{label}</label>}
    <input {...rest} />
  </div>
);

export default Input;
