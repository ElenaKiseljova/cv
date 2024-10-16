// // 1. Print celected HTML element
// const printPdf = (elementId) => {
//   // newWindow object can only be created by window.open()
//   // in an event listener.
//   // If we call it elsewhere, null will be returned
//   const newWindow = window.open();

//   // creating a new html node
//   const html = document.createElement('html');

//   // We can load the CSS by cloning the document head
//   // NOTE: since we are going to move node to a foreign
//   // window object, we need to clone the DOM nodes.
//   // If we dont clone, the node in this original window
//   // will disappear, because we have moved it to a new location.
//   // cloneNode(true) will perform a deep clone
//   const head = document.head.cloneNode(true);

//   // creating a new body element for our newWindow
//   const body = document.createElement('body');

//   // grab the elements that you want to convert to PDF
//   const article = document.querySelector(elementId).cloneNode(true);

//   // you can append as many child as you like
//   // this is where we add our elements to the new window.
//   body.appendChild(article);

//   html.appendChild(head);
//   html.appendChild(body);

//   // write content to the new window's document.
//   newWindow.document.write(html.innerHTML);

//   // close document to stop writing
//   // otherwise new window may hang
//   newWindow.document.close();

//   // print content in new window as PDF
//   newWindow.print();

//   // close the new window after printing
//   // newWindow.close();
// };

// 2. Print full HTML document from iframe
// Set print handler
const setPrintHandler = (evt) => {
  // Title of the document
  const defaultTitle = document.title;

  const iframe = evt.currentTarget;

  if (iframe) {
    const iframeWindow = evt.currentTarget?.contentWindow;

    if (iframeWindow) {
      // Close print handler
      const closePrintHandler = () => {
        // Change Title of the document from iframe to default
        document.title = defaultTitle;

        // Delete iframe from the DOM
        document.body.removeChild(iframe);
      };

      // Change Title of the document from default to iframe
      document.title = iframeWindow.document.title;

      // Close print triggers
      iframeWindow.addEventListener('beforeunload', closePrintHandler);
      iframeWindow.addEventListener('afterprint', closePrintHandler);

      // Print iframe
      iframeWindow.print();
    }
  }
};

const printPDF = (url) => {
  // Create iframe
  const hideFrame = document.createElement('iframe');

  // Load handler
  hideFrame.addEventListener('load', setPrintHandler);

  // Hide iframe
  hideFrame.style.display = 'none';

  // Set source for iframe
  hideFrame.src = url;

  // Add iframe to the DOM
  document.body.appendChild(hideFrame);
};

document.addEventListener('DOMContentLoaded', () => {
  // Button for trigger Print action
  const buttonPrint = document.querySelector('#print');

  if (buttonPrint) {
    buttonPrint.addEventListener('click', () => {
      // 1
      // printPDF('#article');

      // 2
      printPDF('cv.html');
    });
  }
});

