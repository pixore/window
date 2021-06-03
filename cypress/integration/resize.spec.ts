context('Resize', () => {
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

  describe('top', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-top').trigger('mousedown', {
        clientX: centerX,
        clientY: top,
      });

      cy.window().trigger('mousemove', { clientX: centerX, clientY: top - 5 });
      cy.window().trigger('mousemove', { clientX: centerX, clientY: top - 10 });
      cy.window().trigger('mousemove', { clientX: centerX, clientY: top - 20 });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.height()).to.be.equal(height + 20);
        expect($window.css('top')).to.be.equal(`${top - 20}px`);
      });
    });
  });
  describe('right', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-right').trigger('mousedown', {
        clientX: right,
        clientY: centerX,
      });

      cy.window().trigger('mousemove', {
        clientX: right + 5,
        clientY: centerX,
      });
      cy.window().trigger('mousemove', {
        clientX: right + 10,
        clientY: centerX,
      });
      cy.window().trigger('mousemove', {
        clientX: right + 20,
        clientY: centerX,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.width()).to.be.equal(width + 20);
      });
    });
  });
  describe('bottom', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-bottom').trigger('mousedown', {
        clientX: centerX,
        clientY: bottom,
      });

      cy.window().trigger('mousemove', {
        clientX: centerX,
        clientY: bottom + 5,
      });
      cy.window().trigger('mousemove', {
        clientX: centerX,
        clientY: bottom + 10,
      });
      cy.window().trigger('mousemove', {
        clientX: centerX,
        clientY: bottom + 20,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.height()).to.be.equal(height + 20);
      });
    });
  });
  describe('left', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-left').trigger('mousedown', {
        clientX: left,
        clientY: centerY,
      });

      cy.window().trigger('mousemove', { clientX: left - 5, clientY: centerY });
      cy.window().trigger('mousemove', {
        clientX: left - 10,
        clientY: centerY,
      });
      cy.window().trigger('mousemove', {
        clientX: left - 20,
        clientY: centerY,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.width()).to.be.equal(width + 20);
        expect($window.css('left')).to.be.equal(`${left - 20}px`);
      });
    });
  });
  describe('top-left', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-top-left').trigger('mousedown', {
        clientX: left,
        clientY: top,
      });

      cy.window().trigger('mousemove', { clientX: left - 5, clientY: top - 5 });
      cy.window().trigger('mousemove', {
        clientX: left - 10,
        clientY: top - 10,
      });
      cy.window().trigger('mousemove', {
        clientX: left - 20,
        clientY: top - 20,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.width()).to.be.equal(width + 20);
        expect($window.css('top')).to.be.equal(`${top - 20}px`);
        expect($window.height()).to.be.equal(height + 20);
        expect($window.css('left')).to.be.equal(`${left - 20}px`);
      });
    });
  });
  describe('top-right', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-top-right').trigger('mousedown', {
        clientX: right,
        clientY: top,
      });

      cy.window().trigger('mousemove', {
        clientX: right + 5,
        clientY: top - 5,
      });
      cy.window().trigger('mousemove', {
        clientX: right + 10,
        clientY: top - 10,
      });
      cy.window().trigger('mousemove', {
        clientX: right + 20,
        clientY: top - 20,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.width()).to.be.equal(width + 20);
        expect($window.css('top')).to.be.equal(`${top - 20}px`);
        expect($window.height()).to.be.equal(height + 20);
      });
    });
  });

  describe('bottom-right', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-bottom-right').trigger('mousedown', {
        clientX: right,
        clientY: bottom,
      });

      cy.window().trigger('mousemove', {
        clientX: right + 5,
        clientY: bottom + 5,
      });
      cy.window().trigger('mousemove', {
        clientX: right + 10,
        clientY: bottom + 10,
      });
      cy.window().trigger('mousemove', {
        clientX: right + 20,
        clientY: bottom + 20,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.width()).to.be.equal(width + 20);
        expect($window.height()).to.be.equal(height + 20);
      });
    });
  });

  describe('bottom-left', () => {
    it('should resize', () => {
      cy.get('.px-window .px-resizebar-bottom-left').trigger('mousedown', {
        clientX: left,
        clientY: bottom,
      });

      cy.window().trigger('mousemove', {
        clientX: left - 5,
        clientY: bottom + 5,
      });
      cy.window().trigger('mousemove', {
        clientX: left - 10,
        clientY: bottom + 10,
      });
      cy.window().trigger('mousemove', {
        clientX: left - 20,
        clientY: bottom + 20,
      });
      cy.window().trigger('mouseup');

      cy.get('.px-window').should(($window) => {
        expect($window.width()).to.be.equal(width + 20);
        expect($window.height()).to.be.equal(height + 20);
        expect($window.css('left')).to.be.equal(`${left - 20}px`);
      });
    });
  });
});
