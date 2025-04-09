import { test, expect } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })  // networkidle espera todas as requisições finalizem

  await page.getByLabel('Seu e-mail').fill('admin@email.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText("Enviamos um link de autenticação para o seu e-mail!")
  await expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByLabel('Seu e-mail').fill('wrong@email.com')
  await page.getByRole('button', { name: 'Acessar Painel' }).click()

  const toast = page.getByText("Credenciais inválidas")
  await expect(toast).toBeVisible()
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain('/sign-up')
})
