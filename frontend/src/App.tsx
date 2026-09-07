function App() {
  return (
    <main className="min-h-screen bg-app-bg flex items-center justify-center p-6">
      <section className="w-full max-w-md rounded-2xl bg-surface p-8 shadow-sm">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
          M
        </div>

        <h1 className="font-display text-3xl font-bold text-txt">MeetCore</h1>

        <p className="mt-2 text-sm text-txt-secondary">
          Videoconferencias y colaboración en un solo lugar.
        </p>

        <button className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover">
          Comenzar
        </button>
      </section>
    </main>
  );
}

export default App;
