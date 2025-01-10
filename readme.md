# Tests Exploratoires avec Playwright sur eprimer

## Introduction
Ce projet met en œuvre des tests exploratoires utilisant Playwright pour la plateforme **eprimer**, spécifiquement l'application monopage accessible à l'adresse suivante :  
[https://exploratorytestingacademy.com/app/](https://exploratorytestingacademy.com/app/).  

L'objectif principal est de mener des tests dynamiques tout en documentant les résultats sous forme de carte mentale.

---

## Prérequis
Avant de commencer, assurez-vous que les prérequis suivants sont respectés :
- **Node.js** : Vérifiez l'installation avec `node -v`.
- **npm** : Vérifiez l'installation avec `npm -v`.
- **Playwright** : Si Playwright n'est pas installé, suivez les étapes détaillées dans le fichier [`playwright-init.md`](./playwright-init.md).

---

## Architecture du Projet
Voici la structure simplifiée du projet, adaptée aux applications monopages (pas de modèle POM - Page Object Model) :  

```
├── helpers
│   └── eprimer.utils.ts    # Fonctions utilitaires pour navigation et vérification
├── tests
│   └── eprimer.spec.ts     # Script principal des tests exploratoires
├── playwright.config.ts    # Configuration de Playwright
├── playwright-init.md      # Guide pour initialiser Playwright
├── package.json            # Métadonnées et dépendances
└── README.md               # Documentation principale
```

### Fichiers Clés
- **helpers/eprimer.utils.ts** : Contient des fonctions réutilisables pour la navigation, la saisie et la vérification des sorties.
- **tests/eprimer.spec.ts** : Contient les scénarios de test pour valider différents cas d'usage.

---

## Étapes des Tests Exploratoires à Retenir

1. **Tester avec notre première impression** : évaluer l'application à partir de notre ressenti initial.  
2. **Tester avec la connaissance du domaine ou la documentation** : exploiter ce que l'on sait déjà.  
3. **Tester en mettant l’accent sur les fonctionnalités** : valider à la fois le code et l’interface utilisateur.  
4. **Tester en se concentrant sur les données** : vérifier les entrées valides et non valides en utilisant le partitionnement des classes d'équivalence et l’analyse des valeurs limites.  
5. **Tester en considérant l’environnement** : examiner si des facteurs externes influencent les fonctionnalités.  
6. **Tester avec un mindmap comme documentation** : visualiser les flux, les fonctionnalités et les résultats des tests.  
7. **Tester avec nos tests automatisés existants** : intégrer les explorations aux suites de tests automatisés.  
8. **Tester en automatisant davantage** : identifier les opportunités pour écrire des tests supplémentaires.

---

## Scénarios de Test
Le fichier `eprimer.spec.ts` exécute une série de scénarios prédéfinis. Chaque scénario teste une entrée textuelle et valide plusieurs résultats, notamment :  
- Le nombre total de mots.  
- Les mots déconseillés.  
- Les violations potentielles.  

### Exemple de Scénario
```javascript
const TEST_CASES = [
    {
        testName: "forme au présent - I AM",
        text: "I am what I am",
        expctWordCount: "5",
        expctDiscouragedWord: "2",
        expctPossibleViolations: "0"
    }
];
```

---

## Exécution des Tests

### Initialisation
Configurez votre environnement en suivant les étapes décrites dans le fichier  [`playwright-init.md`](./playwright-init.md).

### Commandes pour Lancer les Tests
- Exécuter tous les tests :  
  ```bash
  npx playwright test
  ```
- Exécuter un test spécifique :  
  ```bash
  npx playwright test tests/eprimer.spec.ts
  ```

---

## Aperçu du Code

### Fichier `eprimer.spec.ts`
Ce fichier itère sur les cas de test et les valide dynamiquement :

```javascript
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
    // Ajouter d'autres cas de test ici...
];

test.describe('Tests Exploratoires eprimer', () => {
    for (const { testName, text, expctWordCount, expctDiscouragedWord, expctPossibleViolations } of TEST_CASES) {
        test(`"${testName}"`, async ({ page }) => {
            await navigateToSite(page, url);
            await typeInText(page, text);
            await outputVerification(page, expctWordCount, expctDiscouragedWord, expctPossibleViolations);
        });
    }
});
```

### Fichier `eprimer.utils.ts`
Contient des fonctions utilitaires pour automatiser les interactions :  

```javascript
export async function navigateToSite(page, url) {
    await page.goto(url);
    await expect(page).toHaveURL(url);
    const response = await page.request.get(url);
    await expect(response).toBeOK();
    const pageTitle = await page.title();
    expect(pageTitle).not.toBeNull();
}
```

---

## Carte Mentale
Après avoir terminé les tests exploratoires, créez une carte mentale pour documenter :
- Les flux de l'application.
- Les fonctionnalités couvertes.
- Les cas de test potentiels.

Utilisez des outils comme **XMind** ou **Miro** pour créer cette carte mentale.

---

## Contribution
Les contributions sont les bienvenues pour enrichir les scénarios de test ou optimiser la structure du projet. Soumettez vos améliorations via une pull request.

---

## Licence
Ce projet est sous licence **MIT License**.
