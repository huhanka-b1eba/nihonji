import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
}

export const Skeleton = ({ width = "100%", height = 16, radius = 3, className }: SkeletonProps) => {
  return (
    <div
      className={classNames(cls.Skeleton, {}, [className])}
      style={{
        width,
        height,
        borderRadius: radius,
      }}
    />
  );
};
