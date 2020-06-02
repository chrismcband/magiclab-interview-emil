export interface HTTPMethods {
  POST: keyof HTTPMethods;
  PUT: keyof HTTPMethods;
  GET: keyof HTTPMethods;
  DELETE: keyof HTTPMethods;
}

export const httpMethods: HTTPMethods = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE"
};
