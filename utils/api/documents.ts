import { api } from "./config";
import { API_URL } from "./config";

export interface Document {
  id: number;
  group_id: number;
  name: string;
  company_person: number;
  individual_person: number;
  physical_person: number;
  path: string;
  created_at: string;
}

export interface DocumentGroup {
  id: number;
  name: string;
  sort: number;
  documents: Document[];
}

export const documentsService = {
  getAllGroupsWithDocuments: (
    groupType: "customers" | "sellers"
  ): Promise<{ groups: DocumentGroup[] }> => {
    return api.get(`/documents/all-groups/with-documents?group=${groupType}`);
  },

  // Скачать несколько документов
  downloadMultiple: (
    documentIds: number[],
    groupType: "customers" | "sellers"
  ): Promise<void> => {
    return api
      .post(`/documents/download-multiple?group=${groupType}`, {
        documentIds,
      })
      .then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "documents.zip");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
  },

  // Скачать один документ (ИСПРАВЛЕННАЯ ВЕРСИЯ)
  downloadSingle: (
    documentId: number,
    groupType: "customers" | "sellers"
  ): Promise<void> => {
    return fetch(
      `${API_URL}/documents/download/${groupType}/${documentId}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Download failed");

        // Получаем имя файла из заголовков Content-Disposition
        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "document";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (fileNameMatch && fileNameMatch[1]) {
            fileName = decodeURIComponent(fileNameMatch[1]);
          }
        }

        // Возвращаем и blob и fileName
        return response.blob().then((blob) => ({ blob, fileName }));
      })
      .then(({ blob, fileName }) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
  },
};
