import React from "react";

export default function ResellPage() {
    return (
        <main className="py-4">
            <section className="section py-2 px-4 mt-1">
                <div className="container">
                    <header className="header">
                        <header className="header mb-4">
                            <h2 className="text-2xl">
                                İptal ve İade Politikamız
                            </h2>
                            <div className="h-[1px] bg-gray-300 "></div>
                        </header>
                    </header>

                    <div className="text-lg text-gray-400 flex flex-col gap-4">
                        <p>
                            Koşulları Siparişinizi iptal etmek isterseniz,
                            lütfen aşağıdaki koşulları dikkate alın:
                            Siparişinizin iptali için, sipariş verdiğiniz
                            tarihten itibaren 24 saat içinde bizimle iletişime
                            geçmelisiniz. İptal işlemleri için
                            aytunc04@hotmail.com veya 553 951 68 61 üzerinden
                            bize ulaşabilirsiniz. Siparişiniz kargoya
                            verildikten sonra iptal işlemi yapılamaz.
                        </p>
                        <p>
                            İade Koşulları Ürün iadesi ve değişimi için
                            aşağıdaki şartlar geçerlidir: Ürünü teslim aldıktan
                            sonra 14 gün içinde iade talebinde bulunabilirsiniz.
                            İade edilecek ürünler orijinal ambalajında,
                            kullanılmamış ve hasar görmemiş olmalıdır. İade
                            talebinizi aytunc04@hotmail.com üzerinden bize
                            iletmelisiniz. İade talebiniz onaylandıktan sonra
                            size iade adresimizi bildireceğiz. Kargo masrafları
                            müşteriye aittir. İade işlemi onaylandığında ürün
                            bedeli, iade edilen ürün tarafımıza ulaştıktan sonra
                            7 iş günü içinde tarafınıza iade edilecektir.
                        </p>
                        <p>
                            İade Süreci: İade talebinizi aytunc04@hotmail.com
                            üzerinden iletin. İade onayını aldıktan sonra, ürünü
                            orijinal ambalajında ve faturasını da ekleyerek
                            belirttiğimiz adrese gönderin. İade ürün tarafımıza
                            ulaştığında, ürünün durumu kontrol edilecektir. İade
                            onaylandığında, ödemeniz 7 iş günü içinde iade
                            edilecektir.
                        </p>{" "}
                        <p>
                            İade Edilemeyen Ürünler Açılmış, kullanılmış veya
                            zarar görmüş ürünler iade alınamaz. İndirimli veya
                            kampanyalı ürünler iade edilemez.{" "}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
