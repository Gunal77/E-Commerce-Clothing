export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl mb-8">
      <img
        src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop"
        alt="Fashion banner"
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
      <div className="absolute inset-0 flex items-end md:items-center">
        <div className="p-6 md:p-10 text-white">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Fresh fits for everyone</h1>
          <p className="mt-2 text-sm md:text-base text-white/90">Discover trending styles in men's and women's clothing.</p>
        </div>
      </div>
    </section>
  )
}


