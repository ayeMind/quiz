import { ForwardedRef, ReactNode, forwardRef } from "react";
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom'; 
import ThemeButton from "../buttons/theme-button";

interface PageLayoutProps {
  children?: ReactNode;
  className?: string;
  showHeader?: boolean;
}

export const PageLayout = forwardRef(function PageLayout(
  {
    children,
    className,
    showHeader = true,
  }: PageLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div  
      ref={ref}
      className={twMerge(
        "h-screen bg-gradient-light dark:bg-gradient-dark flex flex-col text-[36px]",
        className,
      )}
    >

      {showHeader ? (
        <header className="w-screen h-[64px] flex justify-between items-center px-4 text-[28px]">
        <div className='flex items-center gap-6 text-[24px]'>
          <Link to="/" className='text-[32px] italic'>QUIZSET</Link>
          <Link to="/my-quizzes">Мои викторины</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/online">Онлайн</Link>
          <Link to="/catalog"></Link>
        </div>

        <div className='flex items-center gap-6 text-[24px]'>
          <Link to="/signup">Регистрация</Link>
          <Link to="/login">Вход</Link>
          <ThemeButton />
        </div>
      </header>
      ) : (
        <span className="fixed flex items-center top-5 right-4">
          <ThemeButton />
        </span>
      )}
      {children}
    </div>
  );
});
