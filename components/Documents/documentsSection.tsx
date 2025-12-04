import { useEffect } from "react";
import { types, useDocumentsStore } from "../../stores/documentsStore";
import style from "./styles/documents.module.scss";

const DocumentsSection = ({
  documentType,
}: {
  documentType: "customers" | "sellers";
}) => {
  const {
    loadDocuments,
    customerGroups,
    sellerGroups,
    selectedTypes,
    selectedDocuments,
    toggleTypeSelection,
    clearTypeSelection,
    toggleDocumentSelection,
    selectAllDocuments,
    clearDocumentSelection,
    downloadSelectedDocuments,
    setGroupType,
    getSelectedDocumentsCount,
    loading,
  } = useDocumentsStore();

  useEffect(() => {
    setGroupType(documentType);
    loadDocuments(documentType);
  }, [documentType]);

  const currentGroups =
    documentType === "customers" ? customerGroups : sellerGroups;

  return (
    <div className={style.documents}>
      {/* Заголовок с фильтрами (только для sellers) */}
      {documentType === "sellers" && (
        <div className={style.documents__header}>
          <div className={style.documents__header__items}>
            {types.map((el, i) => (
              <div
                key={i}
                className={style.documents__header__item}
                style={{
                  backgroundColor: selectedTypes.includes(el.title)
                    ? "white"
                    : "transparent",
                  border: selectedTypes.includes(el.title)
                    ? "2px solid #000000ff"
                    : "2px solid #b9b9b9ff",
                }}
                onClick={() => toggleTypeSelection(el.title)}
              >
                <div
                  className={style.documents__header__dot}
                  style={{
                    backgroundColor: el.color,
                  }}
                />
                <p>{el.title}</p>
              </div>
            ))}
          </div>
          <div
            className={style.documents__header__cancel}
            onClick={clearTypeSelection}
          >
            Очистить{" "}
            <img src={"../icons/documents-filter-clear.png"} alt="clear" />
          </div>
        </div>
      )}

      {/* Панель управления выбором */}
      <div className={style.documents__controls}>
        <div className={style.documents__selectionInfo}>
          Выбрано: {getSelectedDocumentsCount()} документов
        </div>
        <div className={style.documents__controlButtons}>
          <button
            onClick={selectAllDocuments}
            disabled={currentGroups.length === 0}
          >
            Выбрать все
          </button>
          <button
            onClick={clearDocumentSelection}
            disabled={selectedDocuments.length === 0}
          >
            Очистить выбор
          </button>
        </div>
      </div>

      {/* Группы документов - ВСЕГДА ПОКАЗЫВАЕМ ВСЕ ДОКУМЕНТЫ */}
      {loading ? (
        <div className={style.loading}>Загрузка документов...</div>
      ) : (
        <div className={style.documentGroups}>
          {currentGroups.map((group) => (
            <DocumentGroup
              key={group.id}
              group={group}
              selectedDocuments={selectedDocuments}
              onToggleDocument={toggleDocumentSelection}
            />
          ))}
        </div>
      )}

      {!loading && currentGroups.length === 0 && (
        <div className={style.noDocuments}>Документы не найдены</div>
      )}

      <div className={style.downloadDocuments}>
        <button
          className="orange_button"
          onClick={downloadSelectedDocuments}
          disabled={selectedDocuments.length === 0}
        >
          Скачать документы
        </button>

        <div style={{ opacity: selectedDocuments.length === 0 ? 1 : 0 }}>
          Выберите документы для скачивания
        </div>
      </div>
    </div>
  );
};

// Компонент группы документов - ПОКАЗЫВАЕМ ВСЕ ДОКУМЕНТЫ
const DocumentGroup = ({
  group,
  selectedDocuments,
  onToggleDocument,
}: {
  group: any;
  selectedDocuments: number[];
  onToggleDocument: (id: number) => void;
}) => {
  // ВСЕГДА показываем ВСЕ документы группы
  return (
    <div className={style.documentGroup}>
      <h2 className={style.documentGroup__title}>{group.name}</h2>
      <div className={style.documentGroup__grid}>
        {group.documents.map((document: any) => (
          <DocumentCard
            key={document.id}
            document={document}
            isSelected={selectedDocuments.includes(document.id)}
            onToggleSelect={() => onToggleDocument(document.id)}
          />
        ))}
      </div>
    </div>
  );
};

// Компонент карточки документа
const DocumentCard = ({
  document,
  isSelected,
  onToggleSelect,
}: {
  document: any;
  isSelected: boolean;
  onToggleSelect: () => void;
}) => {
  return (
    <div
      className={`${style.documentCard} ${isSelected ? style.selected : ""}`}
    >
      <div className={style.documentCard__header}>
        <div className={style.documentCard__content}>
          {/* Три точки для указания типов */}
          <div
            className={style.documentCard__dot}
            style={{
              backgroundColor:
                document.physical_person === 1 ? "#00C2FF" : "transparent",
            }}
          />
          <div
            className={style.documentCard__dot}
            style={{
              backgroundColor:
                document.individual_person === 1 ? "#FF8A00" : "transparent",
            }}
          />
          <div
            className={style.documentCard__dot}
            style={{
              backgroundColor:
                document.company_person === 1 ? "#1A9D4D" : "transparent",
            }}
          />

          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className={style.documentCard__checkbox}
          />

          <h4 className={style.documentCard__title}>{document.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;
