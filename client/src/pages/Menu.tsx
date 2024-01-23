import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";

const Menu = observer(() => {
  return (
    <PageLayout>
      <div className='bg-[#DBE6FE] dark:bg-[#141A30] h-2/3 w-screen flex items-center'>
        <div className='w-2/5 pl-[74px]'>
          <p className="text-[42px]">
            Проходите уже сделанные другими пользователями викторины или создавайте свои
          </p>
          <p className="text-[28px] mt-4">
            Есть возможность игры с друзьями или случайными людьми. Для прохождения викторин вместе по коду приглашения не обязательно регистрироваться на сайте!
          </p>
        </div>
      </div>
      
    </PageLayout>
  );
});

export default Menu;
