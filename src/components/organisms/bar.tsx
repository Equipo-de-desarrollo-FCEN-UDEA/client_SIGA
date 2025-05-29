import Link from "next/link";

// TODO: HAY QUE CAMBIAR LOS UUID QUEMADOS
const navItems = [
  { href: "/solicitudes/auxiliar/ver", label: "Vista-auxiliar" },
  { href: "/solicitudes/adb1ea44-189f-47a7-b763-e0aae6e7c07e", label: "Decanatura" },
  { href: "/solicitudes/auxiliar/ver", label: "Vista-auxiliar" },
  { href: "/solicitudes/b882d1ef-1714-4f05-ad61-a9bfdd109592", label: "Pregrado Matemáticas" },
  { href: "/voting", label: "Mis votaciones" },
];


export const Bar = () => (
  <div className="w-full">
    <nav className="bg-green-700 w-full">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden sm:flex space-x-4">
            {navItems.map(({ href, label }, index) => (
              <Link
                key={index}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium ${index === 0
                    ? "bg-green-800 text-white"
                    : "text-white hover:bg-green-600 hover:text-white"
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  </div>
)