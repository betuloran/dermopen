import React from "react";

export default function DealPage() {
    return (
        <main className="py-4">
            <section className="section py-2 px-4 mt-1">
                <div className="container">
                    <header className="header">
                        <header className="header mb-4">
                            <h2 className="text-2xl">
                                Mesafeli Satış Sözleşmesi
                            </h2>
                            <div className="h-[1px] bg-gray-300 "></div>
                        </header>
                    </header>

                    <div className="text-lg text-gray-400">
                        <p>
                            Bu sözleşme, [Şirket Adı] (Satıcı) ile [Alıcı Adı]
                            (Alıcı) arasında, [www.dermopen.com] internet
                            sitesinden yapılan ürün satışlarına ilişkin olarak,
                            ürünlerin nitelikleri, fiyatları, teslimat ve iade
                            koşulları ile ilgili hak ve yükümlülükleri belirler.
                            Alıcı, sipariş öncesi ürün bilgilerini okuduğunu ve
                            satın almayı kabul ettiğini beyan eder. Cayma hakkı,
                            ürün teslim tarihinden itibaren 14 gün içinde
                            kullanılabilir. İade koşulları, ürünün kullanılmamış
                            ve ambalajının bozulmamış olması şartını içerir.
                            Detaylı bilgi için Satıcı ile iletişime
                            geçebilirsiniz.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
