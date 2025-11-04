import { Link } from 'react-router-dom'

function CategoryCard({ title, img, to }) {
  return (
    <Link to={to || '/'} className="group relative block rounded-xl overflow-hidden shadow-sm border">
      <img src={img} alt={title} className="w-full h-48 md:h-56 object-cover transition group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 p-4">
        <div className="inline-block bg-white text-gray-900 text-sm font-semibold px-3 py-1 rounded">{title}</div>
      </div>
    </Link>
  )
}

export default function CategoryGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
      <CategoryCard
        title="Men"
        img="https://images.pexels.com/photos/7621039/pexels-photo-7621039.jpeg"
        to="/men"
      />
      <CategoryCard
        title="Women"
        img="https://images.pexels.com/photos/8307686/pexels-photo-8307686.jpeg"
        to="/women"
      />
    </section>
  )
}


