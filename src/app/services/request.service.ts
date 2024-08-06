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
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// POST FUNCTION
export async function PostRequest(baseURL: string, body?: any) {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(baseURL);
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(baseURL);
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
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
