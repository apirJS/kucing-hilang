export default function AuthButton() {
  return (
    <div className="md:flex hidden gap-x-2 text-accent text-base font-bold justify-center items-center">
      <button className="bg-primary border-slate-600 px-2 py-1 rounded-md min-w-20 max-h-10">Masuk</button>
      <button className="bg-primary border-slate-600 px-2 py-1 rounded-md min-w-20 max-h-10">Daftar</button>
    </div>
  )
}