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
        { name: "shop", domain: "shop.zeetasi.com", zoneId: "ZONE_ID_1", apiToken: "API_TOKEN_1" },
        { name: "blog", domain: "blog.zeetasi.com", zoneId: "ZONE_ID_2", apiToken: "API_TOKEN_2" },
        { name: "support", domain: "support.zeetasi.com", zoneId: "ZONE_ID_3", apiToken: "API_TOKEN_3" },
        { name: "partner", domain: "partner.zeetasi.com", zoneId: "ZONE_ID_4", apiToken: "API_TOKEN_4" },
        { name: "promo", domain: "promo.zeetasi.com", zoneId: "ZONE_ID_5", apiToken: "API_TOKEN_5" }
    ];

    for (const sub of subdomains) {
        const data = {
            type: "CNAME",
            name: sub.domain,
            content: "target.example.com",  // Ganti dengan target subdomain
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
