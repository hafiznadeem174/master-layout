<template>
  <div>
    <!-- Print Order Button -->
    <button class="font-bold w-full" @click="printOrder">
      <font-awesome-icon icon="receipt" class="mr-1" />Print
    </button>

    <!-- Download PDF Button
    <button class="pdf-button" @click="downloadPDF">
      <font-awesome-icon icon="file-pdf" class="mr-1" />
      Download PDF
    </button>   -->
  </div>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
  props: {
    orderList: Array,
    subtotal: Number,
    discountAmount: Number,
    serviceChargeAmount: Number,
    finalTotal: Number,
    selectedOrderType: String,
  },
  data() {
    return {
      invoiceNumber: `INV-${new Date().getTime()}`,
    };
  },
  methods: {
    printOrder() {
      if (!this.selectedOrderType) {
        alert("Please select an order type before printing.");
        return;
      }

      const orderHtml = this.generateOrderHtml();
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(orderHtml);

      printWindow.document.write(`
        <style>
          body { font-family: Arial, sans-serif; font-size: 14px; }
          .order-table { width: 100%; border-collapse: collapse; }
          .order-table th, .order-table td { padding: 8px; border: 1px solid #ddd; text-align: left; }
          .order-table th { background-color: #f4f4f4; }
          .order-header { text-align: center; margin-bottom: 20px; }
        </style>
      `);

      printWindow.document.close();
      printWindow.print();
    },

    downloadPDF() {
      const doc = new jsPDF();
      doc.setFont("Arial", "normal");
      doc.setFontSize(12);

      let yPosition = 20;

      doc.text("Order Summary", 105, yPosition, null, null, "center");
      yPosition += 10;
      doc.text(`Order Type: ${this.selectedOrderType}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Invoice #: ${this.invoiceNumber}`, 20, yPosition);
      yPosition += 10;

      const dateTime = this.formatDateTime(new Date());
      doc.text(`Date & Time: ${dateTime}`, 20, yPosition);
      yPosition += 10;

      doc.text("Thank you for your order!", 105, yPosition, null, null, "center");
      yPosition += 15;

      doc.text("Item", 20, yPosition);
      doc.text("Price", 80, yPosition);
      doc.text("Qty", 120, yPosition);
      doc.text("Total", 160, yPosition);
      yPosition += 10;

      this.orderList.forEach(item => {
        doc.text(item.text, 20, yPosition);
        doc.text(`PKR ${item.price.toFixed(2)}`, 80, yPosition);
        doc.text(item.quantity.toString(), 120, yPosition);
        doc.text(`PKR ${(item.price * item.quantity).toFixed(2)}`, 160, yPosition);
        yPosition += 10;
      });

      yPosition += 10;
      doc.text(`Subtotal: PKR ${this.subtotal}`, 20, yPosition);
      yPosition += 5;
      doc.text(`Discount: -PKR ${this.discountAmount}`, 20, yPosition);
      yPosition += 5;
      doc.text(`Service Charge: +PKR ${this.serviceChargeAmount}`, 20, yPosition);
      yPosition += 5;
      doc.text(`Total: PKR ${this.finalTotal}`, 20, yPosition);

      doc.save("order-summary.pdf");
    },

    // Helper function to format the current date and time as MM/DD/YYYY HH:MM
    formatDateTime(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${month}/${day}/${year} ${hours}:${minutes}`;
    },

    generateOrderHtml() {
      const dateTime = this.formatDateTime(new Date());

      let html = `
        <div class="order-header" >
          <img src="/Images/jaffaz-food-removebg-preview.jpg" alt="Logo" style="width: 302px; height: auto; margin-bottom: 1px; margin-top: 1px;" />
          <h3 style="margin-top: 4px; margin-bottom: 4px;">195-3, Faisal Town, Peoples Colony Road Vehari</h3>
          <h3 style="margin-top: 4px; margin-bottom: 4px;">067-3366305 0301-1060005</h3>
          <h3 style="margin-top: 4px; margin-bottom: 4px;"><strong>Invoice No:</strong> ${this.invoiceNumber}</h3>
          <h3 style="margin-top: 4px; margin-bottom: 4px;"><strong>OT:</strong> ${this.selectedOrderType}</h3>
        </div>
        <div style="margin: 12px; font-weight: bold">
            <h4 style="margin-top: 4px; margin-bottom: 4px;" >Date: ${dateTime}</h4>
            <h4 style="margin-top: 4px; margin-bottom: 4px;">Sales Associate: JAFFAZ</h4>
            <h4 style="margin-top: 4px; margin-bottom: 4px;">C/N: Mr. Javed</h4>
              <h4 style="margin-top: 4px; margin-bottom: 4px;">C/P: 03056523981</h4>
                <h4 style="margin-top: 4px; margin-bottom: 4px;">C/A: X BLOCK ST 5</h4>
        </div>
        <table class="order-table">
          <thead>
            <tr>
              <th>Items</th>
              <th style="text-align: center">Qty</th>
              <th style="text-align: right">Price</th>
            </tr>
          </thead>
          <tbody>
      `;

      this.orderList.forEach(item => {
        html += `
          <tr>
            <td>${item.text}</td>
            <td style="text-align: center">${item.quantity}</td>
            <td style="text-align: right">PKR ${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `;
      });

      html += `
          </tbody>
        </table>
         <div class="order-total" style="margin: 12px;">

        <div style="display: flex; justify-content: space-between; width: 100%;">
          <strong>Subtotal:</strong> <strong>PKR ${this.subtotal}</strong>
        </div>

        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px;">
          <strong>Service Charges:</strong> <strong>+PKR ${this.serviceChargeAmount}</strong>
        </div>

        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px;">
          <strong>Grand Total:</strong> <strong>PKR ${this.finalTotal}</strong>
        </div>

        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px;">
          <strong>Paid Amount:</strong> <strong>PKR ${this.paidAmount}</strong>
        </div>

        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px;">
          <strong>Due Amount:</strong> <strong>PKR ${(this.finalTotal - this.paidAmount).toFixed(2)}</strong>
        </div>

        <div style="display: flex; justify-content: space-between; width: 100%; margin-top: 12px; font-size: 24px;">
          <strong>Total:</strong> <strong>PKR ${this.finalTotal}</strong>
        </div>
      </div>
      <div class="order-header" >
       <h3>Thanks for dining with jaffaz Food Lounge! Your <br> satisfaction means the world to us.</h3>
      </div>
      `;

      return html;
    }
  }
};
</script>

<style scoped>
.print-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.print-top {
  margin: 4px;
}

.print-button:hover {
  background-color: #45a049;
}

.pdf-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #d9534f;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.margin-settig {
  margin: 0 !important;
}

.pdf-button:hover {
  background-color: #c9302c;
}

.order-total-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
}

.amount {
  text-align: right;
  margin-left: 10px;
}

.order-header {
  font-size: 10px;
  font-weight: bold;
}
</style>
