// Функция для очистки HTML (без html-to-text)
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

// Получаем UUID из URL
const path = window.location.pathname;
const uuidMatch = path.match(/\/event\/([0-9a-f-]+)/);
const eventUuid = uuidMatch ? uuidMatch[1] : null;

// Дефолтные данные на случай ошибки
let eventData = {
  name: "Событие",
  description: "Описание события",
  mainImage:
    "https://cdn.viexpo.ru/viexpo-webgl/media/default-img-placeholder.jpg",
};

// Получаем текущий URL
const currentUrl = window.location.href;

// Функция для добавления метатегов
function updateMetaTags() {
  const cleanDescription = stripHtml(eventData.description).slice(0, 200);
  const metaTags = [
    { name: "description", content: cleanDescription },
    { property: "og:title", content: eventData.name },
    { property: "og:description", content: cleanDescription },
    { property: "og:image", content: eventData.mainImage },
    { property: "og:url", content: currentUrl },
    { property: "og:type", content: "website" },
  ];

  metaTags.forEach((tag) => {
    const meta = document.createElement("meta");
    if (tag.name) meta.setAttribute("name", tag.name);
    if (tag.property) meta.setAttribute("property", tag.property);
    meta.setAttribute("content", tag.content);
    document.head.appendChild(meta);
  });

  document.title = eventData.name;
}

// Запрос к API
if (eventUuid) {
  // Замени на твой API_HOST (получи из .env или прямо укажи)
  const apiHost = "https://dev.voltep.online/api"; // Проверь точный URL в DevTools (Network)
  fetch(`${apiHost}/event/main/get-event-info?event_uuid=${eventUuid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) throw new Error("API error");
      return response.json();
    })
    .then((data) => {
      // Проверяем, не пустой ли массив
      if (Array.isArray(data.data)) {
        updateMetaTags(); // Используем дефолтные данные
        return;
      }
      eventData = {
        name: data.data.name || "Событие",
        description: data.data.description || "Описание события",
        mainImage:
          data.data.main_image ||
          "https://cdn.viexpo.ru/viexpo-webgl/media/default-img-placeholder.jpg",
      };
      updateMetaTags();
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
      updateMetaTags(); // Используем дефолтные данные
    });
} else {
  updateMetaTags();
}
