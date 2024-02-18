import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";

const Menu = observer(() => {

  return (
    <PageLayout className="h-auto min-h-screen">
      <div className='bg-[#DBE6FE] dark:bg-[#141A30] h-[66.7vh] w-screen flex items-center justify-between'>
        <div className='w-[40vw] pl-[74px]'>
          <p className="text-[42px]">
            Проходите уже сделанные другими пользователями викторины или создавайте свои
          </p>
          <p className="text-[28px] mt-4">
            Стандартный тип викторины предполагает получение одного балла за правильный ответ.
          </p>
          <p className="text-[28px] mt-4">
            В Расширенном типе каждый вариант ответа стоит разное количество баллов, и не обязательно среди них можно выделить правильный!
          </p>
        </div>

        <img src="menu.png" alt="preview" className="h-[42vh] mr-[148px]" />

      </div>
      
    </PageLayout>
  );
});

export default Menu;
