import { Link } from 'react-router-dom'

export default function TrendingRow({ products = [] }) {
  if (!products?.length) return null

  return (
    <section className="mb-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Trending products</h2>
        <div className="text-sm text-gray-500">Top picks this week</div>
      </div>
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-3">
        {products.map(p => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="group snap-start shrink-0 border rounded-2xl overflow-hidden bg-white min-w-[280px] sm:min-w-[300px] hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={p.imageUrl || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'}
                onError={(e)=>{ e.currentTarget.src='https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop' }}
                alt={p.title}
                className="w-full h-56 object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-sm font-semibold px-3 py-1.5 rounded-md shadow">
                ₹{p.price}
              </span>
            </div>
            <div className="p-4">
              <div className="font-semibold text-base line-clamp-1 tracking-tight group-hover:underline">{p.title}</div>
              <div className="text-sm text-gray-500 line-clamp-2 mt-1">{p.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


