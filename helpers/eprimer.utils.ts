import { Page, expect } from '@playwright/test';

//GO TO THE SITE 
export async function navigateToSite(page: Page, url: string) {
    await page.goto(url);
    //Verify the URL 
    await expect(page).toHaveURL(url);
    //API Assertion 
    const response = await page.request.get(url);
    await expect(response).toBeOK();
    // Assert that the title is present and matches
    const pageTitle = await page.title();
    expect(pageTitle).not.toBeNull();
    console.log(`Page Title: ${pageTitle}`);
}

//FILL INPUT 
export async function typeInText(page: Page, text: string) {
    const textInput = page.getByLabel('Text:')
    const checkBtn = page.getByRole('button', { name: 'Check For E-Prime' })
    //verify text input 
    await expect(textInput).toBeVisible();
    await expect(textInput).toBeEditable();
    await expect(textInput).toBeEmpty()
    //fill text input 
    await textInput.fill(text);
    // Verify that the input has been filled correctly
    await expect(textInput).toHaveValue(text);
    //verify button 
    await expect(checkBtn).toBeVisible();
    await expect(checkBtn).toBeEnabled();
    //click button
    await checkBtn.click();
    // Assert that an output element appears
    // const outputContainer = page.locator('#outputContainer');
    // await expect(outputContainer).toBeVisible();
}

//VERIFICATION OF THE OUTPUT
export async function outputVerification(
    page: Page, 
    expctWordCount: string, 
    expctDiscouragedWord: string,
    expctPossibleViolations: string
) {
    const wordCountLocator = page.locator('#wordCount');
    const discouragedWordLocator = page.locator('#discouragedWordCount');
    const possibleViolationsLocator = page.locator('#possibleViolationCount');

    // Assert that all output fields are visible
    await expect(wordCountLocator).toBeVisible();
    await expect(discouragedWordLocator).toBeVisible();
    await expect(possibleViolationsLocator).toBeVisible();

    await expect(wordCountLocator).toHaveText(expctWordCount);
    console.log(`Expected Word Count: ${expctWordCount}, Found: ${await wordCountLocator.textContent()}`);
    await expect(discouragedWordLocator).toHaveText(expctDiscouragedWord);
    console.log(`Expected Discouraged Words: ${expctDiscouragedWord}, Found: ${await discouragedWordLocator.textContent()}`);
    await expect(possibleViolationsLocator).toHaveText(expctPossibleViolations);
    console.log(`Expected Possible Violations: ${expctPossibleViolations}, Found: ${await possibleViolationsLocator.textContent()}`);

}
