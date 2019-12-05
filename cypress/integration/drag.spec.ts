context('Drag', () => {
  const height = 300;
  const width = 300;
  const top = 100;
  const left = 100;
  const centerX = width / 2 + left;
  const centerY = height / 2 + top;
  const bottom = top + height;
  const right = left + width;

  beforeEach(() => {
    cy.viewport(500, 500);
    cy.visit('/simple.html');

    return cy.wait(100);
  });

  describe('when it is drag', () => {
    it('should move alongside the mouse position', () => {
      cy.get('.dragarea').trigger('mousedown', {
        clientX: centerX,
        clientY: centerY,
      });
      cy.window()
        .trigger('mousemove', { clientX: centerX + 5, clientY: centerY - 5 })
        .trigger('mousemove', { clientX: centerX + 10, clientY: centerY - 10 })
        .trigger('mousemove', { clientX: centerX + 20, clientY: centerY - 20 })
        .trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.css('top')).to.be.equal(`${top - 20}px`);
        expect($window.css('left')).to.be.equal(`${left + 20}px`);
      });
    });
  });
});
