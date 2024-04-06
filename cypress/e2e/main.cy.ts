describe('Тестирование приложения', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        // Сервис воркеры ломают cypress, fix:
        // @ts-ignore
        delete win.navigator.__proto__.serviceWorker;
      },
    });

    cy.get('[data-testid="stop-exec-btn"]').as('text-editor');
    cy.contains(/начать/i).as('exec-btn');
  });

  it('Кнопка выключения изначально заблокирована', () => {
    cy.get('@text-editor').should('be.disabled');
  });

  it('Изначальный код должен выполниться успешно', () => {
    cy.get('@exec-btn').click();
    cy.contains(/успе[шх]/).should('exist');
  });

  it('При пустом коде - кнопка выполнение заблокирована', () => {
    cy.get('[data-testid="text-editor"]').clear();
    cy.get('@exec-btn').should('be.disabled');
  });

  it('Код с синтаксической ошибкой должен показать уведомление', () => {
    const errorCode = 'const a;';

    cy.get('[data-testid="text-editor"]').clear().type(errorCode);
    cy.get('@exec-btn').click();

    cy.contains(/ошибка/i).should('exist');
  });

  it('Долгий код - должен ожидаться и потом провалиться', () => {
    const slowCode = 'for (let i = 0; i < 100_000_000_000_000; i++) {}';

    cy.get('[data-testid="text-editor"]').clear().type(slowCode);
    cy.get('@exec-btn').click();
    cy.get('@exec-btn').should('be.disabled');

    cy.contains(/долго/i, { timeout: 15_000 }).should('exist');
  });
});
