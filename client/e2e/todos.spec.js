import { test, expect } from '@playwright/test'

test.describe('Todo App E2E', () => {
  let testUser

  test.beforeEach(async ({ page }) => {
    // Create unique user for each test
    const timestamp = Date.now()
    testUser = {
      name: `Test User ${timestamp}`,
      email: `test${timestamp}@example.com`
    }
    
    await page.goto('/')
    
    // Create a test user first
    await page.fill('[data-testid="user-name-input"]', testUser.name)
    await page.fill('[data-testid="user-email-input"]', testUser.email)
    await page.click('[data-testid="add-user-button"]')
    
    // Wait for user to be created and appear in list
    await expect(page.locator('[data-testid="user-list"]')).toContainText(testUser.name)
  })

  test('complete todo workflow', async ({ page }) => {
    // Login with the created user
    await page.selectOption('[data-testid="user-select"]', testUser.name)
    await page.fill('[data-testid="email-input"]', testUser.email)
    await page.click('[data-testid="login-button"]')
    
    // Verify login successful
    await expect(page.locator('[data-testid="user-greeting"]')).toContainText(testUser.name)
    
    // Add todo
    await page.fill('[data-testid="todo-input"]', 'Buy groceries')
    await page.selectOption('[data-testid="category-select"]', 'buy')
    await page.selectOption('[data-testid="priority-select"]', '1') // High priority
    await page.click('[data-testid="add-todo"]')
    
    // Verify todo appears in Buy section
    await expect(page.locator('[data-testid="category-buy"]')).toContainText('Buy groceries')
    
    // Complete todo
    await page.locator('[data-testid="todo-item"]:has-text("Buy groceries")').locator('[data-testid="todo-checkbox"]').click()
    await expect(page.locator('[data-testid="todo-item"]:has-text("Buy groceries")')).toHaveClass(/opacity-60/)
    
    // Test category filtering
    await page.click('[data-testid="filter-exercise"]')
    await expect(page.locator('[data-testid="category-buy"]')).not.toBeVisible()
    
    // Logout
    await page.click('[data-testid="logout-button"]')
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible()
  })

  test('priority sorting within categories', async ({ page }) => {
    // Login
    await page.selectOption('[data-testid="user-select"]', testUser.name)
    await page.fill('[data-testid="email-input"]', testUser.email)
    await page.click('[data-testid="login-button"]')
    
    // Add todos with different priorities
    const todos = [
      { title: 'Normal task', priority: '0' },
      { title: 'Urgent task', priority: '2' },
      { title: 'High task', priority: '1' }
    ]
    
    for (const todo of todos) {
      await page.fill('[data-testid="todo-input"]', todo.title)
      await page.selectOption('[data-testid="category-select"]', 'buy')
      await page.selectOption('[data-testid="priority-select"]', todo.priority)
      await page.click('[data-testid="add-todo"]')
    }
    
    // Verify todos are sorted by priority (urgent first)
    const todoItems = page.locator('[data-testid="category-buy"] [data-testid="todo-item"]')
    await expect(todoItems.first()).toContainText('Urgent task')
    await expect(todoItems.nth(1)).toContainText('High task')
    await expect(todoItems.nth(2)).toContainText('Normal task')
  })

  test.afterEach(async ({ request }) => {
    // Clean up: delete test user and their todos (runs even if test fails)
    try {
      await request.delete(`http://localhost:4000/api/users/cleanup`, {
        data: { email: testUser.email }
      })
    } catch (error) {
      console.log('Cleanup failed:', error.message)
    }
  })
})