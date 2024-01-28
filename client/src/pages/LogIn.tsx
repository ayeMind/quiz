import { PageLayout } from "../shared/ui/layouts/page-layout";

export default function LogIn() {
  return (
    <PageLayout>
        <div className="absolute flex flex-col items-center justify-center w-1/4 gap-4 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#2d3449] opacity-[0.8] left-1/2 top-1/2 h-1/2 rounded-3xl">
          <p className="absolute top-3">Вход</p>
          <input type="email" className="h-8 w-72 text-[18px] pl-3 bg-slate-50 dark:bg-[#111931]" placeholder="Введите свою почту"/>
          <input type="password" className="h-8 w-72 text-[18px] pl-3 bg-slate-50 dark:bg-[#111931]" placeholder="Введите пароль"/>
          <p className="text-[24px] mt-8">Войти с помощью других сервисов:</p>
        </div>
    </PageLayout>
  )
}
