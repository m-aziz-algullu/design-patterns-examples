type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type HttpRequest = {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: string;
  timeoutMs: number;
};

class HttpRequestBuilder {
  private method: HttpMethod = "GET";
  private url: string | undefined;
  private readonly headers: Record<string, string> = {};
  private body: string | undefined;
  private timeoutMs = 5000;

  setMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  addHeader(name: string, value: string): this {
    this.headers[name] = value;
    return this;
  }

  setJsonBody(data: unknown): this {
    this.body = JSON.stringify(data);
    return this.addHeader("Content-Type", "application/json");
  }

  setTimeout(timeoutMs: number): this {
    this.timeoutMs = timeoutMs;
    return this;
  }

  build(): HttpRequest {
    if (!this.url) {
      throw new Error("Request URL is required.");
    }

    if (this.method === "GET" && this.body !== undefined) {
      throw new Error("GET requests cannot have a body.");
    }

    if (!Number.isInteger(this.timeoutMs) || this.timeoutMs <= 0) {
      throw new Error("Timeout must be a positive integer.");
    }

    const request: HttpRequest = {
      method: this.method,
      url: this.url,
      headers: { ...this.headers },
      timeoutMs: this.timeoutMs
    };

    if (this.body !== undefined) {
      request.body = this.body;
    }

    return request;
  }
}

function runBuilderDemo(): void {
  const getUsers = new HttpRequestBuilder()
    .setUrl("https://api.example.com/users")
    .addHeader("Accept", "application/json")
    .build();

  const createUser = new HttpRequestBuilder()
    .setMethod("POST")
    .setUrl("https://api.example.com/users")
    .addHeader("Authorization", "Bearer token")
    .setJsonBody({ name: "Ada" })
    .setTimeout(10000)
    .build();

  console.log("GET request:", getUsers);
  console.log("POST request:", createUser);
}

runBuilderDemo();
