import { usePwaInstall } from "@/hooks/use-pwa-install";

const PwaInstallBanner = () => {
  const { canInstall, canInstallIOS, install, dismiss } = usePwaInstall();

  if (!canInstall && !canInstallIOS) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-card/95 backdrop-blur border-2 border-border rounded-2xl shadow-2xl px-5 py-3 max-w-sm w-[calc(100%-2rem)]">
      <span className="text-2xl">📲</span>
      {canInstallIOS ? (
        <p className="flex-1 text-sm font-semibold text-foreground leading-snug">
          Toca em <span className="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline w-4 h-4 mb-0.5">
              <path d="M12 2a1 1 0 0 1 .707.293l4 4a1 1 0 0 1-1.414 1.414L13 5.414V15a1 1 0 1 1-2 0V5.414L8.707 7.707A1 1 0 0 1 7.293 6.293l4-4A1 1 0 0 1 12 2zM4 17a1 1 0 0 1 1 1v1h14v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a1 1 0 0 1 1-1z"/>
            </svg>
          </span> e depois <strong>Adicionar ao ecrã inicial</strong>
        </p>
      ) : (
        <p className="flex-1 text-sm font-semibold text-foreground leading-snug">
          Instala a app para usar sem internet!
        </p>
      )}
      {canInstall && (
        <button
          onClick={install}
          className="px-3 py-1.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Instalar
        </button>
      )}
      <button
        onClick={dismiss}
        aria-label="Fechar"
        className="text-muted-foreground hover:text-foreground transition-colors text-lg leading-none"
      >
        ✕
      </button>
    </div>
  );
};

export default PwaInstallBanner;