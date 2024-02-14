import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../../shared/ui/layouts/page-layout'
import newQuizStore from './newQuizStore'

export const Settings = observer(() => {
  return (
    <PageLayout>
        <div className='flex flex-col items-center justify-center h-full gap-5'>
            <p className='text-[48px] mb-10'>Какой тип викторины ты хочешь создать?</p>
            <button className='relative w-1/2 bg-cyan-50 dark:bg-[#2d3449] opacity-85 h-[100px] rounded-2xl flex items-center text-center px-6 hover:scale-105 hover:opacity-60 hover:text-indigo-700'
                 onClick={() => newQuizStore.setType('standard')}>
                Стандартный 
                <p className='absolute opacity-50 right-5'>1 правильный ответ - 1 балл</p>
            </button>

            <button className='relative w-1/2 bg-cyan-50 dark:bg-[#2d3449] opacity-85 h-[100px] rounded-2xl flex items-center text-center px-6 hover:scale-105 hover:opacity-60 hover:text-indigo-700'
                 onClick={() => newQuizStore.setType('extended')}>
                Расширенный 
                <p className='absolute opacity-50 right-5'>произвольные очки за все ответы</p>

            </button>
        </div>
    </PageLayout>
  )
})
