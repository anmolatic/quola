import { createWorker } from 'tesseract.js';

import type { Worker } from 'tesseract.js';

type ExtractedData = {
  name: string;
  lastName: string;
  idNumber: string;
  dateOfBirth: string;
  dateOfIssue: string;
  dateOfExpiry: string;
};

const extractData = async (worker: Worker, imagePath: string): Promise<ExtractedData | null> => {
  try {
    const {
      data: { text },
    } = await worker.recognize(imagePath);

    const cleanedText = text.replace(/\n+/g, ' ').replace(/\s+/g, ' ');

    // Updated Regular Expressions
    const nameRegex = /Name\s+([\w\s.]+)/;
    const lastNameRegex = /Last\sname\s+([\w\s.]+)/;
    const idNumberRegex = /(\d[\d\s-]{11,}\d)/;
    const dateOfBirthRegex = /Date\s+of\s+Birth[^\d]*(\d{1,2}[^\d]+\w{3,}[^\d]+\d{4})/;
    const dateOfIssueRegex = /(\d{1,2}\s+\w{3,}\.\s+\d{2,4}(\/\d{2,4})?)[^\w]{0,4}Date\s+of\s+Issue/;
    const dateOfExpiryRegex = /(\d{1,2}\s+\w{3,}\.\s+\d{2,4}(\/\d{2,4})?)[^\w]{0,4}Date\s+of\s+Expiry/;

    // Extract data using regular expressions
    const nameMatch = cleanedText.match(nameRegex);
    const lastNameMatch = cleanedText.match(lastNameRegex);
    const idNumberMatch = cleanedText.match(idNumberRegex);
    const dateOfBirthMatch = cleanedText.match(dateOfBirthRegex);
    const dateOfIssueMatch = cleanedText.match(dateOfIssueRegex);
    const dateOfExpiryMatch = cleanedText.match(dateOfExpiryRegex);

    // Extract the data
    const name = nameMatch?.[1]?.replace(/\s+/g, ' ');
    const lastName = lastNameMatch?.[1]?.replace(/\s+/g, ' ');

    const idNumber = idNumberMatch?.[1]?.replace(/\s+/g, '');
    const dateOfBirth = dateOfBirthMatch?.[1]?.replace(/\//g, '');
    const dateOfIssue = dateOfIssueMatch?.[1]?.replace(/\//g, '');
    const dateOfExpiry = dateOfExpiryMatch?.[1]?.replace(/\//g, '');

    return {
      name: name ?? 'NA',
      lastName: lastName ?? 'NA',
      idNumber: idNumber ?? 'NA',
      dateOfBirth: dateOfBirth ?? 'NA',
      dateOfIssue: dateOfIssue ?? 'NA',
      dateOfExpiry: dateOfExpiry ?? 'NA',
    };
  } catch (error) {
    console.error('Unable to extract data from image');

    console.error(error);

    return null;
  }
};

export const OCRController = async (imagePath: string) => {
  const worker = await createWorker('eng', 1);

  const data = await extractData(worker, imagePath);

  return data;
};
