import { LinkButton } from "../shared/ui/buttons/link-button";
import { PageLayout } from "../shared/ui/layouts/page-layout";
import { observer } from "mobx-react-lite";


const PageNotFound = observer(() => {
  return (
    <PageLayout className="items-center justify-center" showHeader={false}>
      <p className='text-[108px] text-[#707b9c]'>404</p>
      <p className='text-[64px] text-[#707b9c]'>PAGE NOT FOUND</p>
      <LinkButton to='/'>
        Home
      </LinkButton>
    </PageLayout>

  )
})

export default PageNotFound;
