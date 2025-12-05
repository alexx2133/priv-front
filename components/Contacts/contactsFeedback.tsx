import { useEffect, useState, useRef } from "react";
import style from "./styles/feedback.module.scss";
import { useFeedback } from "../Common/hooks/useFeedback";

const ContactsFeedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { sendFeedback, isLoading, error, success, getTimeUntilNextSend } =
    useFeedback();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const time = getTimeUntilNextSend();
      setTimeLeft(time);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [getTimeUntilNextSend]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (timeLeft > 0) return;
    await sendFeedback(formData, files);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/pdf",
        "text/plain",
      ];
      const validFiles = newFiles.filter((file) =>
        allowedTypes.includes(file.type)
      );

      const sizeValidFiles = validFiles.filter(
        (file) => file.size <= 5 * 1024 * 1024
      );

      if (sizeValidFiles.length !== newFiles.length) {
        alert(
          "Некоторые файлы превышают лимит 5MB или имеют недопустимый формат"
        );
      }

      setFiles((prev) => [...prev, ...sizeValidFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <form className={style.feedback} onSubmit={handleSubmit}>
      {timeLeft > 0 && (
        <div className="feedback-warning">
          Следующее сообщение можно отправить через: {formatTime(timeLeft)}
        </div>
      )}
      {error && <div className="feedback-error">{error}</div>}

      <div className={style.feedback__data}>
        <input
          placeholder="Ваше имя"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading || timeLeft > 0}
        />
        <input
          placeholder="Ваш e-mail"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading || timeLeft > 0}
        />
      </div>

      <textarea
        placeholder="Ваше сообщение"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows={5}
        required
        disabled={isLoading || timeLeft > 0}
      ></textarea>

      <div className={style.fileUpload}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.txt"
          disabled={isLoading || timeLeft > 0 || files.length >= 5}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className={style.fileUploadButton}
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || timeLeft > 0 || files.length >= 5}
        >
          📎 Прикрепить файлы ({files.length}/5)
        </button>
        <div className={style.fileUploadHint}>
          Макс. 5 файлов по 5MB каждый. Разрешены: JPG, PNG, GIF, PDF, TXT
        </div>
      </div>

      {files.length > 0 && (
        <div className={style.fileList}>
          {files.map((file, index) => (
            <div key={index} className={style.fileItem}>
              <span className={style.fileName}>{file.name}</span>
              <span className={style.fileSize}>
                ({formatFileSize(file.size)})
              </span>
              <button
                type="button"
                className={style.fileRemove}
                onClick={() => removeFile(index)}
                disabled={isLoading}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ opacity: timeLeft > 0 ? 1 : 0 }}>Сообщение отправлено</div>
      <button
        type="submit"
        disabled={isLoading || timeLeft > 0}
        value="Отправить"
        className="orange_button"
      >
        {isLoading ? "Отправка..." : "Отправить"}
      </button>
    </form>
  );
};

export default ContactsFeedback;
