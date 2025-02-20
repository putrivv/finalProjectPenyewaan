describe("Halaman Registrasi", () => {
    beforeEach(() => {
      cy.visit("/register"); // Sesuaikan dengan path Next.js
      cy.intercept("POST", "/api/register").as("registerRequest");
    });
  
    it("Menampilkan form registrasi", () => {
      cy.get("input[name='admin_username']").should("be.visible");
      cy.get("input[name='admin_email']").should("be.visible");
      cy.get("input[name='admin_password']").should("be.visible");
      cy.get("button").contains("Daftar").should("be.visible");
    });
  
    it("Menampilkan pesan error jika registrasi gagal", () => {
      cy.get("input[name='admin_username']").type("userbaru");
      cy.get("input[name='admin_email']").type("invalid-gmail"); // Email tidak valid
      cy.get("input[name='admin_password']").type("password123");
      cy.get("button").contains("Daftar").click();
  
      
     
    });
  
    it("Berhasil registrasi dengan data yang valid", () => {
      cy.get("input[name='admin_username']").type("userbaru00");
      cy.get("input[name='admin_email']").type(`userbaru00@gmail.com`);
      cy.get("input[name='admin_password']").type("userbaru00");
      cy.get("button").contains("Daftar").click();
  
      
  
      cy.get('[name="ok"]').click();
      cy.visit("/login");
      
    });
  });
  