export default function FormCell() {
  return (
    <div className="bg-white dark:bg-[#2d3449] h-[10vh] w-[50vw] rounded-2xl text-[22px] p-2">
      <input type="text" className="w-full h-full px-2 bg-transparent outline-none dark:text-white" placeholder="Введите вопрос" />
    </div>
  )
}
