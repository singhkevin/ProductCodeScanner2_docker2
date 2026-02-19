import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export const generateQRCodePDF = async (product: { name: string, sku: string, qrCodes: { code: string }[] }) => {
    const doc = new jsPDF();
    const qrSize = 40;
    const margin = 20;
    const padding = 10;
    const itemsPerRow = 3;
    const itemsPerPage = 12; // 3 columns * 4 rows

    let currentX = margin;
    let currentY = margin + 20;

    // Header
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('Product Authentication Codes', margin, margin);

    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Product: ${product.name}`, margin, margin + 8);
    doc.text(`SKU: ${product.sku}`, margin, margin + 14);

    doc.setDrawColor(226, 232, 240); // slate-200
    doc.line(margin, margin + 16, 190, margin + 16);

    for (let i = 0; i < product.qrCodes.length; i++) {
        if (i > 0 && i % itemsPerPage === 0) {
            doc.addPage();
            currentX = margin;
            currentY = margin;
        }

        const codeData = product.qrCodes[i].code;
        const qrDataUrl = await QRCode.toDataURL(codeData, { errorCorrectionLevel: 'H', margin: 1 });

        // Draw QR Code
        doc.addImage(qrDataUrl, 'PNG', currentX, currentY, qrSize, qrSize);

        // Draw Label
        doc.setFontSize(8);
        doc.setTextColor(71, 85, 105); // slate-600
        doc.setFont('courier', 'normal');
        doc.text(codeData, currentX + qrSize / 2, currentY + qrSize + 5, { align: 'center' });

        // Update coordinates
        if ((i + 1) % itemsPerRow === 0) {
            currentX = margin;
            currentY += qrSize + padding + 10; // Extra space for label
        } else {
            currentX += qrSize + padding + 15;
        }
    }

    doc.save(`${product.name.replace(/\s+/g, '_')}_QR_Codes.pdf`);
};
