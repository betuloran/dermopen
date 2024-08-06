import React from "react";

export default function AboutPage() {
    return (
        <main className="py-4">
            <section className="section py-2 px-4 mt-1">
                <div className="container">
                    <header className="header">
                        <header className="header mb-4">
                            <h2 className="text-2xl">Hakkımızda</h2>
                            <div className="h-[1px] bg-gray-300 "></div>
                        </header>
                    </header>

                    <div className="text-lg text-gray-400 flex flex-col gap-6">
                        <p>
                            Dermopen, cilt bakımında en son teknolojileri
                            kullanarak sağlıklı ve genç bir görünüm elde
                            etmenize yardımcı olmayı amaçlayan bir markadır.
                            Cilt yenileme, akne izleri tedavisi, ince çizgi ve
                            kırışıklıkların azaltılması gibi konularda
                            uzmanlaşmış ürünlerimizle, güzellik rutininize
                            yenilik ve etkilik katıyoruz. Müşterilerimize
                            güvenilir ve etkili çözümler sunarak, cilt bakımında
                            yeni bir standart belirlemeyi hedefliyoruz.
                        </p>
                        <p>
                            Gelişmiş formülasyonlar ve bilimsel yaklaşımlar
                            kullanarak, cildinizin doğal yapısını korumayı ve
                            güçlendirmeyi amaçlıyoruz. Her bir ürünümüz,
                            titizlikle seçilmiş aktif bileşenlerle formüle
                            edilmiştir ve cilt tipiniz ne olursa olsun etkili
                            sonuçlar sağlar. Sürdürülebilir ve cruelty-free
                            prensiplerimizle, hem cildinize hem de gezegenimize
                            zarar vermeden güzellik sağlıyoruz.
                        </p>
                        <p>
                            Dermopen olarak, cilt bakımının sadece bir rutin
                            değil, bir yaşam tarzı olduğuna inanıyoruz. Uzman
                            kadromuz, kişisel ihtiyaçlarınıza uygun çözümler
                            sunarak, size özel bir deneyim yaşamanız için
                            çalışıyor. Amacımız, sadece dış görünümünüzü değil,
                            kendinizi iyi hissetmenizi sağlayacak bir bakım
                            süreci sunmaktır. Dermopen ile cildinizde fark
                            yaratın ve kendinizi her zamankinden daha iyi
                            hissedin.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
