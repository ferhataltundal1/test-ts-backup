function HTTPRequest(
  method: "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS" | "PATCH",
  url: string,
  data: unknown = null,
  headers: Record<string, string> = {},
  timeout: number = 5000
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url);

    Object.keys(headers).forEach((key) => {
      httpRequest.setRequestHeader(key, headers[key]);
    });

    httpRequest.onload = function () {
      if (httpRequest.status >= 200 && httpRequest.status < 300) {
        try {
          const response = JSON.parse(httpRequest.responseText);
          resolve(response);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error(`Request failed with status ${httpRequest.status}`));
      }
    };

    httpRequest.onerror = function () {
      reject(new Error("Network error occurred during the HTTP request."));
    };

    httpRequest.timeout = timeout;
    httpRequest.ontimeout = function () {
      reject(new Error("The request timed out."));
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.send(JSON.stringify(data));
    } else {
      httpRequest.send();
    }
  });
}

HTTPRequest("GET", "https://jsonplaceholder.typicode.com/todos").then(
  console.log
);
