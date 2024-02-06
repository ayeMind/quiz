
export default function FormMain() {
  return (
    <div className="bg-white dark:bg-[#2d3449] h-[50vh] w-[50vw] rounded-2xl text-[22px] p-2 flex flex-col gap-6">
      <input type="text" className="w-full h-12 px-2 bg-transparent outline-none dark:text-white" placeholder="Введите название викторины" />
      <textarea className="w-full px-2 overflow-y-auto bg-transparent outline-none resize-none h-[10vh] dark:text-white" placeholder="Введите описание викторины" />
      <span className="flex flex-col gap-4">
        <p className="px-2">Загрузите превью</p>
        <input type='file' className='w-full h-12 px-2 bg-transparent outline-none dark:text-white' accept='image/*' />
      </span>
    </div>
  )
}
