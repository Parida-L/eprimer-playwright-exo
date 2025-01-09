# Tests Exploratoires avec Playwright sur eprimer

## Introduction
Ce projet se concentre sur les tests exploratoires utilisant [Playwright](https://playwright.dev/) pour la plateforme **eprimer**, spécifiquement l'application monopage disponible sur [https://exploratorytestingacademy.com/app/](https://exploratorytestingacademy.com/app/). L'objectif est de réaliser des tests dynamiques et de créer une carte mentale pour documenter les résultats.

## Prérequis
Assurez-vous que les prérequis suivants sont respectés avant de commencer :

- **Node.js** : Vérifiez l'installation avec `node -v`.
- **npm** : Vérifiez l'installation avec `npm -v`.
- **Playwright** : Assurez-vous que Playwright est installé. Sinon, suivez les étapes décrites dans `playwright-init.md`, situé à la racine de ce projet.

## Architecture
Le projet suit une structure simplifiée adaptée aux applications monopages (pas de modèle POM - Page Object Model) :

```
.
├── helpers
│   └── eprimer.utils.ts   # Fonctions utilitaires pour la navigation et la vérification
├── tests
│   └── eprimer.spec.ts    # Script principal de test exploratoire
├── playwright.config.ts   # Configuration de Playwright
├── playwright-init.md     # Étapes pour initialiser l'environnement Playwright
├── package.json           # Métadonnées et dépendances du projet
└── README.md              # Documentation
```

### Fichiers clés

- **helpers/eprimer.utils.ts** : Contient des fonctions réutilisables pour la navigation, la saisie et la vérification des sorties.
- **tests/eprimer.spec.ts** : Contient les cas de test pour valider différents scénarios.

## Scénarios de Test
Le script de test exploratoire (`eprimer.spec.ts`) exécute une série de scénarios prédéfinis. Exemple de cas de test :

```typescript
const TEST_CASES = [
    {   testName: "forme au présent - I AM", 
        text: "I am what I am", 
        expctWordCount: "5", 
        expctDiscouragedWord: "2", 
        expctPossibleViolations: "0" 
    }
];
```

Chaque scénario teste des entrées textuelles spécifiques et valide les comptes de mots, les mots déconseillés et les violations possibles.

## Exécution des Tests

### Initialisation
Suivez les étapes dans `playwright-init.md` pour configurer votre environnement.

### Lancer les Tests
1. Exécutez tous les tests :
   ```bash
   npx playwright test
   ```
2. Exécutez un test spécifique :
   ```bash
   npx playwright test tests/eprimer.spec.ts
   ```

## Aperçu du Code

### `eprimer.spec.ts`
Ce fichier parcourt les cas de test et les valide dynamiquement :

```typescript
import { test } from '@playwright/test';
import { navigateToSite, outputVerification, typeInText } from '../helpers/eprimer.utils';

const url = "https://exploratorytestingacademy.com/app/";
const TEST_CASES = [
    {
        testName: "forme au présent - I AM",
        text: "I am what I am",
        expctWordCount: "5",
        expctDiscouragedWord: "2",
        expctPossibleViolations: "0"
    },
    // Plus de cas de test...
];

test.describe('Tests eprimer', () => {
    for (const { testName, text, expctWordCount, expctDiscouragedWord, expctPossibleViolations } of TEST_CASES) {
        test(`Eprimer exclut : "${testName}"`, async ({ page }) => {
            await navigateToSite(page, url);
            await typeInText(page, text);
            await outputVerification(page, expctWordCount, expctDiscouragedWord, expctPossibleViolations);
        });
    }
});
```

### `eprimer.utils.ts`
Contient des fonctions utilitaires pour gérer la navigation, la saisie et la vérification des sorties :

- **navigateToSite** : Navigue vers l'URL et valide le titre de la page et la réponse API.
- **typeInText** : Remplit le champ de saisie de texte et déclenche le bouton "Check For E-Prime".
- **outputVerification** : Vérifie les comptes de mots, les mots déconseillés et les violations possibles.

Exemple :

```typescript
export async function navigateToSite(page: Page, url: string) {
    await page.goto(url);
    await expect(page).toHaveURL(url);
    const response = await page.request.get(url);
    await expect(response).toBeOK();
    const pageTitle = await page.title();
    expect(pageTitle).not.toBeNull();
}
```

## Carte Mentale
Après avoir terminé les tests exploratoires, créez une carte mentale pour visualiser les flux, les fonctionnalités et les cas de test potentiels de l'application. Des outils comme [XMind](https://www.xmind.net/) ou [Miro](https://miro.com/) peuvent être utilisés.

## Contribution
Les contributions sont les bienvenues pour améliorer les scénarios de test ou la structure. Soumettez une pull request pour examen.

## Licence
Ce projet est sous licence [MIT License](./LICENSE).
