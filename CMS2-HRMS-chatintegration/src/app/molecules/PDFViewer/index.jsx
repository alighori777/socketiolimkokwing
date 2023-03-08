import React, { useState, useEffect } from 'react';
import axios from '../../../services/axiosInterceptor';
import { Document, pdfjs, Page } from 'react-pdf';
export default (props) => {
  const { pdf } = props;
  const [pages, setPages] = useState(null);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BASE_URL + '/files/' + pdf}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
  //     .then((response) => {
  //       console.log({ response });
  //     });
  // }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setPages(numPages);
  };

  return (
    <Document className="pdf-view" file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(pages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
};
