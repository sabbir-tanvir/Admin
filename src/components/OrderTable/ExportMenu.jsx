import React from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FiDownload } from "react-icons/fi";

const ExportMenu = ({ filtered, showExport, setShowExport }) => {
  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "orders.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Order List", 14, 20);
    doc.autoTable({
      startY: 25,
      head: [["ID", "Date", "Customer", "Company", "Qty", "Price", "Status"]],
      body: filtered.map((o) => [
        o.orderId,
        o.date,
        o.customer,
        o.company,
        o.quantity,
        o.price,
        o.status,
      ]),
    });
    doc.save("orders.pdf");
  };

  return (
    <div className="export-dropdown">
      <button onClick={() => setShowExport(!showExport)} className="export-btn">
        <FiDownload /> Export
      </button>
      {showExport && (
        <ul className="export-menu">
          <li onClick={exportCSV}>Export CSV</li>
          <li onClick={exportPDF}>Export PDF</li>
        </ul>
      )}
    </div>
  );
};

export default ExportMenu;
