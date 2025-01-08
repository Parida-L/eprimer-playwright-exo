import { test } from '@playwright/test';
import { navigateToSite, outputVerification, typeInText } from '../helpers/eprimer.utils';

const url = "https://exploratorytestingacademy.com/app/";
const TEST_CASES = [
    {   testName: "present tense form - I AM", 
        text: "I am what I am", 
        expctWordCount: "5", 
        expctDiscouragedWord: "2", 
        expctPossibleViolations: "0" 
    },
    {
        testName: "past tense forms - I WAS", 
        text: "If I was a rich girl", 
        expctWordCount: "6", 
        expctDiscouragedWord: "1", 
        expctPossibleViolations: "0" 
    },
    {
        testName: "negative contractions - AREN T",
        text: "The Kids Aren't Alright ", 
        expctWordCount: "4", 
        expctDiscouragedWord: "1", 
        expctPossibleViolations: "0" 
    },
    {
        testName: "nonstandard contractions - AIN'T",
        text: "Ain't No Sunshine", 
        expctWordCount: "3", 
        expctDiscouragedWord: "1", 
        expctPossibleViolations: "0" 
    },
    {
        testName: "other contractions - THEY RE",
        text: "They're living it up at the Hotel California",
        expctWordCount: "8",
        expctDiscouragedWord: "1",
        expctPossibleViolations: "0"
    },
    {
        testName: "other contractions - IT S",
        text: "It's raining men",
        expctWordCount: "3",
        expctDiscouragedWord: "0",
        expctPossibleViolations: "1"
    },
    {
        testName: "other contractions - I'M",
        text: "I'm yours",
        expctWordCount: "2",
        expctDiscouragedWord: "1",
        expctPossibleViolations: "0"
    },
];

test.describe('Eprimer Tests', () => {
    for (const { testName, text, expctWordCount, expctDiscouragedWord, expctPossibleViolations } of TEST_CASES) {
        test(`Eprimer excludes : "${testName}"`, async ({ page }) => {
            // Navigate to site
            await navigateToSite(page, url);
            // Fill input and verify output
            await typeInText(page, text);
            // Verfiy the output 
            await outputVerification(page, expctWordCount, expctDiscouragedWord, expctPossibleViolations);
        });
    }
});
