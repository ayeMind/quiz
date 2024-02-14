import { observer } from "mobx-react-lite";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";
import SettingsButton from "../../../shared/ui/buttons/SettingsButton";
import newQuizStore from "./newQuizStore";

export const Settings = observer(() => {
  const handleSetType = (e: React.MouseEvent<HTMLElement>) => {
    const type = e.currentTarget.id;
    newQuizStore.setType(type);
  };


  if (!newQuizStore.settings.type) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-full gap-5">
          <p className="text-[48px] mb-10">
            Какой тип викторины ты хочешь создать?
          </p>
          <SettingsButton
            id="standard"
            onClick={handleSetType}
            subText="1 правильный ответ - 1 балл"
          >
            Стандартный
          </SettingsButton>
          <SettingsButton
            id="extend"
            onClick={handleSetType}
            subText="произвольные очки за каждый ответ"
          >
            Расширенный
          </SettingsButton>
        </div>
      </PageLayout>
    );
  }
});
