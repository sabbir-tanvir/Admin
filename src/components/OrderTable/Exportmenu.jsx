import React, { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload } from "react-icons/fi";

const ExportMenu = ({ filtered }) => {
  const [open, setOpen] = useState(false);

  const exportCSV = () => {
    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "orders.csv");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Order List", 14, 20);
    autoTable(doc, {
      startY: 25,
      head: [["ID", "Date", "Customer", "Company", "Qty", "Price", "Status"]],
      body: filtered.map((o) => [
        o.orderId,
        o.date,
        o.customer,
        o.company,
        o.quantity,
        `$${o.price}`,
        o.status,
      ]),
    });
    doc.save("orders.pdf");
  };

  return (
    <div
      className="export-select-wrapper export-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      style={{ position: 'relative' }}
    >
      <div className="export-label" style={{ cursor: 'pointer' }}>
        <FiDownload style={{ marginRight: "6px" }} /> Export
      </div>
      {open && (
        <ul className="export-menu">
          <li onClick={exportCSV}>Export CSV</li>
          <li onClick={exportPDF}>Export PDF</li>
        </ul>
      )}
    </div>
  );
};

export default ExportMenu;
