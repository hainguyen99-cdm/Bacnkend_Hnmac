function MessageData(title, body, tokens) {
  if (!new.target) {
    return new MessageData(title || '', body || '', tokens || []);
  }
  this.toJson = function() {
    return {
      notification: {
        title: title,
        body: body
      },
      tokens: tokens
    }
  }
}

module.exports = { MessageData }
