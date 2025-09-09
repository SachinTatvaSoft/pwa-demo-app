import { useEffect, useState } from "react";

type InstalledRelatedApp = {
  id?: string;
  platform?: string;
  url?: string;
};

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(
    localStorage.getItem("pwaInstalled") === "true"
  );

  const checkStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  useEffect(() => {
    if (checkStandalone()) {
      setIsInstalled(true);
      setIsInstallable(false);
      return;
    }

    const detectInstalled = async () => {
      try {
        const fn = (navigator as any).getInstalledRelatedApps;
        if (typeof fn === "function") {
          const apps: InstalledRelatedApp[] = await fn();
          const found = apps.some((a) => a.platform === "webapp");
          if (found) {
            setIsInstalled(true);
            localStorage.setItem("pwaInstalled", "true");
          }
        }
      } catch {
        /* ignore */
      }
    };
    detectInstalled();

    const bipHandler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", bipHandler);

    const installedHandler = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      localStorage.setItem("pwaInstalled", "true");
    };
    window.addEventListener("appinstalled", installedHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", bipHandler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(() => {});
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return { isInstallable, isInstalled, promptInstall };
}
