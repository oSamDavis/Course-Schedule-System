// import PDFParser from "pdf2json";

// function getTextFromPdf(filePath) {
//   const pdfParser = new PDFParser(this, 1);
//   pdfParser.on("pdfParser_dataError", (errData) =>
//     console.error(errData.parserError)
//   );
//   pdfParser.on("pdfParser_dataReady", (pdfData) => {
//     // get text
//     var lines = [];
//     var pdfStr = pdfParser.getRawTextContent();
//     var temp = "";
//     for (var i = 0; i < pdfStr.length; i++) {
//       if (pdfStr[i] !== "\n") temp += pdfStr[i];
//       else {
//         lines.push(temp.replace(/\s/g, ""));
//         temp = "";
//       }
//     }

//     console.log(lines);
//   });

//   pdfParser.loadPDF(filePath);
// }

// export { getTextFromPdf };
