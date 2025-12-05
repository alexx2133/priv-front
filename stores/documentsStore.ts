import { create } from "zustand";
import {
  documentsService,
  Document,
  DocumentGroup,
} from "../utils/api/documents";

interface DocumentsState {
  customerGroups: DocumentGroup[];
  sellerGroups: DocumentGroup[];
  selectedTypes: string[];
  selectedDocuments: number[];
  currentGroupType: "customers" | "sellers";
  loading: boolean;
  error: string | null;

  loadDocuments: (groupType: "customers" | "sellers") => Promise<void>;
  toggleTypeSelection: (type: string) => void;
  clearTypeSelection: () => void;
  toggleDocumentSelection: (documentId: number) => void;
  selectAllDocuments: () => void;
  clearDocumentSelection: () => void;
  downloadSelectedDocuments: () => Promise<void>;
  downloadSingleDocument: (documentId: number) => Promise<void>;
  setGroupType: (groupType: "customers" | "sellers") => void;
  getSelectedDocumentsCount: () => number;
}

export const types = [
  { title: "Физическое лицо", color: "#00C2FF" },
  { title: "Индивидуальный предприниматель", color: "#FF8A00" },
  { title: "Юридическое лицо", color: "#1A9D4D" },
];
export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  customerGroups: [],
  sellerGroups: [],
  selectedTypes: [],
  selectedDocuments: [],
  currentGroupType: "customers" as "customers" | "sellers",
  loading: false,
  error: null,

  loadDocuments: async (groupType: "customers" | "sellers") => {
    set({ loading: true, error: null });
    try {
      const data = await documentsService.getAllGroupsWithDocuments(groupType);
      if (groupType === "customers") {
        set({ customerGroups: data.groups });
      } else {
        set({ sellerGroups: data.groups });
      }
    } catch (error) {
      console.error("Error loading documents:", error);
      set({ error: "Failed to load documents" });
    } finally {
      set({ loading: false });
    }
  },

  toggleTypeSelection: (type: string) => {
    set((state) => {
      const selectedTypes = state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type];
      const groups =
        state.currentGroupType === "customers"
          ? state.customerGroups
          : state.sellerGroups;

      const allDocuments = groups.flatMap((group) => group.documents);
      let newSelectedDocuments = [...state.selectedDocuments];

      if (selectedTypes.includes(type)) {
        const documentsToAdd = allDocuments
          .filter((doc) => {
            switch (type) {
              case "Физическое лицо":
                return doc.physical_person === 1;
              case "Индивидуальный предприниматель":
                return doc.individual_person === 1;
              case "Юридическое лицо":
                return doc.company_person === 1;
              default:
                return false;
            }
          })
          .map((doc) => doc.id);

        newSelectedDocuments = [
          ...new Set([...newSelectedDocuments, ...documentsToAdd]),
        ];
      } else {
        const documentsToRemove = allDocuments
          .filter((doc) => {
            switch (type) {
              case "Физическое лицо":
                return doc.physical_person === 1;
              case "Индивидуальный предприниматель":
                return doc.individual_person === 1;
              case "Юридическое лицо":
                return doc.company_person === 1;
              default:
                return false;
            }
          })
          .map((doc) => doc.id);

        newSelectedDocuments = newSelectedDocuments.filter(
          (id) => !documentsToRemove.includes(id)
        );
      }

      return {
        selectedTypes,
        selectedDocuments: newSelectedDocuments,
      };
    });
  },

  clearTypeSelection: () => {
    set({
      selectedTypes: [],
      selectedDocuments: [],
    });
  },

  toggleDocumentSelection: (documentId: number) => {
    set((state) => {
      const selectedDocuments = state.selectedDocuments.includes(documentId)
        ? state.selectedDocuments.filter((id) => id !== documentId)
        : [...state.selectedDocuments, documentId];
      return { selectedDocuments };
    });
  },

  selectAllDocuments: () => {
    const state = get();
    const groups =
      state.currentGroupType === "customers"
        ? state.customerGroups
        : state.sellerGroups;
    const allDocumentIds = groups
      .flatMap((group) => group.documents)
      .map((doc) => doc.id);

    set({ selectedDocuments: allDocumentIds });
    set({ selectedTypes: types.map((type) => type.title) });
  },

  clearDocumentSelection: () => {
    set({ selectedDocuments: [] });
    set({ selectedTypes: [] });
  },

  downloadSelectedDocuments: async () => {
    const { selectedDocuments, currentGroupType } = get();
    if (selectedDocuments.length === 0) {
      alert("Пожалуйста, выберите документы для скачивания");
      return;
    }

    try {
      await documentsService.downloadMultiple(
        selectedDocuments,
        currentGroupType
      );
      set({ selectedDocuments: [] });
      set({ selectedTypes: [] });
    } catch (error) {
      console.error("Error downloading documents:", error);
      set({ error: "Ошибка при скачивании документов" });
    }
  },

  downloadSingleDocument: async (documentId: number) => {
    const { currentGroupType } = get();
    try {
      await documentsService.downloadSingle(documentId, currentGroupType);
    } catch (error) {
      console.error("Error downloading document:", error);
      set({ error: "Ошибка при скачивании документа" });
    }
  },

  setGroupType: (groupType: "customers" | "sellers") => {
    set({
      currentGroupType: groupType,
      selectedDocuments: [],
    });
  },

  getSelectedDocumentsCount: () => {
    return get().selectedDocuments.length;
  },
}));
