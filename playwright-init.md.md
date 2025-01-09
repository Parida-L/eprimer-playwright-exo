# Guide : Démarrer un Projet Playwright

## Étape 1 : Vérifier les Prérequis

### Vérifier la présence de Node.js
Exécutez la commande suivante dans votre terminal pour vérifier si Node.js est installé :

```bash
node -v
```

Si Node.js n'est pas installé, téléchargez-le depuis [Node.js Official Website](https://nodejs.org/).

---

### Vérifier la présence de npm
npm est installé automatiquement avec Node.js. Vérifiez sa présence :

```bash
npm -v
```

---

### Vérifier si Playwright est installé
Si Playwright est déjà installé globalement, vous pouvez vérifier sa version :

```bash
npx playwright --version
```

Si Playwright n'est pas installé, vous pourrez l'ajouter dans les étapes suivantes.

---

## Étape 2 : Initialiser un Nouveau Projet

1. **Créer un Nouveau Dossier**

   ```bash
   mkdir mon-projet-playwright
   cd mon-projet-playwright
   ```

2. **Initialiser un Projet Node.js**
   Créez un fichier `package.json` pour gérer les dépendances :

   ```bash
   npm init -y
   ```

---

## Étape 3 : Installer Playwright

1. **Installer Playwright comme Dépendance**
   Installez Playwright en tant que dépendance de développement :

   ```bash
   npm install --save-dev playwright
   ```

2. **Installer les Navigateurs**
   Une fois Playwright installé, téléchargez les navigateurs requis :

   ```bash
   npx playwright install
   ```

   Vous pouvez également installer des navigateurs spécifiques si nécessaire :

   ```bash
   npx playwright install chromium
   npx playwright install firefox
   npx playwright install webkit
   ```

---

## Étape 4 : Configuration Playwright (Optionnelle)

1. **Générer une Configuration Playwright**
   Pour commencer avec l'écriture de tests end-to-end avec Playwright, exécutez :

   ```bash
   npm init playwright@latest
   ```

2. **Processus de Génération**
   Lors de l'exécution de la commande, voici ce qui est demandé :

   ```
   Getting started with writing end-to-end tests with Playwright:
   Initializing project in '.'
   √ Do you want to use TypeScript or JavaScript? · TypeScript
   √ Where to put your end-to-end tests? · tests
   √ Add a GitHub Actions workflow? (y/N) · false
   √ Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n) · true
   Installing Playwright Test (npm install --save-dev @playwright/test)…
   ```

   Ces étapes créent :
   - Une configuration par défaut dans `playwright.config.ts`.
   - Un dossier `tests` pour vos fichiers de tests.

3. **Personnaliser la Configuration**
   Ouvrez le fichier `playwright.config.ts` pour ajuster les paramètres selon vos besoins, comme le chemin des tests ou les navigateurs.

---

## Étape 5 : Créer un Premier Test

1. **Créer un Fichier de Test**
   Ajoutez un fichier de test dans un dossier `tests` :

   ```bash
   mkdir tests
   touch tests/example.spec.ts
   ```

2. **Ajouter du Code de Test**
   Ouvrez `tests/example.spec.ts` et ajoutez le code suivant :

   ```typescript
   import { test, expect } from '@playwright/test';

   test('basic test', async ({ page }) => {
       await page.goto('https://playwright.dev/');
       const title = await page.title();
       expect(title).toBe('Fast and reliable end-to-end testing for modern web apps | Playwright');
   });
   ```

---

## Étape 6 : Exécuter le Test

1. **Lancer les Tests**
   Exécutez les tests avec :

   ```bash
   npx playwright test
   ```

2. **Lancer avec l'Interface Utilisateur (UI)**
   Playwright offre une interface utilisateur pour explorer vos tests :

   ```bash
   npx playwright test --ui
   ```

---

## Résultat Final : Structure du Projet

Après avoir suivi les étapes ci-dessus, voici à quoi ressemble la structure de votre projet :

```plaintext
mon-projet-playwright/
├── node_modules/
├── tests/
│   └── example.spec.ts
├── package.json
├── package-lock.json
└── playwright.config.ts
```

---

## Dossiers Supplémentaires

- **POM Design Pattern** : Créez un dossier `page-objects`.
- **Single-Page App (SPA)** : Créez un dossier `helpers/utils`.

Ce guide est prêt pour être utilisé et vous aider à démarrer avec Playwright. 🎉