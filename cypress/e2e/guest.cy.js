describe("Halaman Guest", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Menampilkan teks selamat datang dengan benar", () => {
    cy.contains("Selamat Datang").should("be.visible");
    cy.contains("di Sewa Barang").should("be.visible");
  });
  it('Menampilkan tombol "Lihat Barang" dan dapat diklik', () => {
    cy.contains("Lihat Barang").should("be.visible").click();
    cy.url().should("include", "/listbarang");
  });
  it("Menampilkan gambar dengan benar", () => {
    cy.get('img[alt="Hero Illustration"]').should("be.visible");
  });
});
