import { Link } from "react-router-dom";
import { PageLayout } from "../../shared/ui/layouts/page-layout";

export default function MyQuizzes() {
  return (
    <PageLayout>
        <Link to="/my-quizzes/create">Создать викторину</Link>  
    </PageLayout>
  )
}
