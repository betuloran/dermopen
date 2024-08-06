export type FooterColumn = {
    heading: string;
    elements: string[];
};

interface FooterData {
    data: FooterColumn[];
}

export const footerData: FooterData = {
    data: [
        { heading: "Kurumsal", elements: ["Hakkımızda", "Blog", "E-katalog"] },
        {
            heading: "İletişim",
            elements: [
                "Telefon: 0553 951 68 61",
                "E-mail: aytunc04@hotmail.com",
            ],
        },
        {
            heading: "Müşteri hizmetleri",
            elements: ["Mesafeli satış sözleşmesi", "İade iptal ve değişim"],
        },
    ],
};
