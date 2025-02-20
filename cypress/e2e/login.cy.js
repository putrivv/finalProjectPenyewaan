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
    cy.get("input[name='admin_username']").type("useradmin");
    cy.get("input[name='admin_email']").type("useradmin@gmail.com");
    cy.get("input[name='admin_password']").type("useradmin");
    cy.get("button").contains("Login").click();

    // Klik OK dan cek redirect ke halaman admin
    cy.get('[name="ok"]').click();
    cy.wait(3000); // Tunggu 3 detik sebelum pindah halaman
    cy.visit("/Admin/Beranda");
    cy.get(".p-6").last().scrollIntoView();
    
    // Navigasi ke halaman /Admin/Kategori
    cy.wait(3000); // Tunggu 3 detik sebelum pindah halaman
    cy.visit("/Admin/Kategori");
    cy.url().should("include", "/Admin/Kategori");
    cy.contains("h1", "Kategori").should("be.visible");

    // Navigasi ke halaman /Admin/ListAlat
    cy.wait(3000); // Tunggu 3 detik sebelum pindah halaman
    cy.visit("/Admin/ListAlat");
    cy.url().should("include", "/Admin/ListAlat");
    cy.contains("h1", "Daftar Alat").should("be.visible");

    // Navigasi ke halaman /Admin/SewaAlat
    cy.wait(3000); // Tunggu 3 detik sebelum pindah halaman
    cy.visit("/Admin/SewaAlat");
    cy.url().should("include", "/Admin/SewaAlat");
    cy.contains("h1", "Daftar Penyewaan").should("be.visible");

// Navigasi ke halaman /Admin/Pelanggan
cy.wait(3000); // Tunggu 3 detik sebelum pindah halaman
cy.visit("/Admin/Pelanggan");
cy.url().should("include", "/Admin/Pelanggan");
cy.contains("h1", "Pelanggan").should("be.visible");

// Tambahkan search dan ketikkan "ceki"
cy.get('input[type="text"]').type("ceki"); // Ganti 'input[type="text"]' dengan selector input search yang sesuai
cy.wait(1000); // Opsional: Tunggu 1 detik untuk melihat hasil pencarian
  });
});