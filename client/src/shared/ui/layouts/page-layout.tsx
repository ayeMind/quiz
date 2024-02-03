import { ForwardedRef, ReactNode, forwardRef, useEffect, useState } from "react";
import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom'; 
import { observer } from "mobx-react-lite";
import { autorun } from "mobx";
import ThemeButton from "../buttons/theme-button";
import globalStore from "../../../app/globalStore.ts"

interface PageLayoutProps {
  children?: ReactNode;
  className?: string;
  showHeader?: boolean;
}

export const PageLayout = observer(forwardRef(function PageLayout(
  {
    children,
    className,
    showHeader = true,
  }: PageLayoutProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  
  
  const [isAuthorized, setIsAuthorized] = useState(globalStore.isAutorized)

  useEffect(() => {
    // Use MobX autorun to observe changes in globalStore.isAutorized
    const disposer = autorun(() => {
      setIsAuthorized(globalStore.isAutorized);
    });

    // Cleanup the observer when the component is unmounted
    return () => disposer();
  }, []);

  
  const handleExit = () => {
    globalStore.exit()
    setIsAuthorized(false)
  }

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

          {
            isAuthorized ? (
              <div className='flex items-center gap-6 text-[24px]'>
                <Link to="/profile">Профиль</Link>
                <Link onClick={handleExit} to="/">Выход</Link>
                <ThemeButton />
              </div>
            ) : (
              <div className='flex items-center gap-6 text-[24px]'>
                <Link to="/signup">Регистрация</Link>
                <Link to="/login">Вход</Link>
                <ThemeButton />
              </div>
            )
          }
        </header>
      ) : (
        <span className="fixed flex items-center top-5 right-4">
          <ThemeButton />
        </span>
      )}
      {children}
    </div>
  );
}));
