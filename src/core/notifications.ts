export type Notification = {
  priority: "urgent" | "default" | "low";
  tags?: string[];
  title?: string;
  message: string;
  topic: string;
  topicPrefix?: string;
};

const DEFAULT_TOPIC_PREFIX = "aban-intothelightisee-";

const getUrl = (notification: Notification) => {
  const { topic, topicPrefix } = notification;
  let prefix = topicPrefix ?? process.env.TOPIC_PREFIX ?? DEFAULT_TOPIC_PREFIX;
  return `https://ntfy.sh/${prefix}${topic}`;
};

export async function sendNotification(notification: Notification) {
  const { priority, tags, title, message } = notification;
  const url = getUrl(notification);
  await fetch(url, {
    method: "POST",
    body: message,
    headers: {
      ...(title && { Title: title }),
      ...(tags && { Tags: tags.join(",") }),
      ...(priority && { Priority: priority }),
    },
  });
}
