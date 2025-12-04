// hooks/useFeedback.ts
import { useState } from "react";
import { API_URL } from "../../../utils/api/config";

export const useFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const canSendFeedback = (): boolean => {
    const lastSent = localStorage.getItem("feedback_last_sent");
    if (!lastSent) return true;

    const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
    return parseInt(lastSent) < tenMinutesAgo;
  };

  const getTimeUntilNextSend = (): number => {
    const lastSent = localStorage.getItem("feedback_last_sent");
    if (!lastSent) return 0;

    const nextSendTime = parseInt(lastSent) + 10 * 60 * 1000;
    return Math.max(0, nextSendTime - Date.now());
  };

  const sendFeedback = async (
    data: {
      name: string;
      email: string;
      message: string;
    },
    files: File[] = []
  ) => {
    if (!canSendFeedback()) {
      setError(
        "Пожалуйста, подождите 10 минут перед отправкой следующего сообщения"
      );
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      // Добавляем файлы
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(API_URL + "/feedback", {
        method: "POST",
        body: formData,
        // Не устанавливаем Content-Type - браузер сделает это сам с boundary
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("feedback_last_sent", Date.now().toString());
        setSuccess(true);
        return true;
      } else {
        setError(result.error || "Ошибка при отправке");
        return false;
      }
    } catch (err) {
      setError("Ошибка сети");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendFeedback,
    isLoading,
    error,
    success,
    canSendFeedback,
    getTimeUntilNextSend,
  };
};
