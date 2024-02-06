export default function FormCell({index}: {index: number})  {
  return (
    <div className="relative bg-white dark:bg-[#2d3449] h-[10vh] w-[50vw] rounded-2xl text-[22px] p-2">
      <input id='question' type="text" className="w-full h-full px-2 bg-transparent outline-none dark:text-white" placeholder="Введите вопрос" />
      <label htmlFor="question" className={`absolute -translate-y-1/2 top-1/2 text-[5vh] right-5 opacity-25 select-none`}>{index+1}</label>
    </div>
  )
}
