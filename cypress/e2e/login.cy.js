describe("Login Page", () => {
    beforeEach(() => {
      cy.visit("/login"); // Sesuaikan dengan path halaman login di Next.js
    });
  
    it("Menampilkan form login", () => {
      cy.get("input[name='admin_username']").should("be.visible");
      cy.get("input[name='admin_email']").should("be.visible");
      cy.get("input[name='admin_password']").should("be.visible");
      cy.get("button").contains("Login").should("be.visible");
    });
  
    it("Menampilkan pesan error jika login gagal", () => {
      cy.get("input[name='admin_username']").type("salahuser");
      cy.get("input[name='admin_email']").type("salah@email.com");
      cy.get("input[name='admin_password']").type("salahpassword");
      cy.get("button").contains("Login").click();
      
      cy.on("window:alert", (str) => {
        expect(str).to.equal("Login gagal. Periksa kembali username, email, dan password.");
      });
    });
  
    it("Berhasil login dengan kredensial yang benar", () => {
      cy.get("input[name='admin_username']").type("adminuser");
      cy.get("input[name='admin_email']").type("admin@email.com");
      cy.get("input[name='admin_password']").type("password123");
      cy.get("button").contains("Login").click();
  
      // Cek apakah token tersimpan di localStorage
      cy.window().its("localStorage.token").should("exist");
  
      // Cek modal muncul
      cy.contains("Login Berhasil").should("be.visible");
  
      // Klik OK dan cek redirect ke halaman admin
      cy.contains("OK").click();
      cy.url().should("include", "/Admin/Login");
    });
  });
  