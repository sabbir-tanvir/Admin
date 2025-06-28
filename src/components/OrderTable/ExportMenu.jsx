import React from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload } from "react-icons/fi";

const ExportMenu = ({ filtered }) => {
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
            head: [["Ordder Id", "Date", "Customer", "Company", "Item Quantity", "Price", " Order Status"]],
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

    const handleExport = (e) => {
        const type = e.target.value;
        if (type === "csv") exportCSV();
        if (type === "pdf") exportPDF();
        // reset dropdown to default
        e.target.selectedIndex = 0;
    };

    return (
        <div className="export-select-wrapper">
            <label className="export-label">
                <FiDownload style={{ marginRight: "6px" }} />
                <select className="export-select" onChange={handleExport}>
                    <option value="">Export</option>
                    <option value="csv">Export CSV</option>
                    <option value="pdf">Export PDF</option>
                </select>
            </label>
        </div>
    );
};

export default ExportMenu;
