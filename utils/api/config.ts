const prod = false;
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const API_URL = BACKEND_URL + "/api";
export const FRONT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }

  // Для скачивания файлов возвращаем blob
  const contentType = response.headers.get("content-type");
  if (
    contentType?.includes("application/zip") ||
    contentType?.includes("application/octet-stream") ||
    contentType?.includes("application/pdf") ||
    contentType?.includes("application/msword") ||
    contentType?.includes("application/vnd.openxmlformats-officedocument")
  ) {
    return response.blob();
  }

  return response.json();
};

const get = async (url: string): Promise<any> => {
  const response = await fetch(`${API_URL}${url}`);
  return handleResponse(response);
};

const post = async (url: string, data?: any): Promise<any> => {
  const response = await fetch(`${API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });
  return handleResponse(response);
};

export const api = {
  get,
  post,
};

export const getCategoriesUrl = (filename: string) =>
  `${BACKEND_URL}/images/categories/${filename}`;
export const getSettingsUrl = (filename: string) =>
  `${BACKEND_URL}/images/settings/${filename}`;
export const getBannerUrl = (filename: string) =>
  `${BACKEND_URL}/images/banners/${filename}`;
export const getVideoUrl = (filename: string) =>
  `${BACKEND_URL}/videos/${filename}`;
export const getDocumentUrl = (filename: string) =>
  `${BACKEND_URL}/documents/${filename}`;
export const getPhotoUrl = (filename: string) =>
  `${BACKEND_URL}/images/gallery/${filename}`;
export const getNewsUrl = (filename: string) =>
  `${BACKEND_URL}/images/news/${filename}`;
export const getProductsUrl = (filename: string) =>
  `${BACKEND_URL}/images/products/${filename}`;
