describe('Episodes list and audio playback', () => {
  it('loads episodes for the selected podcast and has a valid mp3 URL', () => {
    cy.visit('/podcast/788236947');

    cy.get('[data-testid="episodes-table"]', { timeout: 10_000 }).should('be.visible');
    cy.get('[data-testid="episodes-table"] > [data-testid="episode-row"]').first().click();

    cy.get('audio', { timeout: 10_000 })
      .should('exist')
      .and('have.prop', 'src')
      .then((src) => {
        expect(src).to.match(/^https:\/\/.*\.mp3(\?.*)?$/);
      });
  });
});
