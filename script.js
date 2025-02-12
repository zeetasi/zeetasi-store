// MODE GELAP & TERANG
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    let modeText = document.body.classList.contains("dark-mode") ? "☀ Mode Terang" : "🌙 Mode Gelap";
    this.textContent = modeText;
});

// MENAMPILKAN FORM SUBDOMAIN
function toggleSubdomainForm() {
    document.getElementById("subdomainForm").classList.toggle("hidden");
}

// API CLOUDFLARE: MENAMBAHKAN 5 SUBDOMAIN DENGAN 5 API & ZONE ID BERBEDA
async function createSubdomains() {
    const subdomains = [
        { name: "shop", domain: "cloud-chip.biz.id", zoneId: "747a46fff146db0d8909438ab6d22030", apiToken: "g2t5AOpZlYQRjtkfHYYvOKOBr-9rMY084V81FoVQ" },
        { name: "blog", domain: "zeetasi.xyz", zoneId: "b330cc4fe2f0109bf48c64f16adac9bd", apiToken: "JAEu576wKuLsNLX-eexOqD6evRi8HnIpcSZc7Czu" },
        { name: "support", domain: "zeetasi.my.id", zoneId: "f24f559469e3f2f4e70836f8c8cf20b6", apiToken: "U3LdMIBXOkGZXG_k0TFgvbfWlUdXJhIWaG8Yullt" },
        { name: "partner", domain: "digitalserver.us.kg", zoneId: "df13e6e4faa4de9edaeb8e1f05cf1a36", apiToken: "HXVf4soYFM3iiOewHZ6tk6LEnG9f7m7CVhU0EoVz" },
        { name: "promo", domain: "promo.zeetasi.com", zoneId: "ZONE_ID_5", apiToken: "API_TOKEN_5" }
    ];

    for (const sub of subdomains) {
        const data = {
            type: "A",
            name: sub.domain,
            content: "TARGET IP",  // ganti dengan ip subdomain
            ttl: 3600,
            proxied: false
        };

        try {
            const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${sub.zoneId}/dns_records`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sub.apiToken}`
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {
                document.getElementById("result").innerText += `✔ Subdomain ${sub.domain} berhasil dibuat!\n`;
            } else {
                document.getElementById("result").innerText += `❌ Gagal: ${result.errors[0].message}\n`;
            }
        } catch (error) {
            document.getElementById("result").innerText += `⚠ Terjadi kesalahan: ${error.message}\n`;
        }
    }
}