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
      cy.get("input[name='admin_username']").type("user123");
      cy.get("input[name='admin_email']").type("invalid-email"); // Email tidak valid
      cy.get("input[name='admin_password']").type("password123");
      cy.get("button").contains("Daftar").click();
  
      cy.wait("@registerRequest").then(({ response }) => {
        expect(response.statusCode).to.eq(400); // Pastikan API mengembalikan error
        console.log(response.body); // Debug jika ada masalah
      });
  
      cy.contains(/registrasi gagal|email sudah digunakan/i, { timeout: 6000 }).should("exist");
    });
  
    it("Berhasil registrasi dengan data yang valid", () => {
      cy.get("input[name='admin_username']").type("userbaru");
      cy.get("input[name='admin_email']").type(`user${Date.now()}@email.com`);
      cy.get("input[name='admin_password']").type("password123");
      cy.get("button").contains("Daftar").click();
  
      cy.wait("@registerRequest").then(({ response }) => {
        expect(response.statusCode).to.eq(201); // Pastikan status berhasil
      });
  
      cy.contains("Registrasi Berhasil").should("be.visible");
      cy.contains("OK").click();
  
      // Pastikan redirect ke halaman login
      cy.url().should("include", "/login");
    });
  });
  