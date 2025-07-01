import { test, expect } from '@playwright/test';

test.describe('Formulaire de la liste d\'attente', () => {
  test('devrait permettre à un utilisateur de s\'inscrire avec succès', async ({ page }) => {
    // Intercepter la requête API pour ne pas dépendre du webhook N8N
    await page.route('/api/waitlist', async (route) => {
      const json = { message: 'Inscription réussie' };
      await route.fulfill({ json, status: 200 });
    });

    await page.goto('/waitlist');

    // Remplir le formulaire
    await page.getByPlaceholder('Votre nom complet').fill('John Doe');
    await page.getByPlaceholder('Votre adresse e-mail').fill('john.doe@example.com');
    await page.getByPlaceholder('Votre secteur d\'activité (ex: e-learning)').fill('Tech');

    // Soumettre le formulaire
    await page.getByRole('button', { name: 'S\'inscrire' }).click();

    // Vérifier le message de succès
    await expect(page.getByRole('heading', { name: 'Inscription réussie !' })).toBeVisible();
    await expect(page.getByText('Merci ! Vous avez été ajouté(e) à notre liste d'attente.')).toBeVisible();
  });

  test('devrait afficher une erreur si un champ est manquant', async ({ page }) => {
    await page.goto('/waitlist');
    
    // Essayer de soumettre sans remplir l'email (qui est requis)
    await page.getByPlaceholder('Votre nom complet').fill('John Doe');
    await page.getByRole('button', { name: 'S\'inscrire' }).click();

    // Le navigateur devrait empêcher la soumission grâce à l'attribut `required`
    // On vérifie que le message de succès N'EST PAS visible.
    await expect(page.getByRole('heading', { name: 'Inscription réussie !' })).not.toBeVisible();
  });
}); 