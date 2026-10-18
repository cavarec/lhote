// Invite d'installation (§7.4) : le navigateur propose, nous gardons l'événement pour le
// montrer au bon moment, après un premier saut terminé, jamais à l'ouverture.

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

class InstallPrompt {
  available = $state(false);
  private event: BeforeInstallPromptEvent | null = null;

  listen(target: Window = window): void {
    target.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.event = e as BeforeInstallPromptEvent; // l'événement n'est pas dans lib.dom : cast voulu
      this.available = true;
    });
    target.addEventListener('appinstalled', () => this.clear());
  }

  async install(): Promise<void> {
    const event = this.event;
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    this.clear();
  }

  dismiss(): void {
    this.clear();
  }

  private clear(): void {
    this.event = null;
    this.available = false;
  }
}

export const installPrompt = new InstallPrompt();
