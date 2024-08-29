import { Response } from 'node-fetch';

// GET FUNCTION
export async function GetRequest(baseURL: string) {
  try {
    const response = await fetch(baseURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('GetRequest() error message: ', error.message, error);
      return error.message;
    } else {
      console.log('GetRequest() unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// POST FUNCTION
export async function PostRequest(baseURL: string, body_request?: any) {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body_request),
    });

    console.log(' * Post request url ', baseURL);
    console.log(' * Post request body ', JSON.stringify(body_request));

    if (!response.ok) {
      throw new Error(`status: ${response.status}`);
    }

    const textResponse = await response.text(); // Ottieni la risposta come testo

    // Controlla se la risposta è un JSON valido
    try {
      const jsonResponse = JSON.parse(textResponse);
      return jsonResponse; // Restituisci l'oggetto JSON
    } catch (jsonError) {
      console.log('La risposta non è un JSON valido, restituisco la risposta come testo.');
      return textResponse; // Restituisci la risposta come testo
    }

  } catch (error) {
    if (error instanceof Error) {
      console.log('PostRequest() error message: ', error.message, error.name);
      return error.message;
    } else {
      console.log('PostRequest() unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

///////////////////////// Testing Part //////////////////////////////

function testAPI() {
  console.log(
    '******************* WEB API TESTS *********************************'
  );

  const WebAppURL = 'http://localhost:5269/api/BookStore/';

  GetRequest(WebAppURL + 'GetObjects');

  var testObjectId = 7;
  // GetRequest(WebAppURL+"GetObjects/"+testObjectId);

  var body: any = { objectID: testObjectId, title: 'Title' };
  //PostRequest(WebAppURL+"AddObject",body = body);

  var body: any = { objectID: testObjectId, title: 'Modified Title' };
  //PostRequest(WebAppURL+"UpdateObjects",body=body);

  var testObjectId = 10;
  var body: any = { objectID: testObjectId };
  //PostRequest(WebAppURL+"DeleteObjects/"+testObjectId);
  //GetRequest(WebAppURL+"GetObjects/"+testObjectId);
}
