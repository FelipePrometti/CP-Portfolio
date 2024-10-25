import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="container mx-auto py-8 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Nosso Portfólio
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/checkpoints"
          className="p-6 bg-cor-1 shadow-md rounded-lg hover:bg-cor-2"
        >
          <h2 className="text-2xl font-semibold text-cor-6">CheckPoints</h2>
        </Link>
        <Link
          href="/globalsolution"
          className="p-6 bg-cor-1 shadow-md rounded-lg hover:bg-cor-2"
        >
          <h2 className="text-2xl font-semibold text-cor-6">Global Solution</h2>
        </Link>
        <Link
          href="/challengersprints"
          className="p-6 bg-cor-1 shadow-md rounded-lg hover:bg-cor-2"
        >
          <h2 className="text-2xl font-semibold text-cor-6">
            Challenger Sprints
          </h2>
        </Link>
      </div>
    </main>
  );
}
