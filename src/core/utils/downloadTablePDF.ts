//use library  jspdf jspdf-autotable to create a function  to export data to pdf file  and use it in

import autoTable from 'jspdf-autotable'
import jsPDF from "jspdf"

const downloadTablePDF = (data: any, columns: any) => {
  const doc = new jsPDF();
  const body = data.map((item: any) => Object.values(item));

  autoTable(doc, {
    foot: [['imagineapps.co']],
    head: [columns],
    body: body,
  })
  doc.save("table.pdf");
}

export default downloadTablePDF
