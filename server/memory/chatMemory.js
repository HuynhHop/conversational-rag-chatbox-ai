const sessions = new Map();

export function getHistory(sessionId) {

  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }

  return sessions.get(sessionId);
}

export function addMessage(sessionId, role, content) {

  const history = sessions.get(sessionId) || [];

  history.push({
    role,
    content
  });

  if (history.length > 10) {
    history.shift();
  }

  sessions.set(sessionId, history);
}