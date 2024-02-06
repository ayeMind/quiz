import FormCell from "../../../shared/ui/components/FormCell";
import { PageLayout } from "../../../shared/ui/layouts/page-layout";

export default function CreateQuiz() {
  return (
    <PageLayout>
      <div className="flex flex-col items-center w-screen">
        <p>Создай свою собственную викторину!</p>
        <form className="flex flex-col gap-3 py-3">
          <FormCell />
          <FormCell />
        </form>
      </div>
    </PageLayout> 
  )
}
